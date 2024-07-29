import logoSvg from "../../../icons/logo.svg";
import headerStyles from "./header.module.scss";
export default function Header() {
  return (
    <div className={headerStyles.header}>
      <div className={headerStyles.logo}>
        <img alt="logo" src={logoSvg} />
        <span>React Playground</span>
      </div>
    </div>
  );
}
