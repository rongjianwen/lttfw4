const unzipper = require('unzipper');
const micromatch = require('micromatch');
const fs = require('fs');
const path = require('path');
const download = require('./download');
const ensureDir = require('./ensure_dir');

function unzipMaterialDesignIcons(filepath, destDir) {
    fs.createReadStream(filepath)
        .pipe(unzipper.Parse())
        .on('entry', (entry) => {
            const filename = entry.path;
            // const type = entry.type;
            // const size = entry.vars.uncompressedSize;

            if (micromatch.isMatch(filename, '**/iconfont/**/*.*')) {
                entry.pipe(fs.createWriteStream(path.join(destDir, path.basename(filename))));
            } else {
                entry.autodrain();
            }
        })
        .on('finish', () => {
            fs.unlink(filepath, () => {});
        });
}

function downloadMaterialDesignIcons(vendorDir) {
    const mdiUrl = 'https://github.com/google/material-design-icons/archive/refs/tags/3.0.2.zip';
    const mdiZip = path.join(vendorDir, 'material-design-icons.zip');
    let destDir = path.join(vendorDir, 'material-design-icons-3.0.2');
    ensureDir(destDir);
    destDir = path.join(destDir, 'iconfont');
    ensureDir(destDir);

    download(mdiUrl, mdiZip)
        .then((_e) => {
            unzipMaterialDesignIcons(mdiZip, destDir);
        })
        .catch((_e) => {});
}

module.exports = downloadMaterialDesignIcons;
