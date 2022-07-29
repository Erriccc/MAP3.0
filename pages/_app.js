import React from 'react';
// import ReactDOM from 'react-dom';
import Head from "next/head";
import "tailwindcss/tailwind.css";
import "pages/profile/profile.css"
import "pages/appvendors/vendors.css"
import "components/hero.css"
import Router from "next/router";
import ProgressBar from "@badrap/bar-of-progress";
import { MoralisProvider } from "react-moralis";
import {NotificationProvider} from "web3uikit";
import Appfooter from 'components/Appfooter'
import Appnav from 'components/Appnav'
import Partners from 'components/Partners';



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
const MoralisAppId = "h8ifmoTkY0X7KYU7AQsyIefDFah4JKqWDxCGEpTZ";
const MoralisAppUrl = "https://8lyygoh4vp0d.usemoralis.com:2053/server";

// const MoralisAppId = process.env.NEXT_PUBLIC_MORALIS_API_ID;
// const MoralisAppUrl = process.env.NEXT_PUBLIC_MORALIS_APP_URL;



export default function MyApp({ Component, pageProps }) {
  return(
    <>
      <Head>
        <title>Map3.0 App</title>
        <meta name="description" content="Map3.o built with next" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

    <MoralisProvider
      // appId= {MoralisAppId}
      // serverUrl={MoralisAppUrl}
      initializeOnMount={false}
    >
        <NotificationProvider>
          <Appnav />
          <Component {...pageProps} />
          <Partners/>
          <Appfooter/>
        </NotificationProvider>
      </MoralisProvider>
     </>
)
}


