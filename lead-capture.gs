// Google Apps Script: saves website enquiries into the "Web Leads" sheet.
// Setup: open the sheet > Extensions > Apps Script > paste this > Deploy > New deployment > Web app
//   Execute as: Me | Who has access: Anyone > copy the /exec URL into LEAD_ENDPOINT in index.html.
const SHEET_ID = '1IlRbR_mGscdoblCXhSw0E3wsCV-fUrXR_AhpXnbMAc4';
const HEADERS = ['Timestamp', 'Property type', 'Name', 'Mobile', 'Monthly bill (₹)', 'Pincode', 'Email', 'Page'];

function clean(v) { v = String(v == null ? '' : v).slice(0, 200); return /^[=+\-@]/.test(v) ? "'" + v : v; }

function doPost(e) {
  const lock = LockService.getScriptLock();
  try {
    const d = JSON.parse(e.postData.contents);
    if (!/^[0-9]{10}$/.test(String(d.mobile))) return ContentService.createTextOutput('invalid');
    lock.waitLock(10000);
    const sh = SpreadsheetApp.openById(SHEET_ID).getSheets()[0];
    if (sh.getLastRow() <= 1) sh.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
    sh.appendRow([new Date(), clean(d.segment), clean(d.name), clean(d.mobile), clean(d.bill), clean(d.pincode), clean(d.email), clean(d.page)]);
    return ContentService.createTextOutput('ok');
  } catch (err) {
    return ContentService.createTextOutput('error');
  } finally {
    try { lock.releaseLock(); } catch (x) { }
  }
}
function doGet() { return ContentService.createTextOutput('Suntastic lead endpoint is live'); }
