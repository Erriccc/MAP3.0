import { useEffect } from 'react';
export function useDirection(layout) {
    useEffect(() => {
        document.documentElement.dir = layout;
    }, [layout]);
}
