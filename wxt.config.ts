import { defineConfig } from "wxt";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  modules: ["@wxt-dev/module-react"],
  manifest: {
    action: {},
    permissions: ["tabs", "scripting", "sidePanel", "storage"],
    host_permissions: ["http://*/", "https://*/"],
  },
  vite: () => ({
    plugins: [tailwindcss()],
  }),
});
