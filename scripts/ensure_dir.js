const fs = require('fs');

function ensureDir(dir) {
    const exists = fs.existsSync(dir);
    if (!exists) {
        fs.mkdirSync(dir);
    }
}

module.exports = ensureDir;
