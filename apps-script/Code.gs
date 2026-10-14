/**
 * Planilha de leads | LP Valor e Arte | QH4 Growth
 *
 * Como usar (resumo, passo a passo completo no README):
 * 1. Abra a planilha "Leads | LP Valor e Arte" > Extensões > Apps Script.
 * 2. Apague o conteúdo do Code.gs e cole este arquivo inteiro. Salve.
 * 3. Implantar > Nova implantação > Tipo: App da Web
 *    Executar como: Eu | Quem pode acessar: Qualquer pessoa
 * 4. Autorize e copie a URL que termina em /exec.
 * 5. Cole a URL em assets/js/main.js, na variável SHEET_ENDPOINT.
 */

var HEADERS = [
  'Data e hora', 'Nome', 'WhatsApp', 'Local da obra', 'Perfil', 'O que precisa',
  'Fase da obra', 'Material', 'Mensagem', 'Página',
  'UTM Source', 'UTM Medium', 'UTM Campaign', 'UTM Term', 'UTM Content', 'GCLID', 'FBCLID'
];
var FIELDS = [
  null, 'nome', 'whatsapp', 'cidade', 'perfil', 'peca',
  'fase', 'material', 'mensagem', 'pagina',
  'utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'gclid', 'fbclid'
];
var MAX_LEN = 1000;

function doPost(e) {
  var lock = LockService.getScriptLock();
  try {
    lock.waitLock(10000);
    var data = parseBody_(e);
    if (!data.nome || !data.whatsapp) return json_({ ok: false, error: 'Nome e WhatsApp são obrigatórios.' });

    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
    ensureHeader_(sheet);

    var now = Utilities.formatDate(new Date(), 'America/Sao_Paulo', 'dd/MM/yyyy HH:mm:ss');
    var row = FIELDS.map(function (f) {
      if (f === null) return now;
      return clean_(data[f]);
    });
    sheet.appendRow(row);
    return json_({ ok: true });
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  } finally {
    try { lock.releaseLock(); } catch (x) {}
  }
}

/* Abrir a URL /exec no navegador mostra se o Web App está no ar */
function doGet() {
  return json_({ ok: true, service: 'Leads LP Valor e Arte' });
}

/* Rode uma vez pelo editor para testar a gravação na planilha */
function testeLead() {
  var fake = { postData: { contents: JSON.stringify({
    nome: 'Teste QH4', whatsapp: '(11) 90000-0000', cidade: 'Pinheiros, São Paulo',
    perfil: 'Cliente final', peca: 'Bancada de cozinha ou ilha', fase: 'Obra em andamento',
    material: 'Quero orientação', mensagem: 'Lead de teste, pode apagar', pagina: 'teste'
  }) } };
  Logger.log(doPost(fake).getContent());
}

function parseBody_(e) {
  if (e && e.postData && e.postData.contents) {
    try { return JSON.parse(e.postData.contents); } catch (x) {}
  }
  return (e && e.parameter) || {};
}

function ensureHeader_(sheet) {
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
  }
  if (sheet.getFrozenRows() < 1) {
    sheet.setFrozenRows(1);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold').setBackground('#A5542E').setFontColor('#FFFFFF');
  }
}

/* Corta textos longos e impede que um campo vire fórmula na planilha */
function clean_(v) {
  var s = (v === undefined || v === null) ? '' : String(v).trim().slice(0, MAX_LEN);
  if (/^[=+\-@]/.test(s)) s = "'" + s;
  return s;
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
