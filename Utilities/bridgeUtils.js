
import { getEmitterAddressEth, getEmitterAddressSolana, parseSequenceFromLogEth, setDefaultWasm } from '@certusone/wormhole-sdk';
const Utils = require('./utils');
const apiUtils = require('./apiUtils');
import fetch from 'node-fetch';

const config = JSON.parse(fs.readFileSync('./xdapp.config.json').toString());


const OriginchainContract =  "i"
const pvk = '87c24a6566f51e0f2b52c9ebf1bdc449206b4b3e8bc6eb593e8da72d895b3c54';
