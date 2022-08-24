import { atom, useAtom } from 'jotai';
const settingsDrawerAtom = atom(false);
export function useSettingsDrawer() {
    const [isSettingsOpen, setSettingOpen] = useAtom(settingsDrawerAtom);
    const opeSettings = () => setSettingOpen(true);
    const closeSettings = () => setSettingOpen(false);
    return {
        isSettingsOpen,
        opeSettings,
        closeSettings,
    };
}
const pageDrawerAtom = atom(false);
export function usePageDrawer() {
    const [isPageDrawerOpen, setPageDrawer] = useAtom(pageDrawerAtom);
    const openPageDrawer = () => setPageDrawer(true);
    const closePageDrawer = () => setPageDrawer(false);
    return {
        isPageDrawerOpen,
        openPageDrawer,
        closePageDrawer,
    };
}
