// import { CryptoLogos } from 'web3uikit';
import QRCode from 'qrcode'
import React, { useState, useEffect } from 'react';
import Image from "next/image";
import { motion } from 'framer-motion';
import InputLabel from '/components/ui/input-label';
import Input from '/components/ui/forms/input';

export default function ProfileQrCode(link) {
	const [qr, setQr] = useState('')
	const [url, setUrl] = useState(link.url)
	// const [ammount, setAmmount] = useState(1)



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
      }, [url]);




	return (
		<div className='flex flex-col'>
         <div className="mb-8">
            <InputLabel title="Generate Payment"/>
            <Input  placeholder="amount" inputClassName=""
             onChange={(e)=>{
				 setUrl(`${link.url}/${e.target.value}`)
             }}
             name="vendorsName"
            />
          </div>


        {/* <input 
		// value={ammount}
		type="number" 
		onChange={(e) => setUrl(`${link.url}/${e.target.value}`)}
		// onChange={setUrl} 
		/> */}

<motion.div whileTap={{ scale: 0.98 }} whileHover={{ scale: 1.015 }} className="flex cursor-pointer flex-col items-center justify-center rounded-lg bg-white p-6 text-center shadow-card transition-shadow duration-200 hover:shadow-large dark:bg-light-dark ">
				{qr && 
				<a href={qr} download="qrcode.png" className='rounded-lg'>
                <Image
                    src={qr}
                    width={100}
                    height={100}
                    objectFit="cover"
                    alt="Vendors Qr Code "
                    className=''
                />
			{/*  */}
			</a>
			
			}
            </motion.div>
			
		</div>
	)
}

