import { Bitcoin } from '/components/icons/bitcoin';
import { Ethereum } from '/components/icons/ethereum';
import { Tether } from '/components/icons/tether';
import { Bnb } from '/components/icons/bnb';
import { Usdc } from '/components/icons/usdc';
// import { Cardano } from '/components/icons/cardano';
// import { Doge } from '/components/icons/doge';
import { DefaultCoinIcon } from '/components/icons/defaultCoinIcon';



const  sendersCoinList = {

        137:[
            {
                icon: <DefaultCoinIcon symbol={'MTC'} />,
                address: "0x0000000000000000000000000000000000000000",
                // code: await getTokenSymbol(address),
                code: 'MATIC',
                name: 'Matic',
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
        ],
        80001:[
            {
                icon: <DefaultCoinIcon symbol={'Mumbai'} />,
                address: "0x0000000000000000000000000000000000000000",
                // code: await getTokenSymbol(address),
                code: 'tst MTC',
                name: 'Test Matic',
            },
            {
                icon: <DefaultCoinIcon symbol={'Test DAI'} />,
                address: "0x5A01Ea01Ba9A8DC2B066714A65E61a78838B1b9e",
                code: 'TDAI',
                name: 'Test DAI',
            },
            {
                icon: <Usdc />,
                address: "0xe6b8a5CF854791412c1f6EFC7CAf629f5Df1c747",
                code: 'TUSD',
                name: 'Test USDc',
            },
            {
                icon: <DefaultCoinIcon symbol={'STC'} />,
                address: "0x6030B2750f24909Baa778CdDa43B7d1058b9619B",
                code: 'STC',
                name: 'Stable Coin',
            }
        ],
        56:[
            {
                icon: <DefaultCoinIcon symbol={'BNB'} />,
                address: "0x0000000000000000000000000000000000000000",
                // code: await getTokenSymbol(address),
                code: 'BNB',
                name: 'BNB',
            },
            {
                icon: <DefaultCoinIcon symbol={'WBNB'} />,
                address: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
                code: 'WBNB',
                name: 'Wrapped BNB',
            },
            {
                icon: <Ethereum />,
                address: "0x2170Ed0880ac9A755fd29B2688956BD959F933F8",
                code: 'WETH',
                name: 'Wrapped Eth',
            },
            {
                icon: <DefaultCoinIcon symbol={'DAI'} />,
                address: "0x1AF3F329e8BE154074D8769D1FFa4eE058B1DBc3",
                code: 'DAI',
                name: 'DAI',
            },
            {
                icon: <DefaultCoinIcon symbol={'BU'}/>,
                address: "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56",
                code: 'BUSD',
                name: 'BNB-USD',
            },
            {
                icon: <Usdc />,
                address: "0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d",
                code: 'USD',
                name: 'USD Coin',
            },
        ],
        43114:[
            {
                icon: <DefaultCoinIcon symbol={'AVX'} />,
                address: "0x0000000000000000000000000000000000000000",
                // code: await getTokenSymbol(address),
                code: 'AVAX',
                name: 'AVAX',
            },
            {
                icon: <Bitcoin />,
                address: "0x408D4cD0ADb7ceBd1F1A1C33A0Ba2098E1295bAB",
                code: 'BTC', 
                name: 'Bitcoin',
            },
            {
                icon: <DefaultCoinIcon symbol={'WAVX'} />,
                address: "0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7",
                code: 'WAVAX',
                name: 'WRAPPED AVAX',
            },
            {
                icon: <Ethereum />,
                address: "0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619",
                code: 'WETH',
                name: 'Wrapped Eth',
            },
            {
                icon: <DefaultCoinIcon symbol={'DAI'} />,
                address: "0xd586E7F844cEa2F87f50152665BCbc2C279D8d70",
                code: 'DAI',
                name: 'DAI',
            },
            {
                icon: <Usdc />,
                address: "0xA7D7079b0FEaD91F3e65f86E8915Cb59c1a4C664",
                code: 'USD',
                name: 'USD Coin',
            },
        ],
        16:[
            {
                icon: <DefaultCoinIcon symbol={'MBM'} />,
                address: "0x0000000000000000000000000000000000000000",
                // code: await getTokenSymbol(address),
                code: 'MBM',
                name: 'Moon',
            },
            {
                icon: <DefaultCoinIcon symbol={'STC'} />,
                address: "0x2490fC51971ea8061182990de83da72080eA61cC",
                code: 'STC',
                name: 'Stable Coin',
            }
        ],
        250:[
            {
                icon: <DefaultCoinIcon symbol={'FTM'} />,
                address: "0x0000000000000000000000000000000000000000",
                // code: await getTokenSymbol(address),
                code: 'FTM',
                name: 'FANTOM',
            },
            {
                icon: <DefaultCoinIcon symbol={'WFTM'} />,
                address: "0x21be370D5312f44cB42ce377BC9b8a0cEF1A4C83",
                code: 'WFANTOM',
                name: 'Wrapped Fantom',
            },
            {
                icon: <Ethereum />,
                address: "0x74b23882a30290451A17c44f4F05243b6b58C76d",
                code: 'WETH',
                name: 'Wrapped Eth',
            },
            {
                icon: <DefaultCoinIcon symbol={'DAI'} />,
                address: "0x8D11eC38a3EB5E956B052f67Da8Bdc9bef8Abf3E",
                code: 'DAI',
                name: 'DAI',
            },
            {
                icon: <Usdc />,
                address: "0x04068DA6C83AFCFA0e13ba15A6696662335D5B75",
                code: 'USD',
                name: 'USD Coin',
            },
        ],
        0x0:[
            {
                icon: <DefaultCoinIcon symbol={'NA'} />,
                address: "0x0000000000000000000000000000000000000000",
                // code: await getTokenSymbol(address),
                code: 'NA',
                name: 'UNSUPORTED Chain',
            },
            {
                icon: <DefaultCoinIcon symbol={'NA'} />,
                address: "0x0000000000000000000000000000000000000001",
                // code: await getTokenSymbol(address),
                code: 'NA',
                name: 'UNSUPORTED Chain',
            },
            {
                icon: <DefaultCoinIcon symbol={'NA'} />,
                address: "0x0000000000000000000000000000000000000002",
                // code: await getTokenSymbol(address),
                code: 'NA',
                name: 'UNSUPORTED Chain',
            },
        ],
        
};

module.exports = {sendersCoinList}