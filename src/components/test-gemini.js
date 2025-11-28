// Script de teste para API Gemini
// Execute com: node test-gemini.js

const GEMINI_KEY = "AIzaSyABd4TQF_jCRnPt2ReKSjggTqnltsQ_5tZw"; // Sua chave
const ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_KEY}`;

async function testGeminiAPI() {
  console.log("🧪 Testando API Gemini...\n");

  try {
    console.log("📡 Enviando requisição...");
    
    const response = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: "Olá! Você está funcionando?"
          }]
        }]
      }),
    });

    console.log(`\n📊 Status: ${response.status} ${response.statusText}`);

    if (response.ok) {
      const data = await response.json();
      const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text;
      
      console.log("\n✅ SUCESSO! A API está funcionando.");
      console.log("\n🤖 Resposta do Gemini:");
      console.log("─".repeat(50));
      console.log(reply);
      console.log("─".repeat(50));
      
      return true;
    } else {
      const errorData = await response.json();
      console.error("\n❌ ERRO! A API retornou um erro:");
      console.error(JSON.stringify(errorData, null, 2));
      
      if (response.status === 400) {
        console.log("\n💡 Possíveis causas do erro 400:");
        console.log("   1. Chave da API inválida");
        console.log("   2. Formato do payload incorreto");
        console.log("   3. Quota da API excedida");
      }
      
      if (response.status === 403) {
        console.log("\n💡 Possíveis causas do erro 403:");
        console.log("   1. Chave da API sem permissões");
        console.log("   2. API não habilitada no projeto");
        console.log("   3. Restrições de uso da chave");
      }
      
      return false;
    }
  } catch (error) {
    console.error("\n❌ ERRO DE CONEXÃO:");
    console.error(error.message);
    console.log("\n💡 Verifique:");
    console.log("   1. Conexão com a internet");
    console.log("   2. Firewall/proxy bloqueando");
    console.log("   3. URL do endpoint correta");
    return false;
  }
}

// Informações úteis
console.log("═".repeat(60));
console.log("  TESTE DA API GEMINI - Portfólio Erick Filipe");
console.log("═".repeat(60));
console.log("\n📝 Configuração:");
console.log(`   Endpoint: ${ENDPOINT.split('?')[0]}`);
console.log(`   Chave: ${GEMINI_KEY.substring(0, 10)}...`);
console.log("\n");

// Executa o teste
testGeminiAPI().then(success => {
  console.log("\n" + "═".repeat(60));
  if (success) {
    console.log("✅ TUDO CERTO! Você pode usar a API no portfólio.");
    console.log("\n📋 Próximos passos:");
    console.log("   1. Reinicie o servidor: npm run dev");
    console.log("   2. Limpe o cache do navegador (Ctrl+Shift+R)");
    console.log("   3. Teste o chat no portfólio");
  } else {
    console.log("❌ HÁ PROBLEMAS. Verifique os erros acima.");
    console.log("\n📋 O que fazer:");
    console.log("   1. Gere uma nova chave em:");
    console.log("      https://makersuite.google.com/app/apikey");
    console.log("   2. Atualize o arquivo .env");
    console.log("   3. Execute este script novamente");
  }
  console.log("═".repeat(60) + "\n");
}).catch(err => {
  console.error("\n💥 Erro fatal:", err);
});