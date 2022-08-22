import React from "react";
import {
  GlobeAltIcon,
  MenuIcon,
  UserCircleIcon,
  SearchIcon,
  UsersIcon,
} from "@heroicons/react/solid";
import { useState } from "react";
import UV3 from '/images/UV3.svg';
import { useRouter } from "next/dist/client/router";
import { ConnectButton, Icon, Select, DatePicker, Input, Button } from "web3uikit";

const d = new Date();
let time = d.getTime();
console.log(time)
function getRandomNonce (_time){
  let randomString1 = randomString(10);
  let randomString2 = randomString(20);
  let randomString13 = randomString(3);
  let finalRandomString = Math.random()*10**3
let stringifiedTime = _time.toString()
  let salt = randomString1 + randomString2 + randomString13 +finalRandomString +stringifiedTime
  return salt

}

// randomString(Math.random(time)*10**3)
const randomString = function(length) {

  var text = "fghjkl;po8765rfvbnmlp0987632qwsdfghu76tghjui876tgbnkjbvfrtyhjkl;';/'.,mjhgfvbnjhtred";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789?><:}{|=-)(*#@!$%";
  for(var i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

export default function Appnav() { // Note we are imporing a prop from wherever this componnent is called
  const [searchInput, setSearchInput] = useState("");
  const router = useRouter()
  function resetInput() {
    setSearchInput("");
  }

  // This is the search function which just pushes the search filters to the app vendors page where we can querry 
  // and display responce of our database.
      function search() {
        if (!searchInput) return;

        // add more search filters here. rember to declare them as usestate first
        router.push({
          pathname: "/appvendors",
          query: {
            // location: searchInput, // Note location was changed to map3Querry
            map3Querry: searchInput // SET as Many filters as you want from here

          },
        });

    setSearchInput("");
  }


  return (

    <header className="sticky shadow-sm md:relative bg-sky-300/30 top-0 z-30 grid grid-cols-1 md:bg-transparent py-4 px-5 md:px-10 md:grid-cols-3">
      <div
        onClick={() => router.push("/")}
        className="relative flex items-center justify-center py-1 cursor-pointer"
      >
        <h3 className="text-blue-500 font-medium">map<span className="text-gray-600 font-bold">3.0</span></h3>
      </div>

      {/* Search */}
      <div className="
      flex max-w-md border-2 rounded-2xl md:shadow-sm py-4
      border-gray-300
      hover:border-transparent
      transition duration-200 ease-out
      ">
        <input
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && search()}
          placeholder={"Find Crypto friendly vendors"}
          className="
          flex-grow font-bold text-gray-600 pl-5 placeholder-gray-400 outline-none bg-transparent
          "
        />
        <div
        className="sticky h-7 my-auto cursor-pointer"
      >
         <SearchIcon className="
        h-8 md:inline-flex p-2 mx-auto bg-transparent cursor-pointer md:mx-2 rounded-2xl text-gray-600
        hover:bg-white
      transition duration-200 ease-in
        " onClick={search}  />
      </div>
       
      </div>

      {/* Right */}
      <div className="flex py-4 items-center text-gray-500 justify-center space-x-4">

        {/* MAKE ABSOLUBTE SURE TO GENERATE DYNAMIC MESSAGE.  */}
        {/* SECURITY THREAT!!!!!!!!!!!!! */}
        <ConnectButton signingMessage={getRandomNonce(time)} /> 
      </div>
    </header> 
     
  );
}
