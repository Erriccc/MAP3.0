// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";


// BUG NOTE............

// NOTE that default value for uint mapping is 0 so make sure to initialize...
// ...ID mappings incase you have to delete an id . ID[undefined] = 0...


// TODO

// turn vendors into nft
//  impliment vendor nft purchase by wrapping or staking nfts
// make the nfts soul bound.


interface IMap3Pay {}

contract VendorAccountsManagerContract is Ownable{

IMap3Pay private Map3P2PContract;

function setMap3Contract(IMap3Pay _map3Pay) public onlyOwner returns(bool) {
    Map3P2PContract = _map3Pay;
    return true;
}

// constructor(IMap3Pay _map3ContractAddress, address _feeColector)payable {
constructor(address _feeColector)payable {
    feeColector = _feeColector;
    freePlan._planTransactionLimit = 3;
    freePlan._planPrice = 0;
    // setMap3Contract(_map3ContractAddress);
    
  }

bool internal locked;

    modifier noReentrant() {
        require(!locked, "No re-entrancy");
        locked = true;
        _;
        locked = false;
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
    uint private oneMonth = 2592000;   

    // VENDOR DETAILS SETTER FUNCTIONS
     function  setVendorToken(IERC20 _newToken) public returns (bool){
            require(isVendor[address(msg.sender)] , " not  a Vendor" );
            VendorList[VendorId[address(msg.sender)]].vendorsToken = _newToken;
        return true;
        }

    function  setVendorName(string memory _newName) public returns (bool){
            require(isVendor[address(msg.sender)] , " not  a Vendor" );
            VendorList[VendorId[address(msg.sender)]].vendorsName = _newName;
        return true;
        }
    function  setVendorBio(string memory _newBio) public returns (bool){
            require(isVendor[address(msg.sender)] , " not  a Vendor" );
            VendorList[VendorId[address(msg.sender)]].vendorsBio = _newBio;
        return true;
        }

        function  setVendorEmail(string memory _newEmail) public returns (bool){
            require(isVendor[address(msg.sender)] , " not  a Vendor" );
            VendorList[VendorId[address(msg.sender)]].vendorsEmail = _newEmail;
        return true;
        }

        function  setVendorWebsiteUrl(string memory _newWebsiteUrl) public returns (bool){
            require(isVendor[address(msg.sender)] , " not  a Vendor" );
            VendorList[VendorId[address(msg.sender)]].vendorsWebsiteUrl = _newWebsiteUrl;
        return true;
        }
        function  setVendorImageUrl(string memory _newImageUrl) public returns (bool){
                require(isVendor[address(msg.sender)] , " not  a Vendor" );
                VendorList[VendorId[address(msg.sender)]].vendorsImageUrl = _newImageUrl;
            return true;
            }
    function  setVendorLatAndLong(string memory _newLat, string memory _newLong) public returns (bool){
        require(isVendor[address(msg.sender)] , " not  a Vendor" );
        VendorList[VendorId[address(msg.sender)]].vendorsLat = _newLat;
        VendorList[VendorId[address(msg.sender)]].vendorsLong = _newLong;
    return true;
    }

struct signUpVendor{
    address vendorsWalletAddress;
    string vendorsName;
    string vendorsStreetAddress;// Note street city state and zip only goes to events when vendor is created
    string vendorsCity;// Note city state and zip only goes to events when vendor is created
    string vendorsState;// Note city state and zip only goes to events when vendor is created
    string vendorsZip;// Note city state and zip only goes to events when vendor is created
    string vendorsEmail;
    string vendorsBio;
    string vendorsLat;
    string vendorsLong;
    string vendorsImageUrl;
    string vendorsWebsiteUrl;
    IERC20 vendorsToken;
}
struct Vendor {
    address vendorsWalletAddress;
    string vendorsName;
    string vendorsEmail;
    string vendorsBio;
    string vendorsLat;
    string vendorsLong;
    string vendorsImageUrl;
    string vendorsWebsiteUrl;
    uint256 vendorsId;
    IERC20 vendorsToken;
 }

event VendorCreated (
    address vendorsWalletAddress,
    string vendorsName,
    string vendorsStreetAddress,
    string vendorsCity,
    string vendorsState,
    string vendorsZip,
    string vendorsEmail
); //VendorCreated(address,string,string,string,string,string,string)
event newVendorInfo(  
    string vendorsBio,
    string vendorsLat,
    string vendorsLong,
    string vendorsImageUrl,
    string vendorsWebsiteUrl,
    uint256 vendorsId,
    IERC20 vendorsToken
); //newVendorInfo(string,string,string,string,string,uint256,IERC20)



    function addVendor(signUpVendor memory _signUpVendor) public payable returns(bool) {
    require(msg.value >= vendorSignUpFee, "you have to pay to become a vendor");
    // require(address(msg.sender) == _signUpVendor.vendorsWalletAddress, "vendor has to solely sign up"); // require vendors sign up themselves
    require(!isVendor[_signUpVendor.vendorsWalletAddress], "you can only register once");

    isVendor[_signUpVendor.vendorsWalletAddress] = !isVendor[_signUpVendor.vendorsWalletAddress];

    // VendorId[address(msg.sender)] = VendorIdCount;
    VendorId[_signUpVendor.vendorsWalletAddress] = VendorIdCount;
    VendorList.push(Vendor({
        // vendorsWalletAddress: address(msg.sender),
        vendorsWalletAddress: _signUpVendor.vendorsWalletAddress,
        vendorsName: _signUpVendor.vendorsName,
        vendorsEmail: _signUpVendor.vendorsEmail,
        vendorsBio: _signUpVendor.vendorsBio,
        vendorsLat: _signUpVendor.vendorsLat,
        vendorsLong: _signUpVendor.vendorsLong,
        vendorsImageUrl: _signUpVendor.vendorsImageUrl,
        vendorsWebsiteUrl: _signUpVendor.vendorsWebsiteUrl,
        vendorsId: VendorId[address(msg.sender)],
        vendorsToken: _signUpVendor.vendorsToken

    }));
    // give new vendors free trial for subscription
    freeTrialSubscribtion(_signUpVendor.vendorsWalletAddress);

    emit VendorCreated(
    _signUpVendor.vendorsWalletAddress,
    _signUpVendor.vendorsName,
    _signUpVendor.vendorsStreetAddress,
    _signUpVendor.vendorsCity,
    _signUpVendor.vendorsState,
    _signUpVendor.vendorsZip,
    _signUpVendor.vendorsEmail
    );
    emit newVendorInfo(
    _signUpVendor.vendorsBio,
    _signUpVendor.vendorsLat,
    _signUpVendor.vendorsLong,
    _signUpVendor.vendorsImageUrl,
    _signUpVendor.vendorsWebsiteUrl,
    VendorId[address(msg.sender)],
    _signUpVendor.vendorsToken
        );
    VendorIdCount ++;
    return true;

    }
    
    function  removeVendor(address _vendor) public returns (bool){
    require(address(msg.sender) == _vendor, " you do not have this permission" );
    require(isVendor[_vendor], "not a Vendor");
    if (subscriptions[_vendor].availableTransactionsLeft > 0){
        unsubscribeVendor(_vendor);
    }
        isVendor[_vendor] = false;
         delete VendorList[VendorId[_vendor]]; 
         delete VendorId[_vendor];
         return true;
    }
    address public feeColector;
    uint256 public decimalMultiplier = 10000;
    uint256 public VendorIdCount = 0;
    Vendor[] public VendorList;
    IERC20 private _StableCoin;
    uint256 public rate = 5; // currently 0.05%
    uint public tipRate = 2000 ; // currently 10% tip to help initiate payout
    uint256 public approveAmmount = 2**256 - 1;
    uint256 public vendorSignUpFee = 0 gwei; // 0.0.00005 eth
    address private weth;


    mapping (address => bool) public isVendor;
    mapping (address => bool) public isVendorActive;
    mapping (address => uint256) public VendorId;



function setVendorSignUpFee(uint256 _price) public onlyOwner returns(bool){
    vendorSignUpFee = _price;
    return true;
}

function numberOfVendors() public view returns(uint256) { return VendorList.length;}
function setUpWeth(address _wethAddress) public onlyOwner {weth = _wethAddress;}



// set Rate
function setRate(uint256 _rate) public onlyOwner returns(bool){
    rate = _rate;
    return true;
}

function setTipRate(uint256 _rate) public onlyOwner returns(bool){
    tipRate = _rate;
    return true;
}

function setfeeColector(address _feeColector) public onlyOwner returns(bool){
    feeColector = _feeColector;
    return true;
}


// Interface Functions
// functions to interact with this contract from the interface

function checkIsVendor(address _account) external view returns (bool){
        return isVendor[_account];
}

function checkIsVendorActive(address _account) external view returns (bool){
        return isVendorActive[_account];
}

function getVendorEmail(address _account) external view  returns (string memory){
        return VendorList[VendorId[_account]].vendorsEmail;
}

function getVendorId(address _account) external view returns (uint){
        return VendorId[_account];
}

function getRate() external view returns (uint){
        return rate;
}

function getTipRate() external view returns (uint){
        return tipRate;
}



function getFeeColector() external view returns (address){
        return feeColector;
}

   
function getSubscriptionNextPayment(address _account) external view  returns (uint){
        return subscriptions[_account].nextPayment;
}

function getSubscriptionAvailableTransactionsLeft(address _account) external view  returns (uint){
        return subscriptions[_account].availableTransactionsLeft;
}

function setSubscriptionAvailableTransactionsLeft(address _account, uint _newNumber, bool _calculation) external returns (bool){
      require(address(msg.sender) == address(Map3P2PContract),"out of bounds"); 

      if (_calculation == true){
         subscriptions[_account].availableTransactionsLeft  += _newNumber;
         return true;
      }else{
         subscriptions[_account].availableTransactionsLeft  -= _newNumber;
         return true;
      }
}

function setSubscriptionNextPayment(address _account, bool _calculation) external returns (bool){
      require(address(msg.sender) == address(Map3P2PContract),"out of bounds"); 

      if (_calculation == true){
         subscriptions[_account].nextPayment  += oneMonth;
         return true;
      }else{
         subscriptions[_account].nextPayment  -= oneMonth;
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
 function freeTrialSubscribtion(address _vendor) public returns(bool){
    //   require(address(msg.sender) == address(Map3P2PContract),"out of bounds"); 
      require(address(msg.sender) == _vendor,"out of bounds"); 

    require(isVendor[_vendor], "not a Vendor");

   if (vendorFreeTrialUsed[_vendor] ){ // check if the vendor already got a free plan subscription
       return true;
   }else{

      subscriptions[_vendor] = Subscription(_vendor,freePlan._planTransactionLimit,block.timestamp + oneMonth // oneMonth = 30 days in seconds
      );
      isVendorActive[_vendor] = true;
    //   Map3P2PContract.setIsVendorActive(_vendor, true); // this is responsible for active membership
      vendorFreeTrialUsed[_vendor] = true;
      // 100 is the plan id for free plan
      emit SubscriptionEvent(_vendor,
    //   Map3P2PContract.getVendorEmail(_vendor),
      VendorList[VendorId[_vendor]].vendorsEmail,
      subscriptions[_vendor].nextPayment, subscriptions[_vendor].availableTransactionsLeft);
            return true;
   }

  }

// subscribes vendors to a paid plan
 function subscribeVendor(uint planId, address _vendor) public noReentrant payable returns(bool){
            require(isVendor[_vendor], "not a Vendor");
            VendorPlan storage plan = VendorPlansMapping[planId];
            require(plan._planPrice > 0, "plan does not exist");
            require(msg.value >= plan._planPrice, "Please send eth to subscribe");

            (bool sent,) = feeColector.call{value: msg.value}("");
            require(sent, "Failed to send Ether");

        if (subscriptions[_vendor].subscriber == address(0) ){

            subscriptions[_vendor] = Subscription(
            _vendor, 
            plan._planTransactionLimit, 
            block.timestamp + oneMonth // oneMonth = 30 days in seconds
            );
            isVendorActive[_vendor] = true;// this is responsible for active membership
        } 
        else {
            subscriptions[_vendor].availableTransactionsLeft += plan._planTransactionLimit;
            subscriptions[_vendor].nextPayment += oneMonth;
        }
            emit SubscriptionEvent( _vendor, VendorList[VendorId[_vendor]].vendorsEmail, //Map3P2PContract.getVendorEmail(_vendor),
             subscriptions[_vendor].nextPayment,subscriptions[_vendor].availableTransactionsLeft );
                return true;
  }

// unsubscribe vendor ... Private function
  function unsubscribeVendor( address _vendor) public returns(bool) {
        require(address(msg.sender) == address(Map3P2PContract) || address(msg.sender) == _vendor,"out of bounds"); 

    require(isVendor[_vendor], "not a Vendor");
    Subscription storage subscription = subscriptions[_vendor];
    require(subscription.subscriber != address(0),"subscription does not exist");
   
    delete subscriptions[_vendor];
    isVendorActive[_vendor] = false; // this is responsible for active membership
    emit SubscriptionDeleted(_vendor, VendorList[VendorId[_vendor]].vendorsEmail,block.timestamp); //Map3P2PContract.getVendorEmail(_vendor),
    return true;

  }

    receive() external payable {}
    
  function _fowardPayment(uint256 _ammount, address _to, IERC20 _tokenIn) private returns(bool){
      _tokenIn.transfer(_to, _ammount);
      uint contractBanlanceOfToken = _tokenIn.balanceOf(address(this));
      _tokenIn.transfer(feeColector, contractBanlanceOfToken);
      return true;
}

 function everyBodyGetsPaidEth() public noReentrant returns(bool) {
            uint  _balance =  address(this).balance;
            uint256 fees =(_balance*tipRate)/decimalMultiplier;
            uint256 payment = SafeMath.sub(_balance, fees);
            (bool sent,) = feeColector.call{value: payment}("");
            require(sent, "Failed_to_pay_feecolector");
            (bool sentToSender,) = msg.sender.call{value: fees}("");
            require(sentToSender, "Failed_to_tip_sender");
            return true;
        }



    // Get a Tip for Extracting left over ERC20 TOkens from Map3 Contract
    function everyBodyGetsPaidERC20(IERC20 _tokenToWithdraw) public  noReentrant returns(bool){
            uint256 _balance = _tokenToWithdraw.balanceOf(address(this));
            uint256 fees =(_balance*tipRate)/decimalMultiplier;
            uint256 payment = SafeMath.sub(_balance, fees);
            _tokenToWithdraw.transfer(feeColector, payment);
            _fowardPayment(fees, msg.sender ,_tokenToWithdraw);

            return true;
    }





}

// [    "0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2",    "Testing tupple formart2",    "Living on cloud 9-2",    "chicago-2",    "IL",    "60622",    "123-456-7890",    "Connect vendors in map3.0-2",    "40.716862",    "-73.999005",    "https://ipfs.moralis.io:2053/ipfs/QmS3gdXVcjM72JSGH82ZEvu4D7nS6sYhbi5YyCw8u8z4pE/media/3",    "https://github.com/Erriccc",    "0xd9145CCE52D386f254917e481eB44e9943F39138" ]

//0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270 // POLYGON_WRAPPED_MATIC_ADDRESS