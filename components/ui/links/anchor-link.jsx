import NextLink from 'next/link';
const AnchorLink = ({ href, ...props }) => {
    return (<NextLink href={href}>
      <a {...props}/>
    </NextLink>);
};
export default AnchorLink;
