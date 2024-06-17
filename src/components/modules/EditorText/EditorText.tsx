import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import Editor from "ckeditor5-custom-build";
import styles from "./EditorText.module.css";

type EditorTextProps = {
  onChange: (newValue: string) => void;
  value: string;
};

function EditorText({ onChange, value }: EditorTextProps) {
  type EditorConfig = {
    toolbar: string[];
    language: string;
  };

  const editorConfig: EditorConfig = {
    toolbar: [
      "bold",
      "codeBlock",
      "blockquote",
      "italic",
      "link",
      "|",
      "undo",
      "redo",
    ],
    language: "fa",
  };

  return (
    <div className={styles.editor}>
      <CKEditor
        editor={Editor}
        data={value}
        onChange={(e, editor): void => {
          onChange(editor.getData());
        }}
        config={editorConfig}
      />
    </div>
  );
}

export default EditorText;
