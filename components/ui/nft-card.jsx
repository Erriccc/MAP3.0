import Image from '/components/ui/image';
import AnchorLink from '/components/ui/links/anchor-link';
import { Verified } from '/components/icons/verified';
export default function NFTGrid({ author, authorImage, image, name, collection, price, }) {
    return (<div className="relative overflow-hidden rounded-lg bg-white shadow-card transition-all duration-200 hover:shadow-large dark:bg-light-dark">
      <div className="p-4">
        <AnchorLink href="/" className="flex items-center text-sm font-medium text-gray-600 transition hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
          <div className="relative h-8 w-8 shrink-0 overflow-hidden text-ellipsis rounded-full border-2 border-white shadow-card ltr:mr-3 rtl:ml-3 dark:border-gray-500">
            <Image src={authorImage} placeholder="blur" layout="fill" objectFit="cover" className="rounded-full" alt={name}/>
          </div>
          <span className="overflow-hidden text-ellipsis">@{author}</span>
        </AnchorLink>
      </div>
      <AnchorLink href="/nft-details" className="relative block w-full pb-full">
        <Image src={image} placeholder="blur" layout="fill" objectFit="cover" alt={name}/>
      </AnchorLink>

      <div className="p-5">
        <AnchorLink href="/nft-details" className="text-sm font-medium text-black dark:text-white">
          {name}
        </AnchorLink>
        <div className="mt-1.5 flex">
          <AnchorLink href="/" className="inline-flex items-center text-xs text-gray-600 dark:text-gray-400">
            {collection}
            <Verified className="ltr:ml-1 rtl:mr-1"/>
          </AnchorLink>
        </div>
        <div className="mt-4 text-lg font-medium text-gray-900 dark:text-white">
          {price}
        </div>
      </div>
    </div>);
}
