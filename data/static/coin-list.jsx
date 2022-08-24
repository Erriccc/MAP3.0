import { Bitcoin } from '/components/icons/bitcoin';
import { Ethereum } from '/components/icons/ethereum';
import { Tether } from '/components/icons/tether';
import { Bnb } from '/components/icons/bnb';
import { Usdc } from '/components/icons/usdc';
import { Cardano } from '/components/icons/cardano';
import { Doge } from '/components/icons/doge';
export const coinList = [
    {
        icon: <Bitcoin />,
        code: 'BTC',
        name: 'Bitcoin',
    },
    {
        icon: <Ethereum />,
        code: 'ETH',
        name: 'Ethereum',
    },
    {
        icon: <Tether />,
        code: 'USDT',
        name: 'Tether USD',
    },
    {
        icon: <Bnb />,
        code: 'BNB',
        name: 'Binance Coin',
    },
    {
        icon: <Usdc />,
        code: 'USDC',
        name: 'USD Coin',
    },
    {
        icon: <Cardano />,
        code: 'ADA',
        name: 'Cardano',
    },
    {
        icon: <Doge />,
        code: 'DOGE',
        name: 'Doge Coin',
    },
];
