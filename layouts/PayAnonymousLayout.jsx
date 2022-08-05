import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';
import cn from 'classnames';
import routes from 'config/routes';
import DashboardLayout from 'layouts/_dashboard';
import Button from '/components/ui/button';
import ActiveLink from '/components/ui/links/active-link';
import AnchorLink from '/components/ui/links/anchor-link';
import { RangeIcon } from '/components/icons/range-icon';
import { ExportIcon } from '/components/icons/export-icon';
import { useBreakpoint } from 'lib/hooks/use-breakpoint';
import { useIsMounted } from 'lib/hooks/use-is-mounted';
import { fadeInBottom } from 'lib/framer-motion/fade-in-bottom';
import Collapse from '../components/ui/collapse';
import ProfileSearchSelect from '../components/ui/ProfileSearchSelect';
// dynamic import
const Listbox = dynamic(() => import('/components/ui/list-box'));

export default function PayAnonymousLayout({ children }) {
    const router = useRouter();
    const isMounted = useIsMounted();
    const breakpoint = useBreakpoint();
   
    function handleRouteOnSelect(path) {
        router.push(path);
    }
    
    return (<DashboardLayout>
      <div className="pt-8  text-sm xl:pt-10">
        <div className="mx-auto w-full max-w-lg rounded-lg bg-white p-5 pt-4 shadow-card dark:bg-light-dark xs:p-6 xs:pt-5">
          <nav className="mb-5 min-h-[40px] border-b border-dashed border-gray-200 pb-4 uppercase tracking-wider dark:border-gray-700 xs:mb-6 xs:pb-5 xs:tracking-wide">
            <div className=" items-center justify-between text-gray-600 dark:text-gray-400 flex ">
              {/* <Collapse label="Recivers Wallet Address" > 
                <ProfileSearchSelect onSelect={(value) => console.log(value)}/>
                </Collapse>
               */}
              {/* <Button variant="transparent" shape="circle" size="small" className="dark:text-white">
                <RangeIcon />
              </Button> */}
              MAP3 PAY
            </div>
          </nav>
          <AnimatePresence exitBeforeEnter>
            <motion.div initial="exit" animate="enter" exit="exit" variants={fadeInBottom('easeIn', 0.25)}>
              {children}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </DashboardLayout>);
}
