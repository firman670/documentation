import fs from "fs";
import path from "path";

const sidebarPath = path.join(__dirname, "../sidebars.ts");
const docsDir = path.join(__dirname, "../docs/shared");

const files = fs
  .readdirSync(docsDir)
  .filter((f) => f.endsWith(".md"))
  .map((f) => `'shared/${f.replace(".md", "")}'`);

const sidebarContent = `export default {
  docs: [
    {
      type: 'category',
      label: 'Shared Uploads',
      items: [
        ${files.join(",\n        ")}
      ]
    }
  ]
}`;

fs.writeFileSync(sidebarPath, sidebarContent);
console.log("✅ Sidebar updated with shared uploads.");
