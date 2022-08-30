import React from 'react';
import Head from "next/head";
// import "/tailwind.css";
// import "pages/profile/profile.css"
// import "pages/appvendors/vendors.css"
import "components/hero.css"
import 'mapbox-gl/dist/mapbox-gl.css';

import Router from "next/router";
import ProgressBar from "@badrap/bar-of-progress";
import { MoralisProvider } from "react-moralis";
import {NotificationProvider} from "web3uikit";

//cptc
import 'swiper/css';
import 'assets/css/scrollbar.css';
import 'assets/css/globals.css';
import 'assets/css/range-slider.css';
import { ThemeProvider } from 'next-themes';
import ModalsContainer from '/components/modal-views/container';
import DrawersContainer from '/components/drawer-views/container';
import SettingsDrawer from '/components/settings/settings-drawer';
import { WalletProvider } from 'lib/hooks/use-connect';
import{UrlProvider} from 'Utilities/FrontEndUtilities/FEUrlContext'

// page progress bar
const progress = new ProgressBar({
  size: 3,
  color: "#8ECAF7",
  className: "z-50",
  delay: 100,
});
Router.events.on("routeChangeStart", progress.start);
Router.events.on("routeChangeComplete", progress.finish);
Router.events.on("routeChangeError", progress.finish);


// TO DO IMPORTANT !!!!!!

// Note that these keys are currently exposed to the browser and could be accessed by hackers
// take out the next public to keep it in the node envitonment

const MoralisAppId = process.env.NEXT_PUBLIC_MORALIS_API_ID;
const MoralisAppUrl = process.env.NEXT_PUBLIC_MORALIS_APP_URL;



export default function MyApp({ Component, pageProps }) {
  return(
    <>
      <Head>
        <title>Map3.0 App</title>
        <meta name="viewport" content="width=device-width, initial-scale=1 maximum-scale=1"/>
        <meta name="description" content="Map3.0" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

    
       {/* <WagmiConfig client={client}> */}
       <MoralisProvider
      // appId= {MoralisAppId}
      // serverUrl={MoralisAppUrl}
      initializeOnMount={false}
    >
        <WalletProvider>
          <UrlProvider>
        <ThemeProvider attribute="class" enableSystem={false} defaultTheme="light">
          {/* <Appnav /> */}
          <NotificationProvider>

          <Component {...pageProps} />
          {/* <SettingsButton /> */}
                    {/* <PageDrawer /> */}
                    <SettingsDrawer />
                    <ModalsContainer />
                    <DrawersContainer />
          {/* <Partners/> */}
          {/* <Appfooter/> */}
        </NotificationProvider>

          </ThemeProvider>
          </UrlProvider>
        </WalletProvider>
      </MoralisProvider>

        {/* </WagmiConfig> */}
     </>
)
}


