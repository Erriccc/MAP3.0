import { useRouter } from 'next/router';
import cn from 'classnames';
import AnchorLink from '/components/ui/links/anchor-link';
const ActiveLink = ({ href, className, activeClassName = 'active', ...props }) => {
    const { pathname } = useRouter();
    return (<AnchorLink href={href} className={cn(className, {
            [activeClassName]: pathname === href,
        })} {...props}/>);
};
export default ActiveLink;
