const fs = require('fs')

module.exports = function (req, res, next) {
    const { image } = req.body;

    const base64Data = image.replace(/^data:image\/png;base64,|^data:image\/gif;base64,/, "");
    const newFilename = Date.now() + '.' + 'gif';
    const newFile = 'uploads/' + newFilename;
    req.filePath = newFile
    fs.writeFile(newFile, base64Data, 'base64', function (err) {
        if (err) {
            console.log(err);
            next()
        } else {
            next()
        }
    });
}