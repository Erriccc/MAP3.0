// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./IWormhole.sol";
import "./Structs.sol";


//this contract is responsible for escrowing & releasing the funds on both chains. 
interface IWETH is IERC20 {
    function deposit() external payable;
    function withdraw(uint) external;
}

contract IPLN is Ownable{

         bool internal locked;

        modifier noReentrant() {
        require(!locked, "No re-entrancy");
        locked = true;

        _;
        locked = false;
    }

        uint nextDepositPlanId;

        struct Deposit {
            address Depositor;
            uint destinationChain;
            address originCurrencyAddr;
            bytes destinationCurrencyAddr;
            bytes destinationWalletAddr;
            uint amount;
            uint expiery;
        }

     
        struct matchMade {
            address liquidityRelayer;
            uint destinationChain;
            bytes destinationCurrencyAddr;
            uint amount;
        }


        mapping(uint => Deposit) reqToBridgeOut; // Keep track of every deposit made...
        mapping(uint => matchMade) aggreementToBridgeReq; // Keep track of every incoming reqToBridgeOut

            event bridgeSettled( // emit an event after bridge request is settled
                address from,
                address to,
                address tokenIn ,
                address tokenOut,
                uint256 amount
            );  
    event mesageSent(uint _sequence, string _message); // emit a message after calling the wormwhole core contract

        IWormhole public _wormWhole;
        address private wormWholeCoreAddress;

        string private current_msg;
        uint32 nonce = 0;
        mapping(uint16 => bytes32) _applicationContracts;
        // address owner;
        mapping(bytes32 => bool) _completedMessages;

    function GetThisContractAllowance(IERC20 _Coin) public view returns(uint256){
       return _Coin.allowance(msg.sender, address(this));
}

                    function escrowFunds(
                        uint destinationChain,
                        address originCurrencyAddr,
                        bytes memory destinationCurrencyAddr,
                        bytes memory destinationWalletAddr,
                        uint amount,
                        uint expiery) public payable returns (bool) {
                                IERC20 originCurrency = IERC20(originCurrencyAddr);
                                require(amount <= GetThisContractAllowance(originCurrency),"approve enough token");
                                originCurrency.transferFrom(msg.sender, address(this), amount);
                                require(originCurrency.balanceOf(address(this)) >= amount, "transfer_failed");
                                reqToBridgeOut[nextDepositPlanId] =Deposit(msg.sender, destinationChain,originCurrencyAddr,destinationCurrencyAddr,destinationWalletAddr,amount,expiery);
                                nextDepositPlanId +=1;

                                bridgeRequest('0x0090');
                                return true;
                    }

// matchVaultFunds() unpacks Vaa, decodes bytecode, and executes escrow function that locks a liquidity relayers funds.
// the message should contain 
  function matchBridgeRequest(bytes memory str) public noReentrant payable returns(bool) {

// first step is to verify the recieved vaa message 
        (bytes memory verifiedMessage, uint emitterChainId, bytes32 emitterAddressId) = processAndVerifyMyMessage(str);
            // next step is to decode bytes into redable data
        (uint _amount, bytes memory _destinationCurrencyAddr, uint _profitAmount, uint _functionCallNumber, uint _reqToBridgeOutId, bytes memory destinantionWalletAddress, bytes memory destinationWalletAddr)
        = abi.decode(verifiedMessage, (uint, bytes, uint, uint, uint, bytes, bytes));
        return true;
    }

    function matchVaultFunds(address Depositor,
                        uint destinationChain,
                        address originCurrencyAddr,
                        bytes memory destinationCurrencyAddr,
                        uint amount,
                        uint expiery) public payable returns (bool) {

                }


    function bridgeRequest(bytes memory str) public noReentrant payable returns(bool) {
        emitMyMessage(str );
        return true;
    }

        constructor(address _wormWholeAddres)  payable{
                    wormWholeCoreAddress = _wormWholeAddres;
                    _wormWhole = IWormhole(_wormWholeAddres);
                    }

// /////////////////////////////////////////////////////////////////////////
// RECIVE VAA MESSAGES FROM RELAYERS
// /////////////////////////////////////////////////////////////////////////


    mapping (uint16  => bytes32) public myTrustedContracts;
    mapping (bytes32 => bool) public processedMessages;
    mapping (bytes => address) public parseIntendedRecipient;


// Verification accepts a single VAA, and is publicly callable.
function processAndVerifyMyMessage(bytes memory VAA) public returns(bytes memory, uint, bytes32) {
    // This call accepts single VAAs and headless VAAs
    (IWormhole.VM memory vm, bool valid, string memory reason) =
        // core_bridge.parseAndVerifyVM(VAA);
        _wormWhole.parseAndVerifyVM(VAA);

    // Ensure core contract verification succeeded.
    require(valid, reason);

    // Ensure the emitterAddress of this VAA is a trusted address
    // require(myTrustedContracts[vm.emitterChainId] ==
    //     vm.emitterAddress, "Invalid Emitter Address!");


    require(_applicationContracts[vm.emitterChainId] == vm.emitterAddress, "Invalid Emitter Address!");

    // Check that the VAA hasn't already been processed (replay protection)
    // require(!processedMessages[vm.hash], "Message already processed");

    require(!_completedMessages[vm.hash], "Message already processed");
        _completedMessages[vm.hash] = true;

    // Check that the contract which is processing this VAA is the intendedRecipient
    // If the two aren't equal, this VAA may have bypassed its intended entrypoint.
    // This exploit is referred to as 'scooping'.

    // require(parseIntendedRecipient(vm.payload) == msg.sender);

    // Add the VAA to processed messages so it can't be replayed
    processedMessages[vm.hash] = true;


    // The message content can now be trusted.

    return (vm.payload, vm.emitterChainId, vm.emitterAddress);

        

    // doBusinessLogic(vm.payload)
}

// /////////////////////////////////////////////////////////////////////////
// SEND MESSAGES TO GUARDIAN NETWORK
// /////////////////////////////////////////////////////////////////////////


// This function defines a super simple Wormhole 'module'.
// A module is just a piece of code which knows how to emit a composable message
// which can be utilized by other contracts.
// function emitMyMessage(address intendedRecipient, uint32 nonce)
function emitMyMessage(bytes memory str)
        public returns (uint64 sequence) {

    // Nonce is passed though to the core bridge.
    // This allows other contracts to utilize it for batching or processing.

    // intendedRecipient is key for composability!
    // This field will allow the destination contract to enforce
    // that the correct contract is submitting this VAA.

    // 1 is the consistency level,
    // this message will be emitted after only 1 block
    // sequence = core_bridge.publishMessage(nonce, "My Message to " + intendedRecipient, 1);
    sequence = _wormWhole.publishMessage(nonce, str , 1);
    nonce = nonce+1;

    emit mesageSent(sequence, "message_sent");

    // The sequence is passed back to the caller, which can be useful relay information.
    // Relaying is not done here, because it would 'lock' others into the same relay mechanism.
}


 function getCurrentMsg() public view returns (string memory){
        return current_msg;
    }
    /**
        Registers it's sibling applications on other chains as the only ones that can send this instance messages
     */
    function registerApplicationContracts(uint16 chainId, bytes32 applicationAddr) public onlyOwner{
        // require(msg.sender == owner, "Only owner can register new chains!");
        _applicationContracts[chainId] = applicationAddr;
    }



}