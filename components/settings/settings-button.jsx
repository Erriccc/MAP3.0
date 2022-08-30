import { useLocalStorage } from 'lib/hooks/use-local-storage';
import { useDirection } from 'lib/hooks/use-direction';
import { useThemeColor } from 'lib/hooks/use-theme-color';
import { useSettingsDrawer, usePageDrawer, } from '/components/settings/settings-context';
import { OptionIcon } from '/components/icons/option';
import { useTheme } from 'next-themes';
import { Sun } from '/components/icons/sun';
import { Moon } from '/components/icons/moon';
export default function SettingsButton() {
    const { theme, setTheme } = useTheme();

    const { openPageDrawer } = usePageDrawer();
    const { opeSettings } = useSettingsDrawer();
    const [layout] = useLocalStorage('map3-layout');
    const [themeColor] = useLocalStorage('map3-color');
    useDirection(layout ? layout : 'ltr');
    useThemeColor(themeColor ? themeColor : '#323743');
    return (<>
      <div className=" mx-auto">
        {/* <div className="text-vertical mb-2 flex w-12 cursor-pointer items-center justify-center bg-white/80 py-3 text-sm font-medium uppercase text-gray-600 shadow-large backdrop-blur ltr:rounded-l-lg rtl:rounded-r-lg dark:bg-brand/80 dark:text-gray-200" onClick={openPageDrawer}>
          Pages 
        </div> */}
        {/* <button className="flex p-3 items-center justify-center  text-gray-300 shadow-large " onClick={opeSettings} title="Settings">
          <OptionIcon />
        </button> */}
        
        <button className="hidden dark:flex p-3 items-center justify-center  text-gray-300 " onClick={opeSettings} title="Settings">
        <Sun />
        </button>
        <button className="flex p-3 items-center justify-center  text-gray-300 dark:hidden" onClick={opeSettings} title="Settings">
        <Moon />
        </button>

      </div>
    </>);
}
