/**
 * Mônaco Intelligence — Endpoint somente leitura para Google Apps Script
 *
 * Configuração nas Script Properties:
 *   SPREADSHEET_ID  → ID da planilha (da URL do Google Sheets)
 *   API_TOKEN       → Token secreto que o frontend envia no header Authorization
 *
 * ⚠️ Este script nunca escreve, apaga ou formata nada na planilha.
 */

const SHEET_NAME = 'BOARD_MÔNACO';

function doGet(e) {
  try {
    const props = PropertiesService.getScriptProperties();
    const expectedToken = props.getProperty('API_TOKEN');
    const receivedToken = (e.parameter.token || '').trim();

    if (expectedToken && receivedToken !== expectedToken) {
      return jsonResponse({ error: 'Não autorizado.' }, 403);
    }

    const spreadsheetId = props.getProperty('SPREADSHEET_ID');
    if (!spreadsheetId) {
      return jsonResponse({ error: 'SPREADSHEET_ID não configurado nas Script Properties.' }, 500);
    }

    const ss = SpreadsheetApp.openById(spreadsheetId);
    const sheet = ss.getSheetByName(SHEET_NAME);

    if (!sheet) {
      return jsonResponse({ error: `Aba "${SHEET_NAME}" não encontrada.` }, 404);
    }

    const summary = readSummary(sheet);
    const campaigns = readRange(sheet, 'A10:N24');
    const adGroups = readRange(sheet, 'A29:N46');
    const ads = readRange(sheet, 'A50:N69');
    const matchTypes = readRange(sheet, 'A74:N80');

    const payload = {
      generatedAt: new Date().toISOString(),
      periodStart: sheet.getRange('B2').getValue() || '',
      periodEnd: sheet.getRange('D2').getValue() || '',
      mode: 'live',
      summary: summary,
      campaigns: campaigns,
      adGroups: adGroups,
      ads: ads,
      matchTypes: matchTypes,
      keywords: [],
      searchTerms: [],
    };

    return jsonResponse(payload, 200);

  } catch (err) {
    return jsonResponse({ error: 'Erro interno: ' + err.message }, 500);
  }
}

function readSummary(sheet) {
  // Resumo nas células A5, C5, E5, G5, I5, K5, M5
  return {
    investment:       toNumber(sheet.getRange('A5').getValue()),
    googleConversions:toNumber(sheet.getRange('C5').getValue()),
    crmLeads:         toNumber(sheet.getRange('E5').getValue()),
    wins:             toNumber(sheet.getRange('G5').getValue()),
    lost:             toNumber(sheet.getRange('I5').getValue()),
    open:             toNumber(sheet.getRange('K5').getValue()),
    wonPlates:        toNumber(sheet.getRange('M5').getValue()),
    realCpl:          toNumber(sheet.getRange('O5').getValue()),
    costPerWin:       toNumber(sheet.getRange('Q5').getValue()),
    winRate:          toNumber(sheet.getRange('S5').getValue()),
  };
}

function readRange(sheet, rangeA1) {
  const values = sheet.getRange(rangeA1).getValues();
  const rows = [];

  for (let i = 1; i < values.length; i++) {
    const row = values[i];
    if (isEmptyRow(row)) continue;

    const obj = {};
    const headers = values[0];
    for (let j = 0; j < headers.length; j++) {
      const key = String(headers[j]).trim();
      if (!key) continue;
      const val = row[j];
      obj[key] = typeof val === 'number' ? val : String(val).trim();
    }
    rows.push(obj);
  }

  return rows;
}

function isEmptyRow(row) {
  return row.every(cell => cell === '' || cell === null || cell === undefined);
}

function toNumber(value) {
  const n = parseFloat(String(value).replace(',', '.').replace(/[^\d.-]/g, ''));
  return isNaN(n) ? 0 : n;
}

function jsonResponse(data, statusCode) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
