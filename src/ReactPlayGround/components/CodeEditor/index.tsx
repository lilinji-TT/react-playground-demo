import { debounce } from "lodash-es";
import { useContext } from "react";
import { PlaygroundContext } from "../../PlaygroundContext";
import Editor from "./Editor";
import FileNameList from "./FileNameList";

export default function CodeEditor() {
  const { theme, files, setFiles, selectedFileName, setSelectedFileName } =
    useContext(PlaygroundContext);

  const file = files[selectedFileName];

  function onEditorChange(value?: string) {
    files[selectedFileName].value = value!;
    setFiles({ ...files });
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <FileNameList />
      <Editor
        file={file}
        onChange={debounce(onEditorChange, 500)}
        options={{
          theme: `vs-${theme}`,
        }}
      />
    </div>
  );
}
