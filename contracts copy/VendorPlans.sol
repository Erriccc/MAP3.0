// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;
import "@openzeppelin/contracts/access/Ownable.sol";



interface IMap3Pay {
   
    function setIsVendorActive(address _account, bool _status) external  returns (bool);

    function checkIsVendor(address _account) external view returns (bool);

    function checkIsVendorActive(address _account) external view returns (bool);

    function getVendorId(address _account) external view returns (uint);

    function getVendorEmail(address _account) external view  returns (string memory);

    function getFeeColector() external view returns (address);
}



contract VendorPlans is Ownable{

IMap3Pay private Map3Contract;

function setMap3Contract(IMap3Pay _map3Pay) public onlyOwner returns(bool) {
    Map3Contract = _map3Pay;
    return true;
}

constructor(IMap3Pay _map3ContractAddress)payable {
  
    freePlan._planTransactionLimit = 3;
    freePlan._planPrice = 0;
    setMap3Contract(_map3ContractAddress);
    
  }

  
    struct Subscription {
    address subscriber; // subscriber which is the vendors
    uint availableTransactionsLeft; // available transactions left should be deducted after each transaction
    uint nextPayment; // next payment date for the vendor, calculated in seconds
    }
    event SubscriptionEvent(
    address subscriber,
    string vendorEmail,
    uint availableTransactionsLeft,
    uint date
    );
    event SubscriptionDeleted(
    address subscriber,
    string vendorEmail,
    uint date
    );



    struct VendorPlan{
        uint _planTransactionLimit;
        uint _planPrice;
    }
    event VendorPlanCreated(
        uint _planPrice,
        uint _planTransactionLimit,
        uint planId
  );

    VendorPlan public  freePlan;
    mapping(uint => VendorPlan) public VendorPlansMapping; // this is the mapping for all available plans
    mapping(address => Subscription) public subscriptions; // mapping between suscriber address to the plan id
    mapping(address => bool) public vendorFreeTrialUsed;
    uint256 public nextPlanId; // keeps track of various plans available



// functions to interact with this contract from the interface
function getSubscriptionNextPayment(address _account) external view  returns (uint){
        return subscriptions[_account].nextPayment;
}

function getSubscriptionAvailableTransactionsLeft(address _account) external view  returns (uint){
        return subscriptions[_account].availableTransactionsLeft;
}

function setSubscriptionAvailableTransactionsLeft(address _account, uint _newNumber, bool _calculation) external returns (bool){
      require(address(msg.sender) == address(Map3Contract),"out of bounds"); 

      if (_calculation = true){
         subscriptions[_account].availableTransactionsLeft  += _newNumber;
         return true;
      }else{
         subscriptions[_account].availableTransactionsLeft  -= _newNumber;
         return true;
      }
}

function setSubscriptionNextPayment(address _account, bool _calculation) external returns (bool){
      require(address(msg.sender) == address(Map3Contract),"out of bounds"); 

      if (_calculation = true){
         subscriptions[_account].nextPayment  += 2592000;
         return true;
      }else{
         subscriptions[_account].nextPayment  -= 2592000;
         return true;
      }
}




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

// delete plan function
function deletePlan(uint planId) onlyOwner public  returns(bool){
    delete VendorPlansMapping[planId];
    return true;

}

// change free plan parameters
 function changeFreePlan(uint _price,uint _transactionLimit) onlyOwner public returns(bool) {
     freePlan._planTransactionLimit = _transactionLimit;
     freePlan._planPrice = _price;
     return true;
     }


// subscribes new vendors to a free plan
 function freeTrialSubscribtion(address _vendor) external returns(bool){
      require(address(msg.sender) == address(Map3Contract),"out of bounds"); 

    require(Map3Contract.checkIsVendor(_vendor), "not a Vendor");

   if (vendorFreeTrialUsed[_vendor] ){ // check if the vendor already got a free plan subscription
       return true;
   }else{

      subscriptions[_vendor] = Subscription(_vendor,freePlan._planTransactionLimit,block.timestamp + 2592000 // 2592000 = 30 days in seconds
      );
      Map3Contract.setIsVendorActive(_vendor, true); // this is responsible for active membership
      vendorFreeTrialUsed[_vendor] = true;
      // 100 is the plan id for free plan
      emit SubscriptionEvent(_vendor,
      Map3Contract.getVendorEmail(_vendor),
      subscriptions[_vendor].nextPayment, subscriptions[_vendor].availableTransactionsLeft);
            return true;
   }

  }

// subscribes vendors to a paid plan
 function subscribeVendor(uint planId, address _vendor) public payable returns(bool){
            require(Map3Contract.checkIsVendor(_vendor), "not a Vendor");
            VendorPlan storage plan = VendorPlansMapping[planId];
            require(plan._planPrice > 0, "plan does not exist");
            require(msg.value >= plan._planPrice, "Please send eth to subscribe");

            (bool sent,) = Map3Contract.getFeeColector().call{value: msg.value}("");
            require(sent, "Failed to send Ether");

        if (subscriptions[_vendor].subscriber == address(0) ){

            subscriptions[_vendor] = Subscription(
            _vendor, 
            plan._planTransactionLimit, 
            block.timestamp + 2592000 // 2592000 = 30 days in seconds
            );
            Map3Contract.setIsVendorActive(_vendor, true); // this is responsible for active membership
        } 
        else {
            subscriptions[_vendor].availableTransactionsLeft += plan._planTransactionLimit;
            subscriptions[_vendor].nextPayment += 2592000;
        }
            emit SubscriptionEvent( _vendor,Map3Contract.getVendorEmail(_vendor),
             subscriptions[_vendor].nextPayment,subscriptions[_vendor].availableTransactionsLeft );
                return true;
  }

// unsubscribe vendor ... Private function
  function unsubscribeVendor( address _vendor) external returns(bool) {
        require(address(msg.sender) == address(Map3Contract) || address(msg.sender) == _vendor,"out of bounds"); 

    require(Map3Contract.checkIsVendor(_vendor), "not a Vendor");
    Subscription storage subscription = subscriptions[_vendor];
    require(subscription.subscriber != address(0),"subscription does not exist");
   
    delete subscriptions[_vendor];
    Map3Contract.setIsVendorActive(_vendor, false); // this is responsible for active membership
    emit SubscriptionDeleted(_vendor,Map3Contract.getVendorEmail(_vendor),block.timestamp);
    return true;

  }



}