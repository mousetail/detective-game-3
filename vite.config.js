import {defineConfig} from "vite";
import {yamlPlugin} from "vite-yaml-plugin";

export default defineConfig({
  plugins: [
    yamlPlugin(),
  ],
  base: '',
});