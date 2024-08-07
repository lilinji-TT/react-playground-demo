import { useContext, useEffect, useRef, useState } from "react";
import { IMPORT_MAP_FILE_NAME } from "../../files";
import { PlaygroundContext } from "../../PlaygroundContext";
import { ERROR, Message } from "../Message";
import { compile } from "./compiler.worker";
import CompilerWorker from "./compiler.worker?worker";
import iframeRaw from "./iframe.html?raw";
import debounce from "lodash-es/debounce";

interface MessageData {
  data: {
    type: string;
    message: string;
  };
}

export default function Preview() {
  const { files } = useContext(PlaygroundContext);
  const [compiledCode, setCompiledCode] = useState("");

  useEffect(() => {
    const res = compile(files);
    setCompiledCode(res);
  }, [files]);

  const compilerWorkerRef = useRef<Worker>();

  useEffect(() => {
    if (!compilerWorkerRef.current) {
      compilerWorkerRef.current = new CompilerWorker();
      compilerWorkerRef.current.addEventListener("message", (data) => {
        if (data.type === "COMPILED_CODE") {
          setCompiledCode(data.data);
        }
      });
    }
  }, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(
    debounce(() => {
      compilerWorkerRef.current?.postMessage(files);
    }, 500),
    [files]
  );

  const getIframeUrl = () => {
    const res = iframeRaw
      .replace(
        '<script type="importmap"></script>',
        `<script type="importmap">${files[IMPORT_MAP_FILE_NAME].value}</script>`
      )
      .replace(
        '<script type="module" id="appSrc"></script>',
        `<script type="module" id="appSrc">${compiledCode}</script>`
      );
    return URL.createObjectURL(new Blob([res], { type: "text/html" }));
  };

  const [iframeUrl, setIframeUrl] = useState(getIframeUrl());

  useEffect(() => {
    setIframeUrl(getIframeUrl());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [files[IMPORT_MAP_FILE_NAME].value, compiledCode]);

  const [error, setError] = useState("");
  const handleMessage = (messageObj: MessageData) => {
    const { type, message } = messageObj.data;
    if (type === ERROR) {
      setError(message);
    }
  };

  useEffect(() => {
    window.addEventListener("message", handleMessage);
    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);
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
      <Message type="error" content={error} />

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
