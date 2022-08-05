import { Fragment, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Dialog } from '/components/ui/dialog';
import { Transition } from '/components/ui/transition';
import Button from '/components/ui/button';
import Image from '/components/ui/image';
import AnchorLink from '/components/ui/links/anchor-link';
import { usePageDrawer } from '/components/settings/settings-context';
import routes from 'config/routes';
import { Close } from '/components/icons/close';
//images
import HomeImage from 'assets/images/pages/home.png';
import PortfolioImage from 'assets/images/pages/portfolio.png';
import CollectionImage from 'assets/images/pages/collection.png';
import HistoryImage from 'assets/images/pages/history.png';
import LiquidityImage from 'assets/images/pages/liquidity.png';
import LiquidityPositionImage from 'assets/images/pages/liquidity-position.png';
import NftDetailsImage from 'assets/images/pages/nft-details.png';
import CreateNftImage from 'assets/images/pages/create-nft.png';
import VoteImage from 'assets/images/pages/vote.png';
import ProposalImage from 'assets/images/pages/proposal.png';
import CreateProposal from 'assets/images/pages/create-proposal.png';
import FarmImage from 'assets/images/pages/farm.png';
import SwapImage from 'assets/images/pages/swap.png';
import SearchImage from 'assets/images/pages/search.png';
const PageLinks = [
    { title: 'Home', image: HomeImage, link: routes.home },
    { title: 'Farms', image: FarmImage, link: routes.farms },
    { title: 'Swap', image: SwapImage, link: routes.swap },
    { title: 'Liquidity', image: LiquidityImage, link: routes.liquidity },
    {
        title: 'Liquidity Position',
        image: LiquidityPositionImage,
        link: routes.liquidityPosition,
    },
    { title: 'NFT Search', image: SearchImage, link: routes.search },
    { title: 'NFT Details', image: NftDetailsImage, link: routes.nftDetails },
    { title: 'Create NFT', image: CreateNftImage, link: routes.createNft },
    { title: 'NFT Collection', image: CollectionImage, link: routes.profile },
    { title: 'Portfolio', image: PortfolioImage, link: routes.portfolio },
    { title: 'History', image: HistoryImage, link: routes.history },
    { title: 'Vote', image: VoteImage, link: routes.vote },
    { title: 'Proposal', image: ProposalImage, link: routes.proposals },
    {
        title: 'Create Proposal',
        image: CreateProposal,
        link: routes.createProposal,
    },
];
function PageItems() {
    return (<div className="grid grid-cols-1 gap-8 pb-10 xs:grid-cols-2 lg:grid-cols-3 3xl:grid-cols-4">
      {PageLinks.map((item, index) => (<div className="overflow-hidden rounded-lg bg-white text-gray-900 transition-all hover:-translate-y-1 dark:bg-gray-800 dark:text-white" key={index}>
          <AnchorLink href={item.link} className="block">
            <div className="relative block aspect-square w-full overflow-hidden">
              <Image src={item.image} alt={item.title} placeholder="blur" layout="fill" objectFit="cover"/>
            </div>
            <h3 className="m-0  p-3 text-center">{item.title}</h3>
          </AnchorLink>
        </div>))}
    </div>);
}
export default function ViewPagesModal() {
    const router = useRouter();
    const { isPageDrawerOpen, closePageDrawer } = usePageDrawer();
    useEffect(() => {
        // close drawer when route change
        router.events.on('routeChangeStart', closePageDrawer);
        return () => {
            router.events.off('routeChangeStart', closePageDrawer);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (<Transition appear show={isPageDrawerOpen} as={Fragment}>
      <Dialog as="div" className="fixed inset-0 z-50 h-full w-full overflow-y-auto overflow-x-hidden p-4 text-center sm:p-6 lg:p-8 xl:p-10 3xl:p-12" onClose={closePageDrawer} open={isPageDrawerOpen}>
        <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
          <Dialog.Overlay className="fixed inset-0 z-40 cursor-pointer bg-gray-700 bg-opacity-60 backdrop-blur"/>
        </Transition.Child>

        <div className="sr-only">
          <Button size="small" color="gray" shape="circle" onClick={closePageDrawer} className="opacity-50 hover:opacity-80 ">
            <Close className="h-auto w-[13px]"/>
          </Button>
        </div>

        <Transition.Child as={Fragment} enter="transform transition ease-out duration-300" enterFrom="ltr:translate-x-full rtl:-translate-x-full" enterTo="translate-x-0" leave="transform transition ease-in duration-300" leaveFrom="translate-x-0" leaveTo="ltr:translate-x-full rtl:-translate-x-full">
          <div className="relative z-50 h-full w-full p-5 text-left align-middle xs:w-auto">
            <PageItems />
            <div className="absolute -top-2 -right-2 z-10 2xl:-top-6 2xl:-right-6">
              <Button title="Close" color="white" shape="circle" size="small" className="dark:bg-gray-600" onClick={closePageDrawer}>
                <Close className="h-auto w-2.5"/>
              </Button>
            </div>
          </div>
        </Transition.Child>
      </Dialog>
    </Transition>);
}
