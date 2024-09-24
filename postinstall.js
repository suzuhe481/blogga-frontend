// Script to copy TinyMCE to the public directory.
// https://www.tiny.cloud/docs/tinymce/latest/react-pm-host/
import fse from "fs-extra";
import path from "path";

const devMode = import.meta.VITE_DEV_MODE;

// devMode = true => Uses the local directory
// devMode = false => Gets the directory in a Node.js context
const topDir = devMode
  ? import.meta.dirname
  : path.dirname(new URL(import.meta.url).pathname);

fse.emptyDirSync(path.join(topDir, "public", "tinymce"));
fse.copySync(
  path.join(topDir, "node_modules", "tinymce"),
  path.join(topDir, "public", "tinymce"),
  { overwrite: true }
);
