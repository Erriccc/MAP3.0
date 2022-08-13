// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

// BUG NOTE............

// NOTE that default value for uint mapping is 0 so make sure to initialize...
// ...ID mappings incase you have to delete an id . ID[undefined] = 0...


// TODO

// ADD Remove Vendor Function
// ADD reset all vendors function
// ADD isVendorActive bool
// use isVendorActive bool to represent currently active vendors
// turn vendors into nft
//  impliment vendor nft purchase by wrapping or staking nfts
// make the nfts soul bound.




interface IWETH is IERC20 {
    function deposit() external payable;
    function withdraw(uint) external;
}


interface IVendorPlans {
    function freeTrialSubscribtion(address _vendor) external returns(bool);
    function unsubscribeVendor( address _vendor) external returns(bool);
    function getSubscriptionAvailableTransactionsLeft(address _account) external view  returns (uint);
    function getSubscriptionNextPayment(address _account) external view  returns (uint);
    function setSubscriptionNextPayment(address _account, bool _calculation) external returns (bool);
    function setSubscriptionAvailableTransactionsLeft(address _account, uint _newNumber, bool _calculation) external returns (bool);

}


contract Map3Pay is Ownable{
//  using SafeERC20 for IERC20;

// scale to 10,000.
//1 = 0.01%
// 10 = 0.1%
// 100 = 1%
// 1,000 = 10%
// 10,000 = 100%
// INTERFACE of spender

// Interfaces
//  IERC20 private universeToken;
IVendorPlans private VendorPlansContract;

function setVendorPlansContract(IVendorPlans _vendorPlans) public onlyOwner returns(bool) {
    VendorPlansContract = _vendorPlans;
    return true;
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
     event MoneySpent (
        address from,
        address to,
        address tokenIn ,
        address tokenOut,
        uint256 amount
    );          

function convertEthToWETH(uint _amount, address spender, uint _expectedOutput) // note this function had to be seperate and not payable for this to work
    private
{
    IWETH(weth).deposit{value: _amount}();
    uint256 boughtAmount = IWETH(weth).balanceOf(address(this));
    require(boughtAmount >= _expectedOutput, "INVALID_BUY_AMOUNT");
    require(IWETH(weth).approve(spender, type(uint256).max), "approve failed");
}


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
    VendorPlansContract.freeTrialSubscribtion(_signUpVendor.vendorsWalletAddress);

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
    if (VendorPlansContract.getSubscriptionAvailableTransactionsLeft(_vendor) > 0){
        VendorPlansContract.unsubscribeVendor(_vendor);
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


    // bool private universeTokenInitialized;

    // modifier coinsInitialized() {
    //         require(universeTokenInitialized, "initialize tokens first");
    //         _;
    //     }

    mapping (address => bool) public isVendor;
    mapping (address => bool) public isVendorActive;
    mapping (address => uint256) public VendorId;

// events section
  event Paid(address sender, address to, uint256 amount);
    event FilledSwapOrder(IERC20 sellToken, IERC20 buyToken, uint256 boughtAmount);

// try to convert this contract to an upgradable contract
        constructor(address _feeColector
        , address _wethAddress 
        )  payable{
            feeColector = _feeColector;
            weth = _wethAddress;
           



            }

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

function settipRate(uint256 _rate) public onlyOwner returns(bool){
    tipRate = _rate;
    return true;
}

function setfeeColector(address _feeColector) public onlyOwner returns(bool){
    feeColector = _feeColector;
    return true;
}

function checkIsVendor(address _account) external view returns (bool){
        return isVendor[_account];
}

function checkIsVendorActive(address _account) external view returns (bool){
        return isVendorActive[_account];
}
function setIsVendorActive(address _account, bool _status) external  returns (bool){
      require(address(msg.sender) == address(VendorPlansContract),"out of bounds"); 

    isVendorActive[_account] = _status;
        return true;
}
function getVendorEmail(address _account) external view  returns (string memory){
        return VendorList[VendorId[_account]].vendorsEmail;
}

function getVendorId(address _account) external view returns (uint){
        return VendorId[_account];
}

function getFeeColector() external view returns (address){
        return feeColector;
}


  // Function to get the pre approved allowance given to this contract by signed in user
function GetThisContractAllowance(IERC20 _Coin) public view returns(uint256){
       return _Coin.allowance(msg.sender, address(this));
}
// query allowance for anyone 
function GetAllowance(IERC20 _Coin, address _account) public view returns(uint256){
       return _Coin.allowance(msg.sender, _account);
}
   // function to get this contracts balance to any given token
function GetContractTokenBalance(IERC20 _tokenIn) public view returns(uint256){
       IERC20 _PayStableCoin = IERC20(_tokenIn);

       return _PayStableCoin.balanceOf(address(this));
}
    // Function to spend tokens onbehalf of the currently signed in user while keeping fees
    // sub function to foward payment to a vendor
function _fowardPayment(uint256 _ammount, address _to, IERC20 _tokenIn) private returns(bool){
      _tokenIn.transfer(_to, _ammount);
      uint contractBanlanceOfToken = _tokenIn.balanceOf(address(this));
      _tokenIn.transfer(feeColector, contractBanlanceOfToken);
      return true;
}

    // This is the new Pay function
    function SameTokenPay(uint256 _tokenamount, address _to, IERC20 _tokenIn) public payable returns(bool) {
        uint256 fees; 
        uint256 payment; 
        uint256 _finalPaymentValue;
    
                        // Check to see if the vendor has an active subscription
                            if(isVendorActive[_to]){
                                        uint _nextpayment = VendorPlansContract.getSubscriptionNextPayment(_to);
                                        uint _availableTransactionsLeft = VendorPlansContract.getSubscriptionAvailableTransactionsLeft(_to);
                                        // check if active subcription should be cancelled 
                                    if(_nextpayment > block.timestamp && _availableTransactionsLeft > 0 ){
                                            
                                            // deduct number of transactions left in the subscription
                                        VendorPlansContract.setSubscriptionAvailableTransactionsLeft(_to, 1, false);
                                        _finalPaymentValue = _tokenamount;
                                    
                                    } else{
                                            // unsubscribe Vendor
                                            require(VendorPlansContract.unsubscribeVendor(_to), "unsubcribing failed");
                                            // send payment with percentage fees processed
                                            fees =(_tokenamount*rate)/decimalMultiplier;
                                            payment = SafeMath.sub(_tokenamount, fees);
                                            _finalPaymentValue = payment;
                                    }  

                            }   
                            else{
                                        fees =(_tokenamount*rate)/decimalMultiplier;
                                        payment = SafeMath.sub(_tokenamount, fees);
                                        _finalPaymentValue = payment;
                            }      
///////////////////////////// END OF INITIAL IF STATEMENT

                            if(msg.value > 0){ // make Simple transfer in the case where user just wants to send ether
                                        
                                        if (fees > 0){
                                                (bool sentToFeeCollector,) = _to.call{value: fees}("");
                                                require(sentToFeeCollector, "Failed to send Ether");
                                                }
                                                (bool sent,) = _to.call{value: _finalPaymentValue}("");
                                                require(sent, "Failed to send Ether");
                                                return true;
                                } else{
                                        IERC20 _PayStableCoin = IERC20(_tokenIn);
                                        require(_tokenamount <= GetThisContractAllowance(_PayStableCoin),"approve enough token");
                                        _PayStableCoin.transferFrom(msg.sender, address(this), _tokenamount);                                        
                                        _fowardPayment(_finalPaymentValue, _to,_PayStableCoin);
                                            if (fees > 0 ){
                                                uint _ContractPayStableCoinBalabce = _PayStableCoin.balanceOf(address(this));
                                                _PayStableCoin.transfer(feeColector,_ContractPayStableCoinBalabce);
                                            }
                                        
                                        emit Paid(msg.sender, _to, _finalPaymentValue);
                                return true;
                                }
   }

    function fillQuote(
         // The `sellTokenAddress` field from the API response.
        IERC20 sellToken,
        // The `buyTokenAddress` field from the API response.
        IERC20 buyToken,
        // The `allowanceTarget` field from the API response.
        address spender,
        // The `to` field from the API response.
        address payable swapTarget,
            // amount of tokens that needs to be sold
        uint256 _tokenamount,
        // amount to be actually paid
        uint256 _sendAmount,
        // // account to be paid
        address _toAddress,
         // The `data` field from the API response.
        bytes calldata swapCallData
    )
        external
        // onlyOwner
        payable // Must attach ETH equal to the `value` field from the API response.
    {

        uint256 fees; 
        uint256 payment; 
        uint256 _finalPaymentValue;


         if(isVendorActive[_toAddress]){
                    uint _nextpayment = VendorPlansContract.getSubscriptionNextPayment(_toAddress);
                    uint _availableTransactionsLeft = VendorPlansContract.getSubscriptionAvailableTransactionsLeft(_toAddress);

                    // check if active subcription should be cancelled 
                if(_nextpayment > block.timestamp && _availableTransactionsLeft > 0 ){
                        // deduct number of transactions left in the subscription
                    VendorPlansContract.setSubscriptionAvailableTransactionsLeft(_toAddress, 1, false);
                    _finalPaymentValue = _sendAmount;

                }else{
                        require(VendorPlansContract.unsubscribeVendor(_toAddress), "something went wrong when unsubcribing vendor");
                        fees =(_sendAmount*rate)/decimalMultiplier;
                        payment = SafeMath.sub(_sendAmount, fees);
                        _finalPaymentValue = payment;

                }
         }
         else{
                fees =(_sendAmount*rate)/decimalMultiplier;
                payment = SafeMath.sub(_sendAmount, fees);
                _finalPaymentValue = payment;
            }  
///////////////////////////// END OF INITIAL IF STATEMENT

            if(msg.value > 0){ // check for eth and convert to eth
               
                require(msg.value >= _tokenamount, "token amount is not greater or equal to msg.value");
               
                convertEthToWETH(msg.value,spender,_tokenamount );

            }else{

                sellToken.transferFrom(msg.sender, address(this), _tokenamount);
            }

///////////////////////////// Begin actual transaction and treat eth as sellToken (Weth) which is an erc20 token
                            // allowance to 0 before being able to update it.
                            sellToken.approve(spender, type(uint256).max);
                            require(sellToken.balanceOf(address(this)) >= _tokenamount,"native to WETH failed");
                            require(sellToken.allowance(address(this), spender) >= _tokenamount,"did_not_approve_spender");
                            // Call the encoded swap function call on the contract at `swapTarget`,
                            // passing along any ETH attached to this function call to cover protocol fees.
                            // (bool success,) = swapTarget.call{value: msg.value}(swapCallData);
                            (bool success,) = swapTarget.call(swapCallData);
                            // (bool success,) = swapTarget.call(swapCallData);
                            require(success, 'SWAP_CALL_FAIL!');

                            if (fees > 0 ){
                                        buyToken.transfer(feeColector,fees);
                                        }

                            // buyToken.transfer(_toAddress , _sendAmount);
                            buyToken.transfer(_toAddress , _finalPaymentValue);

                        /////// DONT FORGET TO REFUND BALANCE!!!
                            uint _contractBuyTokenBalabce = sellToken.balanceOf(address(this));
                                sellToken.transfer(address(msg.sender),_contractBuyTokenBalabce);
                                // Uvinterface.mint(msg.sender);
                                // emit Paid(msg.sender, _toAddress, _sendAmount);
                                emit Paid(msg.sender, _toAddress, _finalPaymentValue);

    }
    receive() external payable {}
    // Get a Tip for Extracting left over ETH from Map3 Contract
    function everyBodyGetsPaidEth() public returns(bool) {
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
    function everyBodyGetsPaidERC20(IERC20 _tokenToWithdraw) public  returns(bool){
            uint256 _balance = _tokenToWithdraw.balanceOf(address(this));
            uint256 fees =(_balance*tipRate)/decimalMultiplier;
            uint256 payment = SafeMath.sub(_balance, fees);
            _tokenToWithdraw.transfer(feeColector, payment);
            _fowardPayment(fees, msg.sender ,_tokenToWithdraw);

            return true;
    }

}


// [    "0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2",    "Testing tupple formart2",    "Living on cloud 9-2",    "chicago-2",    "IL",    "60622",    "123-456-7890",    "Connect vendors in map3.0-2",    "40.716862",    "-73.999005",    "https://ipfs.moralis.io:2053/ipfs/QmS3gdXVcjM72JSGH82ZEvu4D7nS6sYhbi5YyCw8u8z4pE/media/3",    "https://github.com/Erriccc",    "0xd9145CCE52D386f254917e481eB44e9943F39138" ]


//0x6fe4668722E3195Fa897217A4Bdd6ee1d289543f
//0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270