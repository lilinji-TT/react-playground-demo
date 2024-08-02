import classnames from "classnames";
import React, { MouseEventHandler, useEffect, useRef, useState } from "react";

import styles from "./index.module.scss";

export interface FileNameItemProps {
  value: string;
  actived: boolean;
  creating: boolean;
  readonly: boolean;
  onEditComplete: (name: string) => void;
  onRemove: MouseEventHandler;
  onClick: () => void;
}

export const FileNameItem: React.FC<FileNameItemProps> = (props) => {
  const {
    value,
    creating,
    actived = false,
    readonly,
    onClick,
    onEditComplete,
    onRemove,
  } = props;

  const [name, setName] = useState(value);
  const [editing, setEditing] = useState(creating);
  const inputRef = useRef<HTMLInputElement>(null);
  const timer = useRef<number>(0);

  const handleDoubleClick = () => {
    setEditing(true);
    timer.current = setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  const handleInputBlur = () => {
    setEditing(false);
    onEditComplete(name);
  };

  useEffect(() => {
    if (creating) {
      inputRef?.current?.focus();
    }

    // clear timer effect
    return () => {
      clearTimeout(timer.current);
    };
  }, [creating]);

  return (
    <div
      className={classnames(
        styles["tab-item"],
        actived ? styles.actived : null
      )}
      onClick={onClick}
    >
      {editing ? (
        <input
          ref={inputRef}
          className={styles["tabs-item-input"]}
          value={name}
          onChange={(e) => setName(e.target.value)}
          onBlur={handleInputBlur}
        />
      ) : (
        <>
          <span onDoubleClick={!readonly ? handleDoubleClick : () => {}}>
            {name}
          </span>
          {!readonly ? (
            <span style={{ marginLeft: 5, display: "flex" }} onClick={onRemove}>
              <svg width="12" height="12" viewBox="0 0 24 24">
                <line stroke="#999" x1="18" y1="6" x2="6" y2="18"></line>
                <line stroke="#999" x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </span>
          ) : null}
        </>
      )}
    </div>
  );
};
