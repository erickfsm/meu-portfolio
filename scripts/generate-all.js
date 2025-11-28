import { execSync } from "child_process";
import chalk from "chalk";

console.log(chalk.cyan("\n🚀 Gerando index.js automáticos..."));

try {
  execSync("node scripts/generate-components-index.js", { stdio: "inherit" });
  execSync("node scripts/generate-data-index.js", { stdio: "inherit" });

  console.log(chalk.green("\n✅ Todos os index.js foram atualizados com sucesso!\n"));
} catch (error) {
  console.error(chalk.red("❌ Erro ao gerar índices automáticos:"), error);
  process.exit(1);
}