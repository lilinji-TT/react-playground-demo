import { Allotment } from "allotment";
import "allotment/dist/style.css";
import CodeEditor from "../components/CodeEditor";
import Header from "../components/Header/index";
import Preview from "../components/Preview";
export default function ReactPlayGround() {
  return (
    <div style={{ height: "100vh" }}>
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
