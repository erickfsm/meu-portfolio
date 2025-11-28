# 🤖 Configuração do Chatbot Gemini

## Status Atual
O chatbot está funcionando em **modo offline** com respostas pré-programadas. Para ativar a integração com a API do Google Gemini, siga os passos abaixo.

---

## 🔧 Passo a Passo

### 1. Obter uma chave da API Gemini

1. Acesse: https://makersuite.google.com/app/apikey
2. Faça login com sua conta Google
3. Clique em "Create API Key"
4. Copie a chave gerada

### 2. Configurar o arquivo .env

1. Copie o arquivo de exemplo:
```bash
cp .env.example .env
```

2. Abra o arquivo `.env` e adicione sua chave:
```bash
VITE_GEMINI_ENDPOINT=https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=SUA_CHAVE_AQUI
```

⚠️ **Substitua `SUA_CHAVE_AQUI` pela chave que você copiou!**

### 3. Reiniciar o servidor

```bash
npm run dev
```

---

## ✅ Como saber se está funcionando?

Após configurar, você verá:

- **API** (bolinha verde) no canto superior direito do chat
- Sem mensagem de aviso amarela
- Respostas mais elaboradas e contextuais

---

## 🐛 Solucionando Problemas

### Erro 403 (Forbidden)
**Causa:** Chave da API inválida ou sem permissões.

**Solução:**
1. Verifique se a chave foi copiada corretamente
2. Confirme que não há espaços extras
3. Gere uma nova chave se necessário

### Erro 429 (Too Many Requests)
**Causa:** Limite de requisições excedido.

**Solução:**
1. Aguarde alguns minutos
2. Considere upgrade do plano da API
3. Use o modo offline temporariamente

### Chat não responde
**Causa:** Variável de ambiente não foi carregada.

**Solução:**
1. Confirme que o arquivo `.env` está na raiz do projeto
2. Reinicie o servidor: `npm run dev`
3. Verifique o console do navegador (F12) para erros

---

## 📝 Modo Offline vs Online

| Recurso | Offline | Online (API) |
|---------|---------|--------------|
| Respostas básicas | ✅ | ✅ |
| Contexto dos cases | ✅ | ✅ |
| Respostas elaboradas | ❌ | ✅ |
| Conversas longas | ❌ | ✅ |
| Custo | Grátis | Pago* |

*A API Gemini tem um tier gratuito generoso.

---

## 🔒 Segurança

- ✅ O arquivo `.env` está no `.gitignore`
- ✅ Nunca commite credenciais no Git
- ✅ Use variáveis de ambiente em produção
- ✅ Rotacione chaves periodicamente

---

## 🚀 Próximos Passos

Após configurar a API, você pode:

1. Ajustar o prompt no componente `GeminiAssistant.jsx`
2. Adicionar mais casos de uso nas respostas offline
3. Implementar rate limiting
4. Criar um backend para proteger a chave da API

