// import { CryptoLogos } from 'web3uikit';
import QRCode from 'qrcode'
import React, { useState, useEffect } from 'react';
import Image from "next/image";


export default function VendorQrCode(link) {
	const url = link.url
	const [qr, setQr] = useState('')

    useEffect(()=>{
	const GenerateQRCode = () => {
		QRCode.toDataURL(url, {
			width: 800,
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
		<div className='p-2 m-2'>
			{qr && <div className='flex justify-center '>
				{/* <img src={qr} className=" h-40 w-40" /> */}

                <Image
                    src={qr}
                    // layout="responsive"
                    width={100}
                    height={100}
                    objectFit="cover"
                    alt="Vendors Qr Code "
                    className=''
                />

				<a href={qr} download="qrcode.png"  
                className=" bg-blue-500 hover:bg-blue-700 text-white font-bold px-1 py-1 my-auto mx-6 rounded focus:outline-none focus:shadow-outline h-auto">
                    Download Qr
                    </a>
			</div>}
		</div>
	)
}

