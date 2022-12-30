import { useTheme, InputLabel, Box } from "@mui/material";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "../../styles/text-editor.css";

const TextEditor = ({ value, setValue, label, readyOnly }) => {
  const module = {
    syntax: true,
    toolbar: [
      ["bold", "italic"],
      [
        { list: "bullet" },
        { list: "ordered" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image", "code-block"],
    ],
  };

  if (useTheme().palette.mode === "dark") {
    document.documentElement.style.setProperty(
      "--text-editor-border-focus-color",
      "#90D1F9"
    );
    document.documentElement.style.setProperty(
      "--text-editor-border-hover-color",
      "white"
    );

    document.documentElement.style.setProperty(
      "--text-editor-border-color",
      "#404040"
    );
  } else {
    document.documentElement.style.setProperty(
      "--text-editor-border-focus-color",
      "#1976d2"
    );
    document.documentElement.style.setProperty(
      "--text-editor-border-hover-color",
      "black"
    );
    document.documentElement.style.setProperty(
      "--text-editor-border-color",
      "#ccc"
    );
  }

  return (
    <Box>
      <InputLabel htmlFor="editor" sx={{ marginBottom: "3px" }}>
        {label}
      </InputLabel>
      <ReactQuill
        id="editor"
        theme="snow"
        value={value}
        onChange={setValue}
        modules={module}
        readOnly={readyOnly}
      />
    </Box>
  );
};

export default TextEditor;
