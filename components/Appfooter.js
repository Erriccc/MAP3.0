import React from "react";
import Link from 'next/link'


export default function Appfooter() {

  return (
    <>
      <div className=''>
            </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-y-10 bg-gray-100 px-32 py-14 border-t text-gray-600">
              <Link href="/profile">
               User Profile
              </Link>
              <Link href="/appvendors?map3Querry=*">
                All vendors
               </Link>
               <Link href="/registerVendor">
                Register Vendors
               </Link>
               
          {/* <div className="space-y-4 text-xs text-gray-800">
            <h5 className="font-bold">ABOUT</h5>
            <p>How Airbnb works</p>
            <p>Newsroom</p>
            <p>Investors</p>
            <p>Airbnb Plus</p>
            <p>Airbnb Luxe</p>
          </div> */}
              <Link href="/pay">
               Pay
              </Link>

          {/* <div className="space-y-4 text-xs text-gray-800">
            <h5 className="font-bold">HOST</h5>
            <p>Papa React</p>
            <p>Presents</p>
            <p>Zero to Full Stack Hero</p>
            <p>Hundreds of Students</p>
            <p>Join Now</p>
          </div> */}

      </div>
    </>
  );
}

