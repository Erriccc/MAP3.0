/* global window */
import Moralis from 'moralis';
const  { ethers }=require( "ethers"); // from hardhat throws error "Can't resolve 'console'"
import Rpcs from 'Utilities/Rpcs';

// const  verifyChainId = Moralis.verifyChainId
const  AbstractWeb3Connector = Moralis.AbstractWeb3Connector
// import { ConnectorEvents } from './events';
// import { getMoralisRpcs } from './MoralisRpcs';

export const WalletConnectEvent = Object.freeze({
  ACCOUNTS_CHANGED: 'accountsChanged',
  CHAIN_CHANGED: 'chainChanged',
  DISCONNECT: 'disconnect',
});

/**
 * Connector to connect an WalletConenct provider to Moralis
 * Note: this assumes using WalletConnect v1
 * // TODO: support WalletConnect v2
 */

class WalletConnectWeb3Connector extends AbstractWeb3Connector {
  type = 'WalletConnect';

  async activate({ chainId: providedChainId, mobileLinks, newSession } = {}) {
    // Log out of any previous sessions
    if (newSession) {
      this.cleanup();
    }
 
    if (!this.provider) {
      let WalletConnectProvider;
      const config = {
        // rpc: getMoralisRpcs('WalletConnect'),https://polygon-rpc.com
        // rpc: 'https://matic-mainnet.chainstacklabs.com',
        // chainId: providedChainId,
        // rpc: {
        //         137: 'https://polygon-rpc.com',
        //       },
         rpc:{
          1: `https://eth-mainnet.nodereal.io/v1/1659dfb40aa24bbb8153a677b98064d7`,
          137: `https://polygon-rpc.com`,
          80001: `https://rpc-mainnet.matic.quiknode.pro`,
          56: `https://binance.nodereal.io`,
          97: `https://bsctestapi.terminet.io/rpc`,
          43114: `https://1rpc.io/avax/c`,
          43113: `https://rpc.ankr.com/avalanche_fuji`,
          250: `https://rpc2.fantom.network`,
          1287: `https://rpc.api.moonbase.moonbeam.network`,
        },
        chainId: 137,
        qrcodeModalOptions: {
          mobileLinks,
        },
      };


      try {
        WalletConnectProvider = require('@walletconnect/web3-provider')?.default;
      } catch (error) {
        // Do nothing. User might not need walletconnect
      }

      if (!WalletConnectProvider) {
        WalletConnectProvider = window?.WalletConnectProvider?.default;
      }

      if (!WalletConnectProvider) {
        throw new Error(
          'Cannot enable via WalletConnect: dependency "@walletconnect/web3-provider" is missing'
        );
      }


      if (typeof WalletConnectProvider === 'function') {
        this.provider = new WalletConnectProvider(config);
      } else {
        this.provider = new window.WalletConnectProvider(config);
      }
    }

    if (!this.provider) {
      throw new Error('Could not connect via WalletConnect, error in connecting to provider');
    }

    const accounts = await this.provider.enable();

    const account = accounts[0].toLowerCase();
    const { chainId } = this.provider;
    // const verifiedChainId = verifyChainId(chainId);
    const verifiedChainId = ethers.utils.hexValue(chainId);

    this.account = account;
    this.chainId = verifiedChainId;

    this.subscribeToEvents(this.provider);

    return { provider: this.provider, account, chainId: verifiedChainId };
  }

  // Cleanup old sessions
  cleanup() {
    try {
      if (window) {
        window.localStorage.removeItem('walletconnect');
      }
    } catch (error) {
      // Do nothing
    }
  }

  async deactivate() {
    this.unsubscribeToEvents(this.provider);

    if (this.provider) {
      try {
        await this.provider.close();
      } catch {
        // Do nothing
      }
    }

    this.account = null;
    this.chainId = null;
    this.provider = null;
  }
}

export default WalletConnectWeb3Connector;