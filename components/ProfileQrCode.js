// import { CryptoLogos } from 'web3uikit';
import QRCode from 'qrcode'
import React, { useState, useEffect } from 'react';
import Image from "next/image";
import { motion } from 'framer-motion';


export default function ProfileQrCode(link) {
	const url = link.url
	const [qr, setQr] = useState('')

    useEffect(()=>{
	const GenerateQRCode = () => {
		QRCode.toDataURL(url, {
			width: 1000,
			margin: 4,
            errorCorrectionLevel: 'H',
			color: {
				dark: '#335383FF',
				light: '#EEEEEEFF'
			}
		}, (err, url) => {
			if (err) return console.error(err)
			setQr(url)
		})
	}
    GenerateQRCode()
      }, []);







	return (
		<div className=''>

<motion.div whileTap={{ scale: 0.98 }} whileHover={{ scale: 1.015 }} className="flex cursor-pointer flex-col items-center justify-center rounded-lg bg-white p-6 text-center shadow-card transition-shadow duration-200 hover:shadow-large dark:bg-light-dark ">
				{qr && 
				<a href={qr} download="qrcode.png" className='ounded-lg'>
                <Image
                    src={qr}
                    width={100}
                    height={100}
                    objectFit="cover"
                    alt="Vendors Qr Code "
                    className=''
                />
				<p
                className="">
                    Download Qr
                    </p>
			</a>}
            </motion.div>
			
		</div>
	)
}

