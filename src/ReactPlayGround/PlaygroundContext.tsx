import { createContext, PropsWithChildren, useState } from "react";
import { initFiles } from "./files";
import { fileName2Language } from "./utils";

export interface File {
  name: string;
  value: string;
  language: string;
}

export interface Files {
  [key: string]: File;
}

export interface PlaygroundContext {
  files: Files;
  selectedFileName: File["name"];
  setSelectedFileName: (fileName: File["name"]) => void;
  setFiles: (files: Files) => void;
  addFile: (fileName: File["name"]) => void;
  removeFile: (fileName: File["name"]) => void;
  updateFileName: (
    oldFileName: File["name"],
    newFileName: File["name"]
  ) => void;
}

export const PlaygroundContext = createContext<PlaygroundContext>({
  selectedFileName: "App.tsx",
} as PlaygroundContext);

export const PlaygroundProvider = (props: PropsWithChildren) => {
  const { children } = props;
  const [files, setFiles] = useState<Files>(initFiles);
  const [selectedFileName, setSelectedFileName] = useState("App.tsx");

  const addFile = (name: string) => {
    files[name] = {
      name,
      language: fileName2Language(name),
      value: "",
    };

    setFiles({ ...files });
  };

  const removeFile = (name: string) => {
    delete files[name];
    setFiles({ ...files });
  };

  const updateFileName = (oldFileName: string, newFileName: string) => {
    if (
      !files[oldFileName] ||
      newFileName === undefined ||
      newFileName === null
    )
      return;
    const { [oldFileName]: value, ...rest } = files;
    const newFiles = {
      [newFileName]: {
        ...value,
        language: fileName2Language(newFileName),
        name: newFileName,
      },
    };

    setFiles({ ...rest, ...newFiles });
  };

  return (
    <PlaygroundContext.Provider
      value={{
        files,
        selectedFileName,
        setSelectedFileName,
        setFiles,
        addFile,
        removeFile,
        updateFileName,
      }}
    >
      {children}
    </PlaygroundContext.Provider>
  );
};
