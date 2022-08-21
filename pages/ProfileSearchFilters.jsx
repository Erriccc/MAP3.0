

import { useState, useRef } from 'react';
import Collapse from '/components/ui/collapse';
import { useDrawer } from '/components/drawer-views/context';
import Scrollbar from '/components/ui/scrollbar';
import Button from '/components/ui/button';
import { Close } from '/components/icons/close';
import dynamic from 'next/dynamic';
import { useRouter } from "next/dist/client/router";

const ProfileSearchSelect = dynamic(() => import('/components/ui/ProfileSearchSelect'));

export default function ProfileSearchFilters() {
    const { closeDrawer } = useDrawer();
    const router = useRouter();


    let [selectedCoin, setSelectedCoin] = useState('');
    let [visibleCoinList, setVisibleCoinList] = useState(false);
    const modalContainerRef = useRef(null);//

    // useClickAway(modalContainerRef, () => {
    //     setVisibleCoinList(false);
    // });
    // useLockBodyScroll(visibleCoinList);
    function handleSelectedCoin(coin) {
        setSelectedCoin(coin);
        setVisibleCoinList(false);
        router.push({
          pathname: "/appvendors",
          query: {
            // location: searchInput, // Note location was changed to map3Querry
            map3Querry: coin // SET as Many filters as you want from here

          },
        });
        // getCoinValue && getCoinValue(coin);
    }


    return (<div className="relative w-full max-w-full bg-white dark:bg-dark">
      <div className="flex h-20 items-center justify-between overflow-hidden px-6 py-4">
        <h2 className="text-xl font-medium uppercase tracking-wider text-gray-900 dark:text-white">
          Filters
        </h2>

        <Button shape="circle" color="white" onClick={closeDrawer} className="dark:bg-light-dark">
          <Close className="h-auto w-3"/>
        </Button>
      </div>
      <Scrollbar style={{ height: 'calc(100% - 96px)' }}>
        <div className="px-6 pb-20 pt-1">
          {/* <Filters /> */}
      <Collapse label="Users" initialOpen>
      <ProfileSearchSelect tittle={'Find User'} onSelect={(selectedCoin) => handleSelectedCoin(selectedCoin)}/>
      </Collapse>

        </div>
      </Scrollbar>
      <div className="absolute left-0 bottom-4 z-10 w-full px-6">
        <Button fullWidth onClick={closeDrawer}>
          DONE
        </Button>
      </div>

      
    </div>);
}
