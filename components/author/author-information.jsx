import Button from '/components/ui/button';
import AnchorLink from '/components/ui/links/anchor-link';
import { InfoIcon } from '/components/icons/info-icon';
import ProfileQrCode from 'components/ProfileQrCode';
import { useModal } from '/components/modal-views/context';
 
export default function AuthorInformation({ className = 'md:hidden', data, map3Url, userPath }) {
  const { openModal } = useModal(); 

    return (
    
    <div className={`${className}`}>
      {/* Bio */}
      <div className="border-y border-dashed border-gray-200 py-5 dark:border-gray-700 xl:py-6">
        <div className="mb-2 text-sm font-medium uppercase tracking-wider text-gray-900 dark:text-white">
          Bio
        </div>
        <div className="text-sm leading-6 tracking-tighter text-gray-600 dark:text-gray-400">
          {data?.vendorsBio}
        </div>
      </div>

      {/* Social */}
      <div className="border-y border-dashed border-gray-200 py-5 dark:border-gray-700 xl:py-6">
        <div className="mb-2 text-sm font-medium uppercase tracking-wider text-gray-900 dark:text-white">
          Website
        </div>
        {data?.vendorsWebsiteUrl && (
          <div>{data?.vendorsWebsiteUrl}</div>
          
          )}
          {/* {data.websiteUrl && data.websiteUrl} */}
      </div>

      {/* Links */}
      {/* <div className="border-y border-dashed border-gray-200 py-5 dark:border-gray-700 xl:py-6">
         <Button shape="rounded" variant="solid" color="gray" className="dark:bg-gray-800" onClick={() => openModal('SHARE_VIEW')}>
            SHARE
          </Button> 
      </div> */}
      {/* Join date */}
      {map3Url && <div className="border-y border-dashed border-gray-200 py-5 dark:border-gray-700 xl:py-6">
        <div className="text-sm font-medium uppercase tracking-wider text-gray-900 dark:text-white">
        <ProfileQrCode url={`${map3Url}${userPath}`} />
        </div>
      </div>} 

    </div>
    
    );
}
