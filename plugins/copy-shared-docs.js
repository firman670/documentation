const fs = require("fs");
const path = require("path");

module.exports = function () {
  return {
    name: "copy-shared-docs",
    async loadContent() {
      const sourceDir = path.resolve(__dirname, "../shared-docs");
      const destDir = path.resolve(__dirname, "../docs/shared");

      if (!fs.existsSync(sourceDir)) return;

      fs.mkdirSync(destDir, { recursive: true });
      const files = fs.readdirSync(sourceDir);

      files.forEach((file) => {
        if (file.endsWith(".md") || file.endsWith(".mdx")) {
          fs.copyFileSync(path.join(sourceDir, file), path.join(destDir, file));
          console.log(`📥 Copied ${file} to /docs/shared/`);
        }
      });
    },
  };
};
