import { Bitcoin } from '/components/icons/bitcoin';
import { Ethereum } from '/components/icons/ethereum';
import { Tether } from '/components/icons/tether';
import { Bnb } from '/components/icons/bnb';
import { Usdc } from '/components/icons/usdc';
// import { Cardano } from '/components/icons/cardano';
// import { Doge } from '/components/icons/doge';
import { DefaultCoinIcon } from '/components/icons/defaultCoinIcon';

//  const reciversCoinList = [
//     {
//         icon: <Bitcoin />,
//         address: "0x1BFD67037B42Cf73acF2047067bd4F2C47D9BfD6",
//         code: 'BTC',
//         name: 'Bitcoin',
//     },
//     {
//         icon: <DefaultCoinIcon symbol={'WC'} />,
//         address: "0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270",
//         code: 'WMATIC',
//         name: 'Wrapped Matic',
//     },
//     {
//         icon: <Ethereum />,
//         address: "0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619",
//         code: 'WETH',
//         name: 'Wrapped Eth',
//     },
//     {
//         icon: <DefaultCoinIcon symbol={'DAI'} />,
//         address: "0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063",
//         code: 'DAI',
//         name: 'DAI',
//     },
//     {
//         icon: <DefaultCoinIcon symbol={'BU'}/>,
//         address: "0xdAb529f40E671A1D4bF91361c21bf9f0C9712ab7",
//         code: 'BUSD',
//         name: 'BNB-USD-Unstable!',
//     },
//     {
//         icon: <Usdc />,
//         address: "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174",
//         code: 'USD',
//         name: 'USD Coin',
//     },
// ];



const  sendersCoinList = [
    // {
    //     icon: <DefaultCoinIcon symbol={''} />,
    //     address: "",
    //     // code: await getTokenSymbol(address),
    //     code: '',
    //     name: '',
    // },
    {
        icon: <DefaultCoinIcon symbol={'MTC'} />,
        address: "0x0000000000000000000000000000000000000000",
        // code: await getTokenSymbol(address),
        code: 'MATIC',
        name: 'Native Token',
    },
    {
        icon: <Bitcoin />,
        address: "0x1BFD67037B42Cf73acF2047067bd4F2C47D9BfD6",
        code: 'BTC',
        name: 'Bitcoin',
    },
    {
        icon: <DefaultCoinIcon symbol={'WM'} />,
        address: "0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270",
        code: 'WMATIC',
        name: 'Wrapped Matic',
    },
    {
        icon: <Ethereum />,
        address: "0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619",
        code: 'WETH',
        name: 'Wrapped Eth',
    },
    {
        icon: <DefaultCoinIcon symbol={'DAI'} />,
        address: "0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063",
        code: 'DAI',
        name: 'DAI',
    },
    {
        icon: <DefaultCoinIcon symbol={'BU'}/>,
        address: "0xdAb529f40E671A1D4bF91361c21bf9f0C9712ab7",
        code: 'BUSD',
        name: 'BNB-USD',
    },
    {
        icon: <Usdc />,
        address: "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174",
        code: 'USD',
        name: 'USD Coin',
    },
];

module.exports = {sendersCoinList}