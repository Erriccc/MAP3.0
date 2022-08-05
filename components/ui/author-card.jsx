import Image from '/components/ui/image';
import ActiveLink from '/components/ui/links/active-link';
import { FlashIcon } from '/components/icons/flash';


function NotificationButton() {
  return (<ActiveLink href="/notifications">
    <div className="relative flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full border border-gray-100 bg-white text-brand shadow-main transition-all hover:-translate-y-0.5 hover:shadow-large focus:-translate-y-0.5 focus:shadow-large focus:outline-none dark:border-gray-700 dark:bg-light-dark dark:text-white sm:h-12 sm:w-12">
      <FlashIcon className="h-auto w-3 sm:w-auto"/>
      <span className="absolute top-0 right-0 h-2.5 w-2.5 rounded-full bg-brand shadow-light sm:h-3 sm:w-3"/>
    </div>
  </ActiveLink>);
}


export default function AuthorCard({ image, name, role }) {
    return (<div className="flex items-center rounded-lg bg-gray-100 p-5 dark:bg-light-dark">
      <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full border-3 border-white drop-shadow-main dark:border-gray-400">
        <Image src={image} alt={name} className="rounded-full" placeholder="blur" layout="fill" objectFit="cover"/>
      </div>
      <div className="ltr:pl-3 rtl:pr-3">
        <h3 className="text-sm font-medium uppercase tracking-wide text-gray-900 dark:text-white">
          {name}
        </h3>
        <span className="mt-1 block text-xs text-gray-600 dark:text-gray-400">
          {role}
        </span>

      </div>
      <NotificationButton />

    </div>);
}
