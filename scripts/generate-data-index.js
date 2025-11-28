import { writeFileSync } from "fs";
import { globSync } from "glob";
import path from "path";

const dataDir = "./src/data";
const files = globSync(`${dataDir}/*.js`);

let exports = `// ⚙️ Arquivo gerado automaticamente — NÃO editar manualmente\n`;

for (const file of files) {
  const name = path.basename(file, ".js");
  exports += `export { default as ${name} } from "./${name}.js";\n`;
}

writeFileSync(`${dataDir}/index.js`, exports);
console.log("✅ index.js da pasta /data atualizado com sucesso!");
