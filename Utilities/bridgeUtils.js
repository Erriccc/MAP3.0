
import { getEmitterAddressEth, getEmitterAddressSolana,getSignedVAA, parseSequenceFromLogEth, setDefaultWasm } from '@certusone/wormhole-sdk';
const Utils = require('./utils');
const apiUtils = require('./apiUtils');
import fetch from 'node-fetch';

const config = JSON.parse(fs.readFileSync('./xdapp.config.json').toString());


const OriginchainContract =  "i"


// import {
//     getEmitterAddressEth,
//     getSignedVAA,
//     parseSequenceFromLogEth,
//   } from "@certusone/wormhole-sdk";
//   import { getAddress } from "@ethersproject/address";
//   import { NodeHttpTransport } from "@improbable-eng/grpc-web-node-http-transport";
//   import { ethers } from "ethers";
  
//   (async () => {
//     // const chain = 10001
//     // const rpc = "https://ropsten.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161";
//     // const txhash =
//     //   "0x710bafcc0296de6267dfcc9864b36e5ba6a1e0521d84cc276fd6d4db8993eb2f";
//     // const wh = "0x210c5F5e2AF958B4defFe715Dc621b7a3BA888c5";
//     // const nft = "0x5647d16cab593f330acecf4c1e1029b16a692b0a"
//     const chain = 4;
//     const rpc = "https://data-seed-prebsc-1-s1.binance.org:8545/";
//     const txhash =
//       "0x1f7e699f2b1ee9df61459f2904506649abece8bb9a2b3660fb49227ae46edf90";
//     const wh = "0x68605AD7b15c732a30b1BbC62BE8F2A509D74b4D";
//     const nft = "0x9f4a371bc75c6d3d1db73ba48e8185080d84b69f";
//     const ethProvider = new ethers.providers.JsonRpcProvider(rpc);
//     const sendReceipt = await ethProvider.getTransactionReceipt(txhash);
//     const sequence = parseSequenceFromLogEth(sendReceipt, wh);
//     const emitter = getEmitterAddressEth(getAddress(nft));
//     console.log(emitter, sequence);
//     const { vaaBytes: signedVAA } = await getSignedVAA(
//       "https://wormhole-v2-testnet-api.certus.one",
//       chain,
//       emitter,
//       sequence,
//       {
//         transport: NodeHttpTransport(),
//       }
//     );
//     console.log(Buffer.from(signedVAA).toString("hex"));
//   })();