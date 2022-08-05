import Image from '/components/ui/image';
import cn from 'classnames';
import AnchorLink from '/components/ui/links/anchor-link';
export default function CollectionCard({ item, className = '' }) {
    const { name, slug, title, cover_image, image, number_of_artwork, user } = item ?? {};
    return (<div className={cn('group relative overflow-hidden rounded-lg transition-transform hover:-translate-y-1', className)}>
      <div className="relative flex aspect-[8/11] w-full justify-center overflow-hidden rounded-lg">
        <Image src={cover_image} placeholder="blur" layout="fill" quality={100} objectFit="cover" alt={name}/>
      </div>
      <div className="absolute top-0 left-0 z-[5] flex h-full w-full flex-col justify-between bg-gradient-to-t from-black p-5 md:p-6">
        <AnchorLink href={slug} className="absolute top-0 left-0 z-10 h-full w-full"/>
        <div className="flex justify-between gap-3">
          <div className="inline-flex h-8 shrink-0 items-center rounded-2xl bg-white/20 px-4 text-xs font-medium uppercase -tracking-wide text-white
          backdrop-blur-[40px]">
            {name}
          </div>
          {image && (<div className="h-16 w-16 rounded-lg bg-white/20 p-2 backdrop-blur-[40px]">
              <Image src={image} alt={name} width={48} height={48} className="rounded-[6px]"/>
            </div>)}
        </div>
        <div className="block">
          <h2 className="mb-1.5 truncate text-lg font-medium -tracking-wider text-white">
            {title}
          </h2>
          <div className="text-sm font-medium -tracking-wide text-[#B6AAA2]">
            {number_of_artwork} Artworks
          </div>
          <AnchorLink href={user?.slug} className="relative z-10 mt-3.5 inline-flex items-center rounded-3xl bg-white/20 p-2 backdrop-blur-[40px]">
            <div className="flex shrink-0 items-center">
              <Image 
    //@ts-ignore
    src={user?.avatar} alt={user?.name} width={24} height={24} className="rounded-full"/>
            </div>

            <div className="truncate text-sm -tracking-wide text-white ltr:ml-2 ltr:pr-2 rtl:mr-2 rtl:pl-2">
              @{user?.name}
            </div>
          </AnchorLink>
        </div>
      </div>
    </div>);
}
