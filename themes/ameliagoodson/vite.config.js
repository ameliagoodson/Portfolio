export default {
  build: {
    rollupOptions: {
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
