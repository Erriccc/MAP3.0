import cn from 'classnames';
import { OverlayScrollbarsComponent, } from 'overlayscrollbars-react';
import 'overlayscrollbars/css/OverlayScrollbars.css';
export default function Scrollbar({ options, style, className, ...props }) {
    return (<OverlayScrollbarsComponent options={{
            className: cn('os-theme-thin', className),
            scrollbars: {
                autoHide: 'scroll',
            },
            ...options,
        }} style={style} {...props}/>);
}
