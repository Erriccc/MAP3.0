import cn from 'classnames';
import AuthorCard from '/components/ui/author-card';
import Logo from '/components/ui/logo';
import { MenuItem } from '/components/ui/collapsible-menu';
import Scrollbar from '/components/ui/scrollbar';
import Button from '/components/ui/button'; 
import { useRouter } from "next/dist/client/router";
import routes from 'config/routes';
import { useDrawer } from '/components/drawer-views/context';
import { HomeIcon } from '/components/icons/home';
import { FarmIcon } from '/components/icons/farm';
import { PoolIcon } from '/components/icons/pool';
import { ProfileIcon } from '/components/icons/profile';
import { DiskIcon } from '/components/icons/disk';
import { ExchangeIcon } from '/components/icons/exchange';
import { VoteIcon } from '/components/icons/vote-icon';
import { Close } from '/components/icons/close';
import { PlusCircle } from '/components/icons/plus-circle';
import { CompassIcon } from '/components/icons/compass';
import SettingsButton from '/components/settings/settings-button';
import { useMoralis } from "react-moralis";
import { useContext, useEffect } from 'react';
import { WalletContext } from 'lib/hooks/use-connect';
 
// import { ConnectButton, Icon, Select, DatePicker, Input } from "web3uikit";

//images
import AuthorImage from 'assets/images/author.jpg';//





export default function Sidebar({ className }) {
    const { closeDrawer } = useDrawer();
    const router = useRouter()
  // const {isAuthenticated, account } = useMoralis();
  const { address,isConnected,authState, error, connectToWallet, disconnectWallet} = useContext(WalletContext);
  const menuItems = [
    {
        name: 'Home',
        icon: <HomeIcon />,
        href: routes.home,
    },
    {
      name: 'Qr Code',
      icon: <DiskIcon />,
      href: routes.qrCode,
  },
   
    {
        name: '0x PAY',
        icon: <PoolIcon />,
        href: routes.pay,
    },
    {
        name: '0x Map',
        icon: <CompassIcon />,
        href: routes.appvendors,
    },
    {
        name: 'Settings',
        icon: <PlusCircle />,
        href: routes.profileSetUp,
    },
     
    // {
    //     name: 'NFT Details',
    //     icon: <DiskIcon />,
    //     href: routes.nftDetails,
    // },
    // {
    //     name: 'Profile',
    //     icon: <ProfileIcon />,
    //     href: routes.profile,
    // },
    // {
    //     name: 'Vote',
    //     icon: <VoteIcon />,
    //     href: '/vote',
    //     dropdownItems: [
    //         {
    //             name: 'Explore',
    //             href: routes.vote,
    //         },
    //         {
    //             name: 'Vote with pools',
    //             href: routes.proposals,
    //         },
    //         {
    //             name: 'Create proposal',
    //             href: routes.createProposal,
    //         },
    //     ],
    // },
];


    return (<aside className={cn('top-0 z-40 h-full w-full max-w-full border-dashed border-gray-200 bg-body ltr:left-0 ltr:border-r rtl:right-0 rtl:border-l dark:border-gray-700 dark:bg-dark xs:w-80 xl:fixed  xl:w-72 2xl:w-80', className)}>
      <div className="relative flex h-24 items-center justify-between overflow-hidden px-6 py-4 2xl:px-8">
        {/* <Logo /> */}
        <div
        onClick={() => router.push("./")}
        className="relative flex items-center justify-center py-1 cursor-pointer"
      >
        <h1 className="text-blue-500 font-bold">0x<span className="text-gray-600 font-bold">maps</span></h1>
      </div>

        <div className="md:hidden">
          <Button title="Close" color="white" shape="circle" variant="transparent" size="small" 
          onClick={closeDrawer}
          >
            <Close className="h-auto w-2.5"/>
          </Button>
        </div>
      </div>

      {/* <Scrollbar style={{ height: 'calc(100% - 96px)' }}> */}
        <div className="px-6 pb-5 2xl:px-8">


          {isConnected ? (
          
          <AuthorCard image={AuthorImage} name="Map3 User" role="admin"/>
          ):(
            // <ConnectButton  signingMessage={getRandomNonce(time)}/> 
            // <div>Connect Button Place Holder</div>
            <div></div>
          )}
          <div className="mt-12">
            {/* map though menuItems and only display Qr Code if isConnected == true {menuItems && menuItems.map((item, index) => (<MenuItem key={index} name={item.name} href={item.href} icon={item.icon} dropdownItems={item.dropdownItems}/>))}
*/}
    
            

    {menuItems &&
        menuItems.map((item, index) => {
          if (item.name === 'Qr Code' || item.name === 'Settings' && !isConnected) {
            return null;
          }
          return (
            <MenuItem
              key={index}
              name={item.name}
              href={item.href}
              icon={item.icon}
              dropdownItems={item.dropdownItems}
            />
          );
        })}
          </div>
        <div className="relative h-12 w-1/3 px-6 pb-5 2xl:px-8">
          </div>

        </div>
      {/* </Scrollbar> */}
    </aside>);
}
//