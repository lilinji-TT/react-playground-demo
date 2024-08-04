import { Allotment } from "allotment";
import "allotment/dist/style.css";
import { useContext } from "react";
import CodeEditor from "./components/CodeEditor";
import Header from "./components/Header";
import Preview from "./components/Preview";
import "./index.scss";
import { PlaygroundContext } from "./PlaygroundContext";
export default function ReactPlayGround() {
  const { theme, setTheme } = useContext(PlaygroundContext);

  return (
    <div className={theme} style={{ height: "100vh" }}>
      <Header></Header>
      {/* 使用该组件库实现两部分的布局分割 */}
      <Allotment defaultSizes={[100, 100]}>
        <Allotment.Pane minSize={500}>
          <div>
            <CodeEditor></CodeEditor>
          </div>
        </Allotment.Pane>
        <Allotment.Pane minSize={0}>
          <div>
            <Preview></Preview>
          </div>
        </Allotment.Pane>
      </Allotment>
    </div>
  );
}
