import Image from 'next/image'
import Link from 'next/link'
import { useMoralis } from 'react-moralis'
import Apphero from 'components/Apphero'
import { useRouter } from "next/dist/client/router";
import { ConnectButton, Icon, Select, Input, Button } from "web3uikit";


export default function Home() {

  const router = useRouter()

  // UNCOMMENT to AUTHENTICATE!!!!
  const {isAuthenticated} = useMoralis()
  if (!isAuthenticated) {
    return (
      <Apphero/>
    )
  }

  return (
    
    // HOW TTO CONDITIONALY ADD CLASS OR STYLE
    // className={`${active && 'text-blue-100'}`}


    <div className="">
          <main className="">
            <div>
            Display Content about app and more information and instructionfa-spin
            This Page should have its own nav, it is a one page app. 
            <div>
              Mini Navigation 
            </div>
            <div>Pay Anyone componnent</div>
            <div>About Us</div>
            <div>Maybe some blogs to describe app features</div>
            </div>
          </main>
    </div>
    )
}
