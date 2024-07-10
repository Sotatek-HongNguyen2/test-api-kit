import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import * as path from "path";

export default ({ mode }: { mode: string }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return defineConfig({
    server: {
      port: Number(process.env.VITE_PORT),
    },
    preview: {
      host: "0.0.0.0",
      port: Number(process.env.VITE_PORT),
    },
    plugins: [react()],
    resolve: {
      alias: [{ find: "@", replacement: path.resolve(__dirname, "src") }],
    },
    define: {
      global: "window",
      "process.env": {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      },
    },
  });
};
