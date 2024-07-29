import { useContext, useEffect, useRef, useState } from "react";
import { IMPORT_MAP_FILE_NAME } from "../../files";
import { PlaygroundContext } from "../../PlaygroundContext";
import { compile } from "./compiler";
import iframeRaw from "./iframe.html?raw";

export default function Preview() {
  const { files } = useContext(PlaygroundContext);
  const [compiledCode, setCompiledCode] = useState("");
 const latestComplieCode =  useRef("");

  useEffect(() => {
    const res = compile(files);
    latestComplieCode.current = res;
    setCompiledCode(res);
    setIframeUrl(() => getIframeUrl());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [files]);

  const getIframeUrl = () => {
    const res = iframeRaw
      .replace(
        '<script type="importmap"></script>',
        `<script type="importmap">${files[IMPORT_MAP_FILE_NAME].value}</script>`
      )
      .replace(
        '<script type="module" id="appSrc"></script>',
        `<script type="module" id="appSrc">${latestComplieCode.current}</script>`
      );
      console.log(compiledCode)
    return URL.createObjectURL(new Blob([res], { type: "text/html" }));
  };


  const [iframeUrl, setIframeUrl] = useState(() => getIframeUrl());

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <iframe
        src={iframeUrl}
        style={{
          width: "100%",
          height: "100%",
          padding: 0,
          border: "none",
        }}
      />
      {/* <Editor
        file={{
          name: "dist.js",
          value: compiledCode,
          language: "javascript",
        }}
      /> */}
    </div>
  );
}
