import { atom, useAtom } from 'jotai';
const drawerAtom = atom({ isOpen: false, view: 'DASHBOARD_SIDEBAR' });
export function useDrawer() {
    const [state, setState] = useAtom(drawerAtom);
    const openDrawer = (view) => setState({ ...state, isOpen: true, view });
    const closeDrawer = () => setState({ ...state, isOpen: false });
    return {
        ...state,
        openDrawer,
        closeDrawer,
    };
}
