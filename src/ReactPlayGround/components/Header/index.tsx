import {
  DownloadOutlined,
  MoonOutlined,
  ShareAltOutlined,
  SunOutlined,
} from "@ant-design/icons";
import { message } from "antd";
import copy from "copy-to-clipboard";
import { useContext } from "react";
import logoSvg from "../../../icons/logo.svg";
import { PlaygroundContext } from "../../PlaygroundContext";
import { downloadFiles } from "../../utils";
import headerStyles from "./header.module.scss";
export default function Header() {
  const { theme, files, setTheme } = useContext(PlaygroundContext);
  return (
    <div className={headerStyles.header}>
      <div className={headerStyles.logo}>
        <img alt="logo" src={logoSvg} />
        <span>React Playground</span>
      </div>
      <div className={headerStyles.links}>
        {theme === "light" && (
          <MoonOutlined
            title="切换暗色主题"
            className={headerStyles.theme}
            onClick={() => setTheme("dark")}
          />
        )}
        {theme === "dark" && (
          <SunOutlined
            title="切换亮色主题"
            className={headerStyles.theme}
            onClick={() => setTheme("light")}
          />
        )}
        <ShareAltOutlined
          style={{ marginLeft: "10px" }}
          onClick={() => {
            copy(window.location.href);
            message.success("分享链接已复制。");
          }}
        />

        <DownloadOutlined
          style={{ marginLeft: "10px" }}
          onClick={async () => {
            await downloadFiles(files);
            message.success("下载完成");
          }}
        />
      </div>
    </div>
  );
}
