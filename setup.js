const fs = require('fs')
const path = require('path')

const packageJson = require('./package.json')

const deleteFile = fileName => fs.unlinkSync(path.join(__dirname, fileName))
const writeFile = (fileName, data) => fs.writeFileSync(path.join(__dirname, fileName), data)
const moveFile = (oldPath,newPath) => {
    fs.rename(oldPath, newPath, function (err) {
        if (err) {
            if (err.code === 'EXDEV') {
                copy();
            } else {
                console.log("rename error", err);
            }
            return;
        }
    });

    function copy() {
        var readStream = fs.createReadStream(oldPath);
        var writeStream = fs.createWriteStream(newPath);

        readStream.on('error',() => console.log("copy error"));
        writeStream.on('error', () => console.log("write error"));

        readStream.on('close', function () {
            fs.unlink(oldPath, () => console.log("read error"));
        });

        readStream.pipe(writeStream);
    }
}

console.log('🔄 Setting up...')

packageJson.scripts.tsc = 'tsc'

writeFile('package.json', JSON.stringify(packageJson, null, 2))

deleteFile('.flowconfig')
deleteFile('App.js')
deleteFile('setup.js')
moveFile(path.join(__dirname,'app.json'),path.join(__dirname,'Sources/App/app.json'))
console.log(`✅ Setup completed!`)