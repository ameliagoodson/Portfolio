import { resolve } from "path";

export default {
  build: {
    rollupOptions: {
      input: resolve(__dirname, "assets/js/scripts-ag.js"),
      external: ["jquery"], // tell Vite to exclude it
      output: {
        globals: {
          jquery: "jQuery", // tell Rollup what the global is called
        },
        entryFileNames: "bundle.js",
      },
    },
    outDir: "dist",
  },
};
