import LZString from "lz-string";
import parse from "html-react-parser";
import { Stack, Box } from "@mui/material";

const PreviewTextEditorContent = ({ content }) => {
  const decompressContent = LZString.decompressFromBase64(content);
  const finalContent = decompressContent?.replace(/\\n/g, "<br>");
  return (
    <Box sx={{ fontSize: "14px", marginBottom: 2, marginTop: 2 }}>
      {finalContent && parse(finalContent)}
    </Box>
  );
};

export default PreviewTextEditorContent;
