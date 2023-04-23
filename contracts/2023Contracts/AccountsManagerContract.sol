// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
// 0x3cb378f3cD2461563e6942F00857d6BC65054CB7
// BUG NOTE............
// NOTE that default value for uint mapping is 0 so make sure to initialize...
// ...ID mappings incase you have to delete an id . ID[undefined] = 0...


interface IMap3Pay {}

interface ISubscriptionContract {
    function unsubscribeVendor( address _vendor) external returns(bool);
    function getSubscriptionAvailableTransactionsLeft(address _account) external view  returns (uint);
    function getSubscriptionNextPayment(address _account) external view  returns (uint);
    function setSubscriptionAvailableTransactionsLeft(address _account, uint _newNumber, bool _calculation) external returns (bool);
    function freeTrialSubscribtion(address _vendor) external returns(bool);

}

contract AccountsManagerContract is Ownable{

     /*
      * This contract is responsible for managing accounts, and serving context to different application modules
      * @deployment_dependency: This contact needs the a fee colector eoa address to be deployed
      * @operational_note: once deployed, Make sure to set the @Map3P2PContract and the @SubscriptionsContract
   */
    IMap3Pay private Map3P2PContract;
    ISubscriptionContract private SubscriptionsContract;

    // @function these functions initializes the Map3P2PContract and SubscriptionsContract
    function setP2PContract(IMap3Pay _map3Pay) public onlyOwner returns(bool) {
        Map3P2PContract = _map3Pay;
        return true;
    }
    function setSubscriptionContract(ISubscriptionContract _ivendorplans) public onlyOwner returns(bool) {
        SubscriptionsContract = _ivendorplans;
        return true;
    }


// @constructor fee colector(address feeColector) needed for this contract to be deployed
constructor(address _feeColector)payable {
    feeColector = _feeColector;
    freePlan._planTransactionLimit = 3;
    freePlan._planPrice = 0;
  }


    /*
        *CORE Parameters!
    */

    bool internal locked;
    bool internal SubscriptionsContractLock;
    VendorPlan public  freePlan;
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
    mapping (string => bool) public isUserNameTaken;
    mapping (address => bool) public isVendorActive;
    mapping (address => uint256) public VendorId;

    


    /*
            *MODEFIRES, STRUCTS, EVENTS and ERRORS !?
        */

            modifier noReentrant() {
                require(!locked, "noReentrant_Accmgr");
                locked = true;
                _;
                locked = false;
            }

            struct Subscription {
                address subscriber; // subscriber which is the vendors
                uint availableTransactionsLeft; // available transactions left should be deducted after each transaction
                uint nextPayment; // next payment date for the vendor, calculated in seconds
                }
        

            struct VendorPlan{
                uint _planTransactionLimit;
                uint _planPrice;
            }
// [    "0x5B38Da6a701c568545dCfcB03FcB875f56beddC4",    "osborn_ojure",    "google.com", "0xd9145CCE52D386f254917e481eB44e9943F39138", 0]
// [    "0x5B38Da6a701c568545dCfcB03FcB875f56beddC4",    "0xd9145CCE52D386f254917e481eB44e9943F39138", 0]

            struct Vendor{
            address vendorsWalletAddress;
            // string vendorsName;
            // string metaDataUrl;
            IERC20 vendorsToken;
            uint256 vendorsId;
            }

            event VendorCreated (
                address vendorsWalletAddress,
                // string vendorsName,
                // string metaDataUrl,
                IERC20 vendorsToken,
                uint256 vendorsId
            ); //VendorCreated(address,string,string,IERC20,uint256)

            event VendorPlanCreated(
                    uint _planPrice,
                    uint _planTransactionLimit,
                    uint planIdem
            );




    /*
                *@INTERFACE GET/SET FUNCTIONS
    */


    // function  setVendorToken(IERC20 _newToken) public returns (bool){
    //         require(isVendor[address(msg.sender)] , "Err_payment_<_price" );
    //         VendorList[VendorId[address(msg.sender)]].vendorsToken = _newToken;
    //     return true;
    //     }

    // function  setVendorName(string memory _newName) public returns (bool){
    //         require(isVendor[address(msg.sender)] , " Err_N_V_1" );
    //         VendorList[VendorId[address(msg.sender)]].vendorsName = _newName;
    //     return true;
    //     }
    
    //     function  setVendorMetaDataUrl(string memory _newWebsiteUrl) public returns (bool){
    //         require(isVendor[address(msg.sender)] , "Err_N_V_2" );
    //         VendorList[VendorId[address(msg.sender)]].metaDataUrl = _newWebsiteUrl;
    //     return true;
    //     }

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


function checkIsVendor(address _account) external view returns (bool){
        return isVendor[_account];
}

function checkIsVendorActive(address _account) external view returns (bool){
        return isVendorActive[_account];
}

function setIsVendorActive(address _account, bool signal) external returns (bool){
    require(address(msg.sender) == address(SubscriptionsContract), "Permision_err_2" );
    isVendorActive[_account] = signal;
    return true;
}
function checkSubscriptionLock() external view returns (bool){
        return SubscriptionsContractLock;
}

function setSubscriptionLock(bool signal) public onlyOwner returns (bool){
    SubscriptionsContractLock = signal;
    return true;
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

function getP2Pcontract() external view returns (address){
        return address(Map3P2PContract);
}
function getSubscriptionContract() external view returns (address){
        return address(SubscriptionsContract);
}


function getFeeColector() external view returns (address){
        return feeColector;
}






    
        /*
                *@CORE Account Manager FUNCTIONS
            */



        function addVendor(Vendor memory _signUpVendor) public payable returns(bool) {
                                require(msg.value >= vendorSignUpFee, "Err_payment_<_price_1");
                                // require(address(msg.sender) == _signUpVendor.vendorsWalletAddress, "vendor has to solely sign up"); // require vendors sign up themselves
                                require(!isVendor[_signUpVendor.vendorsWalletAddress], "Err_Already_Signed_up");


                                // check to makesure username is not already in use.
                                // require(!isUserNameTaken[_signUpVendor.vendorsName], "Err_U_N_1");
                                // isUserNameTaken[_signUpVendor.vendorsName] = !isUserNameTaken[_signUpVendor.vendorsName];
                                //TODO! check username Legnth too 

                                // isVendor[_signUpVendor.vendorsWalletAddress] = !isVendor[_signUpVendor.vendorsWalletAddress];
                                isVendor[_signUpVendor.vendorsWalletAddress] = true;

                                // VendorId[address(msg.sender)] = VendorIdCount;
                                VendorId[_signUpVendor.vendorsWalletAddress] = VendorIdCount;

                                // new vendor struct fomart
                                VendorList.push(Vendor({
                                    vendorsWalletAddress: _signUpVendor.vendorsWalletAddress,
                                    // vendorsName: _signUpVendor.vendorsName,
                                    // metaDataUrl: _signUpVendor.metaDataUrl,
                                    vendorsToken: _signUpVendor.vendorsToken,
                                    vendorsId: VendorId[address(msg.sender)]

                                }));

                                //  VendorList.push(Vendor({
                                //     vendorsWalletAddress: _signUpVendor.vendorsWalletAddress,
                                //     vendorsName: _signUpVendor.vendorsName,
                                //     metaDataUrl: _signUpVendor.metaDataUrl,
                                //     vendorsToken: _signUpVendor.vendorsToken,
                                //     vendorsId: VendorId[address(msg.sender)]

                                // }));
                                // give new vendors free trial for subscription
                                SubscriptionsContract.freeTrialSubscribtion(_signUpVendor.vendorsWalletAddress);

                                emit VendorCreated(
                                _signUpVendor. vendorsWalletAddress,
                                // _signUpVendor. vendorsName,
                                // _signUpVendor. metaDataUrl,
                                _signUpVendor. vendorsToken,
                                VendorId[address(msg.sender)]
                                );
                                VendorIdCount ++;
                                return true;

                        }
    
    function  removeVendor(address _vendor) public returns (bool){

            require(address(msg.sender) == _vendor, "Permision_err_1" );
            require(isVendor[_vendor], "Err_N_V_3"); 
            if (SubscriptionsContract.getSubscriptionAvailableTransactionsLeft(_vendor) > 0){
                SubscriptionsContract.unsubscribeVendor(_vendor);
            }
                isVendor[_vendor] = false;
                // isUserNameTaken[ VendorList[VendorId[_vendor]].vendorsName ] = false;
                delete VendorList[VendorId[_vendor]]; 
                delete VendorId[_vendor];
                return true;
    }

    
    
    

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                // MISC MISC MISC MISC MISC MISC MISC MISC MISC
                                // MISC MISC MISC MISC MISC MISC MISC MISC MISC
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    receive() external payable {}
    
        function _fowardPayment(uint256 _ammount, address _to, IERC20 _tokenIn) private returns(bool){
            _tokenIn.transfer(_to, _ammount);
            uint contractBanlanceOfToken = _tokenIn.balanceOf(address(this));
            _tokenIn.transfer(feeColector, contractBanlanceOfToken);
            return true;
        }

            // Get a Tip for Extracting left over ETH from Map3 Contract
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



