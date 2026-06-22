# Deploy no Netlify — Mônaco Intelligence

## 1. Rodar localmente com dados mockados

```bash
cp .env.example .env
# VITE_USE_MOCK=true (padrão)
npm run dev
# Acesse http://localhost:5173
```

## 2. Rodar com dados reais localmente

```bash
# Preencha MONACO_DATA_API_URL e MONACO_DATA_API_TOKEN no .env
# Mude VITE_USE_MOCK=false
npm run dev
```

## 3. Testar Netlify Functions localmente

```bash
npm install -g netlify-cli
netlify dev
# Acesse http://localhost:8888
# A function estará em /.netlify/functions/dashboard-data
```

## 4. Configurar variáveis de ambiente

No Netlify (Site settings → Environment variables):

| Variável | Descrição |
|---|---|
| `VITE_USE_MOCK` | `false` para usar dados reais |
| `MONACO_DATA_API_URL` | URL do Web App do Apps Script |
| `MONACO_DATA_API_TOKEN` | Token configurado no Apps Script |

## 5. Deploy pelo GitHub

1. Conecte o repositório no painel do Netlify.
2. Configure as variáveis de ambiente.
3. O build acontece automaticamente a cada push na branch principal.

## 6. Deploy pela Netlify CLI

```bash
npm run build
netlify deploy --prod --dir=dist
```

> ⚠️ Não execute `netlify init` nem faça login sem autorização.
