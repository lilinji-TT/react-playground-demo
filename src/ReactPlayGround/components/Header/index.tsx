import { useContext } from "react";
import logoSvg from "../../../icons/logo.svg";
import { PlaygroundContext } from "../../PlaygroundContext";
import headerStyles from "./header.module.scss";
import { MoonOutlined, SunOutlined } from '@ant-design/icons';
export default function Header() {

    const { theme, setTheme} = useContext(PlaygroundContext)
  return  (
    <div className={headerStyles.header}>
      <div className={headerStyles.logo}>
        <img alt='logo' src={logoSvg}/>
        <span>React Playground</span>
      </div>
      <div className={headerStyles.links}>
        {theme === 'light' && (
          <MoonOutlined
            title='切换暗色主题'
            className={headerStyles.theme}
            onClick={() => setTheme('dark')}
          />
        )}
        {theme === 'dark' && (
          <SunOutlined
            title='切换亮色主题'
            className={headerStyles.theme}
            onClick={() => setTheme('light')}
          />
        )}
      </div>
    </div>
  );
}
