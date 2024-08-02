import { useContext, useEffect, useState } from "react";
import { PlaygroundContext } from "../../../PlaygroundContext";

import {
  APP_COMPONENT_FILE_NAME,
  ENTRY_FILE_NAME,
  IMPORT_MAP_FILE_NAME,
} from "../../../files";
import { FileNameItem } from "./FileNameItem";
import styles from "./index.module.scss";

export default function FileNameList() {
  const {
    files,
    removeFile,
    addFile,
    updateFileName,
    selectedFileName,
    setSelectedFileName,
  } = useContext(PlaygroundContext);

  const [tabs, setTabs] = useState([""]);
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    setTabs(Object.keys(files));
  }, [files]);

  const handleEditComplete = (name: string, prevName: string) => {
    updateFileName(prevName, name);
    setSelectedFileName(name);
    setCreating(true);
  };

  const addTab = () => {
    addFile("Comp" + Math.random().toString().slice(2, 8) + ".tsx");
    setCreating(true);
  };

  const handleRemove = (name: string) => {
    removeFile(name);
    setSelectedFileName(ENTRY_FILE_NAME);
  };

  const readonlyFileNames = [
    ENTRY_FILE_NAME,
    IMPORT_MAP_FILE_NAME,
    APP_COMPONENT_FILE_NAME,
  ];

  return (
    <div className={styles.tabs}>
      {tabs.map((item, index, arr) => (
        <FileNameItem
          key={item + index}
          value={item}
          readonly={readonlyFileNames.includes(item)}
          actived={selectedFileName === item}
          creating={creating && index === arr.length - 1}
          onClick={() => setSelectedFileName(item)}
          onRemove={(e) => {
            e.stopPropagation(); // prevent
            handleRemove(item);
          }}
          onEditComplete={(name: string) => handleEditComplete(name, item)}
        ></FileNameItem>
      ))}

      <div
        className={styles.add}
        style={{ cursor: "pointer" }}
        onClick={addTab}
      >
        +
      </div>
    </div>
  );
}
