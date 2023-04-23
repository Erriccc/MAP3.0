// import { CryptoLogos } from 'web3uikit';
import QRCode from 'qrcode'
import React, { useState, useEffect } from 'react';
import Image from "next/image";
import { motion } from 'framer-motion';
import Button from '/components/ui/button';
import { useModal } from '/components/modal-views/context';


export default function VendorQrCode(link) {
	const url = link.url
	const [qr, setQr] = useState('')
	const { openModal } = useModal();

    useEffect(()=>{
	const GenerateQRCode = () => {
		QRCode.toDataURL(url, {
			width: 900,
			margin: 5,
            errorCorrectionLevel: 'H',
			color: {
				dark: '#335383FF',
				light: '#EEEEEEFF'
			}
		}, (err, url) => {
			if (err) return console.error(err)
			// console.log(url)
			setQr(url)
		})
	}
    GenerateQRCode()
      }, []);







	return (
		

<div className="flex cursor-pointer flex-col items-center justify-center rounded-lg bg-white p-6 text-center shadow-card transition-shadow duration-200 hover:shadow-large dark:bg-light-dark ">
				{qr && 
				<a href={qr} download="qrcode.png" className='rounded-lg'>
                <Image
                    src={qr}
                    width={250}
                    height={250}
                    objectFit="cover"
                    alt="Vendors Qr Code "
                    className=''
                />
			{/*  */}
			</a>
			
			}
			{/* <div className=" flex mt-10  flex-wrap items-center justify-center gap-6 border-y border-dashed border-gray-200 py-5 text-center dark:border-gray-700 ">
                  <Button color="white" className="shadow-card dark:bg-light-dark md:h-10 md:px-5 xl:h-12 xl:px-7" 
                   onClick={() => openModal('SHARE_VIEW')}
                   >
                    Share
                  </Button>
                </div> */}



			
            </div>
	)
}

