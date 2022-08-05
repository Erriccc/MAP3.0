import React from "react";
import Image from "next/image";
import bankingImg from '/images/banking.svg';
import hero from '/images/hero.svg';
import Appnav from 'components/Appnav'
import Partners from 'components/Partners';

export default function Apphero() {

  return (
    <>
    <Appnav/>
      <div className="bg-gray-50">
      <Image
        src={hero}
        layout="fill"
        objectFit="cover"
        alt="Hero svg "
      />
      <section className='hero'>
<div className='hero-center'>
  <article className='hero-info'>
    <h1 className=" hidden md:inline-flex">
      Welcome To MAp3.0 
    </h1>
    <h3>
      The Web3.0 way of spending crypto
    </h3>
    <p className="">
      Pay Vendors that acccept and promote your crypto Payments.
    </p>
  </article>
  <article className='hero-images'>
    <Image
    src={bankingImg} className='sm:w-20 md:w-28 l:w-32' alt='bankimg'
    />
  </article>
</div>
</section>

    </div>
    <Partners/>

    </>
  );
}