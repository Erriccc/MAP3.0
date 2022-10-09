
import { getEmitterAddressEth, getEmitterAddressSolana, parseSequenceFromLogEth, setDefaultWasm } from '@certusone/wormhole-sdk';
const Utils = require('./utils');
const apiUtils = require('./apiUtils');
import fetch from 'node-fetch';

const config = JSON.parse(fs.readFileSync('./xdapp.config.json').toString());


const OriginchainContract =  "i"
