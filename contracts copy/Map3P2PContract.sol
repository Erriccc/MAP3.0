// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";


interface IWETH is IERC20 {
    function deposit() external payable;
    function withdraw(uint) external;
}


interface IVendorPlans {
    function unsubscribeVendor( address _vendor) external returns(bool);
    function getSubscriptionAvailableTransactionsLeft(address _account) external view  returns (uint);
    function getSubscriptionNextPayment(address _account) external view  returns (uint);
    function setSubscriptionAvailableTransactionsLeft(address _account, uint _newNumber, bool _calculation) external returns (bool);
    function checkIsVendorActive(address _account) external view returns (bool);
    function getFeeColector() external view returns (address);
    function getRate() external view returns (uint);
    function getTipRate() external view returns (uint);

}


contract Map3P2PContract is Ownable{
//  using SafeERC20 for IERC20;

// scale to 10,000.
//1 = 0.01%
// 10 = 0.1%
// 100 = 1%
// 1,000 = 10%
// 10,000 = 100%
// INTERFACE of spender

// Interfaces
IVendorPlans private VendorAccountsManagerContract;

 

function setVendorPlansContract(IVendorPlans _vendorPlans) public onlyOwner returns(bool) {
    VendorAccountsManagerContract = _vendorPlans;
    return true;
}
    
     event MoneySpent (
        address from,
        address to,
        address tokenIn ,
        address tokenOut,
        uint256 amount
    );  
    
// events section
    event Paid(address sender, address to, uint256 amount);
    event FilledSwapOrder(IERC20 sellToken, IERC20 buyToken, uint256 boughtAmount);        

// try to convert this contract to an upgradable contract
        constructor(IVendorPlans _vendorPlans,address _wethAddress )  payable{
            weth = _wethAddress;
            setVendorPlansContract(_vendorPlans);
            }

    uint256 public decimalMultiplier = 10000;
    address private weth;
    
    bool internal locked;

    modifier noReentrant() {
        require(!locked, "No re-entrancy");
        locked = true;
        _;
        locked = false;
    }

function convertEthToWETH(uint _amount, address spender, uint _expectedOutput) // note this function had to be seperate and not payable for this to work
    private
    
{
    IWETH(weth).deposit{value: _amount}();
    uint256 boughtAmount = IWETH(weth).balanceOf(address(this));
    require(boughtAmount >= _expectedOutput, "INVALID_BUY_AMOUNT");
    require(IWETH(weth).approve(spender, type(uint256).max), "approve failed");
}


function convertWEthToETH(uint _amount, uint _expectedOutput) // note this function had to be seperate and not payable for this to work
    private
{
    IWETH(weth).withdraw(_amount);
    uint256 boughtAmount =  address(this).balance; // 
    require(boughtAmount >= _expectedOutput, "INVALID_BUY_AMOUNT");
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
      _tokenIn.transfer(VendorAccountsManagerContract.getFeeColector(), contractBanlanceOfToken);
      return true;
}





  function resolvePaymentFees(uint256 _sendAmount,  address _toAddress) private returns(bool status, uint256 fees, uint256 _finalPaymentValue ) {
        uint payment;
        bool isVendorActive = VendorAccountsManagerContract.checkIsVendorActive(_toAddress);
        uint _rate = VendorAccountsManagerContract.getRate();

         if(isVendorActive){
                    uint _nextpayment = VendorAccountsManagerContract.getSubscriptionNextPayment(_toAddress);
                    uint _availableTransactionsLeft = VendorAccountsManagerContract.getSubscriptionAvailableTransactionsLeft(_toAddress);

                    // check if active subcription should be cancelled 
                if(_nextpayment > block.timestamp && _availableTransactionsLeft > 0 ){
                        // deduct number of transactions left in the subscription
                    VendorAccountsManagerContract.setSubscriptionAvailableTransactionsLeft(_toAddress, 1, false);
                    _finalPaymentValue = _sendAmount;

                }else{
                        require(VendorAccountsManagerContract.unsubscribeVendor(_toAddress), "something went wrong when unsubcribing vendor");
                        fees =(_sendAmount * _rate)/decimalMultiplier;
                        payment = SafeMath.sub(_sendAmount, fees);
                        _finalPaymentValue = payment;
                }
                status = true;
         }else{
                fees =(_sendAmount * _rate)/decimalMultiplier;
                payment = SafeMath.sub(_sendAmount, fees);
                _finalPaymentValue = payment;
                status = true;
            }  
        }

                            
    // This is the new Pay function
    function SameTokenPay(uint256 _tokenamount, address _to, IERC20 _tokenIn, bool _sendAsWeth) public noReentrant payable returns(bool) {


            (bool status,uint fees, uint _finalPaymentValue) = resolvePaymentFees( _tokenamount, _to);
            require(status,'FAILED_TO_RESOLVE_FEES');

// ///////////////////////////// END OF INITIAL IF STATEMENT

                            if(msg.value > 0){ // make Simple transfer in the case where user just wants to send ether or Weth
                                        
                                        if (fees > 0){

                                                 if (_sendAsWeth == true){
                                                        require(msg.value >= _tokenamount, "token amount is not greater or equal to msg.value");
                                                        IWETH(weth).deposit{value: msg.value}();
                                                        IWETH(weth).transfer(VendorAccountsManagerContract.getFeeColector(),fees);
                                                 }else{
                                                    (bool sentToFeeCollector,) = VendorAccountsManagerContract.getFeeColector().call{value: fees}("");
                                                    require(sentToFeeCollector, "Failed to send Ether");
                                                 }
                                        }
                                                if (_sendAsWeth == true){
                                                    IWETH(weth).transfer(_to,_finalPaymentValue);
                                                    return true;
                                                 }else{
                                                    (bool sent,) = _to.call{value: _finalPaymentValue}("");
                                                    require(sent, "Failed to send Ether");
                                                    return true;
                                                 }



                                } else{
                                        IERC20 _PayStableCoin = IERC20(_tokenIn);
                                        require(_tokenamount <= GetThisContractAllowance(_PayStableCoin),"approve enough token");
                                        _PayStableCoin.transferFrom(msg.sender, address(this), _tokenamount);                                        
                                        _fowardPayment(_finalPaymentValue, _to,_PayStableCoin);
                                            if (fees > 0 ){
                                                uint _ContractPayStableCoinBalabce = _PayStableCoin.balanceOf(address(this));
                                                _PayStableCoin.transfer(VendorAccountsManagerContract.getFeeColector(),_ContractPayStableCoinBalabce);
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
        noReentrant
        // onlyOwner
        payable // Must attach ETH equal to the `value` field from the API response.
    {

        (bool status,uint fees, uint _finalPaymentValue) = resolvePaymentFees( _sendAmount, _toAddress);
        require(status,'FAILED_TO_RESOLVE_FEES');

// ///////////////////////////// END OF INITIAL IF STATEMENT

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
                                        buyToken.transfer(VendorAccountsManagerContract.getFeeColector(),fees);
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



function fillErc20ToEthQuote(
         // The `sellTokenAddress` field from the API response.
        IERC20 sellToken,
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
    ) external  noReentrant payable // Must attach ETH equal to the `value` field from the API response.
    {

// Asumption is that every transaction coming here is meant for erc20 to eth....
   
            (bool status,uint fees, uint  _finalPaymentValue) = resolvePaymentFees( _sendAmount, _toAddress);
            require(status,'FAILED_TO_RESOLVE_FEES');

            sellToken.transferFrom(msg.sender, address(this), _tokenamount);


// ///////////////////////////// END OF INITIAL IF STATEMENT

////// make sure to handle weth to eth too along with any erc20

            if(address(sellToken) != address(weth)){ // check for eth and convert to eth

///////////////////////////// BCovert non WETH ERC20 tokens to WETH first and then treat everything else as Weth after here
                            // allowance to 0 before being able to update it.
                            sellToken.approve(spender, type(uint256).max);
                            require(sellToken.balanceOf(address(this)) >= _tokenamount,"failedToReciveSellToken"); // change 1
                            require(sellToken.allowance(address(this), spender) >= _tokenamount,"did_not_approve_spender");
                            (bool success,) = swapTarget.call(swapCallData);
                            require(success, 'SWAP_CALL_FAIL!');
            }

// ///////////////////////////// CONVERT WETH TO ETH BY WITHDRAWING ETH FROM THE WETH CONTRACT
// Asumption is that at this point every currency is now WETH........
                    
                    convertWEthToETH(IWETH(weth).balanceOf(address(this)), _sendAmount);
                    // require(address(this).balance >= _tokenamount,"WETH to Native failed");
                    require(address(this).balance >= _sendAmount,"WETH to Native failed");//change 2

// Asumption is that at this We are only purely dealing with ETH
                        if (fees > 0){
                        (bool sentToFeeCollector,) = VendorAccountsManagerContract.getFeeColector().call{value: fees}("");
                        require(sentToFeeCollector, "Failed to send Ether to fee colector");
                        }
                        (bool sent,) = _toAddress.call{value: _finalPaymentValue}("");
                        require(sent, "Failed to send Ether");

                        /////// DONT FORGET TO REFUND BALANCE!!!
                            uint _contractBuyTokenBalabce = address(this).balance;
                             (bool sentRefund,) = address(msg.sender).call{value:_contractBuyTokenBalabce}("");
                            require(sentRefund, "Failed to refund left over Ether");

                            // Uvinterface.mint(msg.sender);
                            emit Paid(msg.sender, _toAddress, _finalPaymentValue);
    }






    receive() external payable {}
    // Get a Tip for Extracting left over ETH from Map3 Contract
    function everyBodyGetsPaidEth() public noReentrant returns(bool) {
            uint  _balance =  address(this).balance;
            uint256 fees =(_balance*VendorAccountsManagerContract.getTipRate())/decimalMultiplier;
            uint256 payment = SafeMath.sub(_balance, fees);
            (bool sent,) = VendorAccountsManagerContract.getFeeColector().call{value: payment}("");
            require(sent, "Failed_to_pay_feecolector");
            (bool sentToSender,) = msg.sender.call{value: fees}("");
            require(sentToSender, "Failed_to_tip_sender");
            return true;
        }



    // Get a Tip for Extracting left over ERC20 TOkens from Map3 Contract
    function everyBodyGetsPaidERC20(IERC20 _tokenToWithdraw) public  noReentrant returns(bool){
            uint256 _balance = _tokenToWithdraw.balanceOf(address(this));
            uint256 fees =(_balance*VendorAccountsManagerContract.getTipRate())/decimalMultiplier;
            uint256 payment = SafeMath.sub(_balance, fees);
            _tokenToWithdraw.transfer(VendorAccountsManagerContract.getFeeColector(), payment);
            _fowardPayment(fees, msg.sender ,_tokenToWithdraw);

            return true;
    }

}


// [    "0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2",    "Testing tupple formart2",    "Living on cloud 9-2",    "chicago-2",    "IL",    "60622",    "123-456-7890",    "Connect vendors in map3.0-2",    "40.716862",    "-73.999005",    "https://ipfs.moralis.io:2053/ipfs/QmS3gdXVcjM72JSGH82ZEvu4D7nS6sYhbi5YyCw8u8z4pE/media/3",    "https://github.com/Erriccc",    "0xd9145CCE52D386f254917e481eB44e9943F39138" ]

//0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270 // POLYGON_WRAPPED_MATIC_ADDRESS