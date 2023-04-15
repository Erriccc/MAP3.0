// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
// 0x289db1E91B2646f63E393f2177e79F476275d224
interface IMap3Pay {}

interface IAccountsManagerContract {
    function setIsVendorActive(address _account, bool signal) external returns (bool);
    function checkIsVendor(address _account) external view returns (bool);
    function checkIsVendorActive(address _account) external view returns (bool);
    function getFeeColector() external view returns (address);
    function getRate() external view returns (uint);
    function getTipRate() external view returns (uint);
    function getSubscriptionContract() external view returns (address);
    function getP2Pcontract() external view returns (address);
    function checkSubscriptionLock() external view returns (bool);

}

contract SubscriptionContract is Ownable{
    /*
      * This contract is responsible for taking care of every payment plan and active subscriptions
      * @deployment_dependency: This contact needs the an implimented version of IAccountsManagerContract
      * @operational_dependnecy: this contract mainly interacts/queries the Account manager contract (IAccountsManagerContract) for context
   */


    // @function this function initializes the Account manager contract (IAccountsManagerContract)
    // @params _accountsmanagercontract is the addressof the  Account manager contract
    IMap3Pay private Map3P2PContract;
    IAccountsManagerContract private AccountsManagerContract;
    function setAccountsManagerContract(IAccountsManagerContract _accountsmanagercontract) public onlyOwner returns(bool) {
        AccountsManagerContract = _accountsmanagercontract;
        return true;
    }
// @constructor Account manager contract address needed to be deployed (@params _accountsmanagercontract)
constructor(IAccountsManagerContract _accManager)payable {
    setAccountsManagerContract(_accManager);
    changeFreePlan(0,3); // sets the contra    
  }

    /*
        *CORE Parameters!
    */

    bool internal locked;
    uint private oneMonth = 2592000;
    mapping(address => bool) public vendorFreeTrialUsed;
    mapping(address => Subscription) public subscriptions; // mapping between suscriber address to the plan id
                ///// REMEMBER PLANS =! SUBSCRIPTIONS///////////
    VendorPlan public  freePlan;
    mapping(uint => VendorPlan) public VendorPlansMapping; // this is the mapping for all available plans
    uint256 public nextPlanId; // keeps track of various plans available REMEMBER PLANS =! SUBSCRIPTIONS


    /*
            *MODEFIRES, STRUCTS, EVENTS and ERRORS !?
        */

    modifier noReentrant() {
        require(!locked, "noReentrant_Subscr");
        locked = true;
        _;
        locked = false;
    }

    struct Subscription {
        address subscriber; // subscriber which is the vendors
        uint availableTransactionsLeft; // available transactions left should be deducted after each transaction
        uint nextPayment; // next payment date for the vendor, calculated in seconds
        }

///// REMEMBER PLANS =! SUBSCRIPTIONS///////////
    struct VendorPlan{
            uint _planTransactionLimit;
            uint _planPrice;
        }
    event SubscriptionEvent(
    address subscriber,
    uint availableTransactionsLeft,
    uint date
    );

    event SubscriptionDeleted(
    address subscriber,
    uint date
    );

     event VendorPlanCreated(
        uint _planPrice,
        uint _planTransactionLimit,
        uint planId
  );


    


    /*
            *@INTERFACE GET/SET FUNCTIONS
        */

function getSubscriptionNextPayment(address _account) external view  returns (uint){
        return subscriptions[_account].nextPayment;
}

function getSubscriptionAvailableTransactionsLeft(address _account) external view  returns (uint){
        return subscriptions[_account].availableTransactionsLeft;
}

function setSubscriptionAvailableTransactionsLeft(address _account, uint _newNumber, bool _calculation) external returns (bool){
      // Checking for access control/ out of bounds error if msg sender isnt authorized

      require(address(msg.sender) == address(AccountsManagerContract.getP2Pcontract()),"Err_O_O_B_1"); 

      // setting sub details with parameters

    /////// NOTE IF ANY: UNEXPECTED BEHAVIOR IF OVERFLOW/UNDERFLOW Occurs
      if (_calculation == true){
         subscriptions[_account].availableTransactionsLeft  += _newNumber;
         return true;
      }else{
         subscriptions[_account].availableTransactionsLeft  -= _newNumber;
        //  subscriptions[_account].availableTransactionsLeft = sub(subscriptions[_account].availableTransactionsLeft, _newNumber);
         return true;
      }
}

function setSubscriptionNextPayment(address _account, bool _calculation) external returns (bool){
      // Checking for access control/ out of bounds error if msg sender isnt authorized

      require(address(msg.sender) == address(AccountsManagerContract.getP2Pcontract()),"Err_O_O_B_2"); 

      // setting sub details with parameters

    /////// NOTE IF ANY: UNEXPECTED BEHAVIOR IF OVERFLOW/UNDERFLOW Occurs

      if (_calculation == true){
         subscriptions[_account].nextPayment  += oneMonth;
         return true;
      }else{
         subscriptions[_account].nextPayment  -= oneMonth;
         return true;
      }
}





        /*
                *@CORE PLAN FUNCTIONS
            */

// CREATE plan function
function createPlan(uint _price,uint _transactionLimit) onlyOwner public returns(bool){
    require(_price > 0, 'amount needs to be > 0');
    VendorPlansMapping[nextPlanId] = VendorPlan(
      _price, 
      _transactionLimit
    );
    emit VendorPlanCreated(_price,_transactionLimit,nextPlanId);
    nextPlanId++;
    return true;
  }

// DELETE plan function
function deletePlan(uint planId) onlyOwner public  returns(bool){
    delete VendorPlansMapping[planId];
    return true;

}

// CHANGE free plan parameters
 function changeFreePlan(uint _price,uint _transactionLimit) onlyOwner public returns(bool) {
     freePlan._planTransactionLimit = _transactionLimit;
     freePlan._planPrice = _price;
     return true;
     }


    

    /*
                    *@CORE SUBSCRIPTION FUNCTIONS
                */

// SUBSCRIBES new vendors to a free plan
 function freeTrialSubscribtion(address _vendor) external returns(bool){
        // Checking for access control/ out of bounds error if msg sender isnt authorized
                        
            //   require(address(msg.sender) == address(AccountsManagerContract.getP2Pcontract()),"out of bounds"); 
            require(address(msg.sender) == address(AccountsManagerContract),"Err_O_O_B_3"); 
        // Checking for vendor acc Not Vendorerror if addr isnt vendor
            require(AccountsManagerContract.checkIsVendor(_vendor), "Err_N_V_5");
        // check if the vendor already got a free plan subscription
        if (vendorFreeTrialUsed[_vendor] ){ 
            return true;
        }else{

            // convert the freeplan struct into a subscription
            subscriptions[_vendor] = Subscription(_vendor,freePlan._planTransactionLimit,block.timestamp + oneMonth // oneMonth = 30 days in seconds
            );
            AccountsManagerContract.setIsVendorActive(_vendor, true); // this is responsible for active membership
            vendorFreeTrialUsed[_vendor] = true;
            // 100 is the plan id for free plan
            emit SubscriptionEvent(_vendor,
            subscriptions[_vendor].nextPayment, subscriptions[_vendor].availableTransactionsLeft);
                    return true;
        }

  }

// SUBSCRIBES vendors to a paid plan
 function subscribeVendor(uint planId, address _vendor) public noReentrant payable returns(bool){
        // Checking for access control/ out of bounds error if msg sender isnt authorized
            require(AccountsManagerContract.checkIsVendor(_vendor), "Err_N_V_6");

            VendorPlan storage myPlan = VendorPlansMapping[planId];
            require(myPlan._planPrice > 0, "Err_Invalid_plan_1");
            require(msg.value >= myPlan._planPrice, "Err_payment_<_price_2");

            (bool sent,) = AccountsManagerContract.getFeeColector().call{value: msg.value}("");
            require(sent, "Err_Ether_Failed_1");

        // check and append subscription if vendor is already subscribed OR create a new active subscription for the vendor
        if (subscriptions[_vendor].subscriber == address(0) ){

            subscriptions[_vendor] = Subscription(
            _vendor, 
            myPlan._planTransactionLimit, 
            block.timestamp + oneMonth // oneMonth = 30 days in seconds
            );
            AccountsManagerContract.setIsVendorActive(_vendor, true); // this is responsible for active membership
        } 
        else {
            subscriptions[_vendor].availableTransactionsLeft += myPlan._planTransactionLimit;
            subscriptions[_vendor].nextPayment += oneMonth;
        }
        emit SubscriptionEvent( _vendor, 
            subscriptions[_vendor].nextPayment,subscriptions[_vendor].availableTransactionsLeft );
            return true;
  }

// UNSUBSCRIBES vendor ... Private function
  function unsubscribeVendor( address _vendor) public returns(bool) {
      // Checking for access control/ out of bounds error if msg sender isnt authorized
        require(address(msg.sender) == address(AccountsManagerContract.getP2Pcontract()) ||
        address(msg.sender) == address(AccountsManagerContract)  || address(msg.sender) == _vendor,"Err_O_O_B_4"); 
      // Checking for vendor acc Not Vendorerror if addr isnt vendor
        require(AccountsManagerContract.checkIsVendor(_vendor), "Err_N_V_7");

      // loading vendors subscription object  
        Subscription storage subscription = subscriptions[_vendor];
        require(subscription.subscriber != address(0),"Err_Invalid_plan_2");
    
      // delete and deactivate both subscription and isVendorActive status
        delete subscriptions[_vendor];
        AccountsManagerContract.setIsVendorActive(_vendor, false); // this is responsible for active membership
        emit SubscriptionDeleted(_vendor,block.timestamp);
        return true;

  }

    receive() external payable {}
    
  
}

// [    "0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2",    "Testing tupple formart2",    "Living on cloud 9-2",    "chicago-2",    "IL",    "60622",    "123-456-7890",    "Connect vendors in map3.0-2",    "40.716862",    "-73.999005",    "https://ipfs.moralis.io:2053/ipfs/QmS3gdXVcjM72JSGH82ZEvu4D7nS6sYhbi5YyCw8u8z4pE/media/3",    "https://github.com/Erriccc",    "0xd9145CCE52D386f254917e481eB44e9943F39138" ]

//0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270 // POLYGON_WRAPPED_MATIC_ADDRESS

