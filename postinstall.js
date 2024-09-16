// Script to copy TinyMCE to the public directory.
// https://www.tiny.cloud/docs/tinymce/latest/react-pm-host/
import fse from "fs-extra";
import path from "path";
const topDir = import.meta.dirname;
fse.emptyDirSync(path.join(topDir, "public", "tinymce"));
fse.copySync(
  path.join(topDir, "node_modules", "tinymce"),
  path.join(topDir, "public", "tinymce"),
  { overwrite: true }
);
