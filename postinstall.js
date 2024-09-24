// Script to copy TinyMCE to the public directory.
// https://www.tiny.cloud/docs/tinymce/latest/react-pm-host/
import fse from "fs-extra";
import path from "path";

const devMode = import.meta.VITE_DEV_MODE;

const topDir = devMode
  ? import.meta.dirname
  : path.dirname(new URL(import.meta.url).pathname);

// const topDir = import.meta.dirname;

// const topDir = path.dirname(new URL(import.meta.url).pathname);

console.log(topDir);

fse.emptyDirSync(path.join(topDir, "public", "tinymce"));
fse.copySync(
  path.join(topDir, "node_modules", "tinymce"),
  path.join(topDir, "public", "tinymce"),
  { overwrite: true }
);
