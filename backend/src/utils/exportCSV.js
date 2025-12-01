// utils/exportCSV.js
// Small helper to convert JSON to CSV and return tmp filepath
const { Parser } = require('json2csv');
const fs = require('fs');
const path = require('path');

const TMP_DIR = path.join(__dirname, '..', 'tmp');
if (!fs.existsSync(TMP_DIR)) fs.mkdirSync(TMP_DIR, { recursive: true });

/**
 * exportToCSV(data, filenameBase)
 * returns { filepath, filename }
 */
exports.exportToCSV = (data, filenameBase = 'export') => {
  const parser = new Parser();
  const csv = parser.parse(data || []);
  const filename = `${filenameBase}-${Date.now()}.csv`;
  const filepath = path.join(TMP_DIR, filename);
  fs.writeFileSync(filepath, csv);
  return { filepath, filename };
};

/**
 * cleanupFile(filepath) - attempt to unlink, ignore errors
 */
exports.cleanupFile = (filepath) => {
  try { if (fs.existsSync(filepath)) fs.unlinkSync(filepath); } catch (e) {}
};
