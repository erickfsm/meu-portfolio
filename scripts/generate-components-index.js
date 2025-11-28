import { writeFileSync } from "fs";
import { globSync } from "glob";
import path from "path";

const componentsDir = "./src/components";
const files = globSync(`${componentsDir}/*.jsx`);

const exports = files
  .map((file) => {
    const name = path.basename(file, ".jsx");
    return `export { default as ${name} } from "./${name}";`;
  })
  .join("\n");

writeFileSync(`${componentsDir}/index.js`, `${exports}\n`);
console.log("✅ Arquivo index.js atualizado automaticamente!");
