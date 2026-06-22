# Integração com a Planilha — Mônaco Intelligence

## Visão geral

O frontend consome um JSON gerado pelo Apps Script publicado como Web App. O script lê a aba `BOARD_MÔNACO` e retorna os dados estruturados. **Ele nunca escreve, apaga ou formata nada.**

---

## Passo a passo

### 1. Abrir o Apps Script da planilha

1. Abra a planilha no Google Sheets.
2. No menu superior: **Extensões → Apps Script**.
3. Cole o conteúdo de `integrations/google-apps-script/Code.gs`.

### 2. Configurar as Script Properties

1. No Apps Script: **Projeto → Propriedades do projeto → Script Properties**.
2. Adicione as propriedades:

| Chave | Valor |
|---|---|
| `SPREADSHEET_ID` | ID da planilha (parte da URL após `/d/`) |
| `API_TOKEN` | Token secreto de sua escolha (ex: string aleatória de 32 chars) |

### 3. Publicar como Web App

1. No Apps Script: **Implantar → Nova implantação**.
2. Tipo: **Aplicativo da Web**.
3. Executar como: **Minha conta**.
4. Quem tem acesso: **Qualquer pessoa** (sem login).
5. Clique em **Implantar** e copie a URL gerada.

### 4. Configurar as variáveis de ambiente no Netlify

No painel do Netlify, em **Site settings → Environment variables**:

| Variável | Valor |
|---|---|
| `MONACO_DATA_API_URL` | URL gerada no passo 3 |
| `MONACO_DATA_API_TOKEN` | Token definido nas Script Properties |
| `VITE_USE_MOCK` | `false` |

### 5. Estrutura esperada da aba BOARD_MÔNACO

```
Linha 2:  B2 = data início do período, D2 = data fim
Linha 5:  A5=investimento, C5=conv.google, E5=leads, G5=ganhos,
          I5=perdidos, K5=abertos, M5=placas, O5=CPL, Q5=custo/ganho, S5=taxa
Linhas 10–24:  campanhas (cabeçalho na linha 10)
Linhas 29–46:  grupos de anúncios (cabeçalho na linha 29)
Linhas 50–69:  anúncios (cabeçalho na linha 50)
Linhas 74–80:  correspondências (cabeçalho na linha 74)
```

---

## Segurança

- O token **nunca** aparece no frontend (só na Netlify Function, em variável de ambiente do servidor).
- A Function faz a chamada ao Apps Script no servidor, não no browser.
- Variáveis `VITE_*` ficam expostas no bundle — **nunca coloque o token em variável `VITE_`**.
