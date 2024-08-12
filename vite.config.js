import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import dotenv from "dotenv";

dotenv.config();

// https://vitejs.dev/config/
export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd(), "") };

  return defineConfig({
    plugins: [react()],
    server: {
      proxy: {
        "/api": {
          target: process.env.VITE_DEV_BACKEND_URL,
          changeOrigin: true,
          secure: false,
          ws: true,
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
      },
    },
  });
};
