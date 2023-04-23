import { useTheme, InputLabel, Box } from "@mui/material";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "../../styles/text-editor.css";

const TextEditor = ({ value, setValue, label, readyOnly, placeholder }) => {
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
      ["clean"],
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

    document.documentElement.style.setProperty(
      "--text-editor-btn-color",
      "#C0C0C0"
    );

    document.documentElement.style.setProperty(
      "--text-editor-placeholder-color",
      "rgba(255, 255, 255, 0.7)"
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
    document.documentElement.style.setProperty(
      "--text-editor-btn-color",
      "#444"
    );
    document.documentElement.style.setProperty(
      "--text-editor-placeholder-color",
      "rgba(0, 0, 0, 0.6)"
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
        placeholder={placeholder}
      />
    </Box>
  );
};

export default TextEditor;
