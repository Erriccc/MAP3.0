import { atom, useAtom } from 'jotai';
const modalAtom = atom({ isOpen: false, view: 'SEARCH_VIEW' });
export function useModal() {
    const [state, setState] = useAtom(modalAtom);
    const openModal = (view) => setState({ ...state, isOpen: true, view });
    const closeModal = () => setState({ ...state, isOpen: false });
    return {
        ...state,
        openModal,
        closeModal,
    };
}
