const fs = require('fs')
const path = require('path')
const { name } = require('../../app.json')
const rootDir = path.join(__dirname, '../../')

function install() {
  function copyFileSync(source, target) {
    var targetFile = target

    //if target is a directory a new file with the same name will be created
    if (fs.existsSync(target)) {
      if (fs.lstatSync(target).isDirectory()) {
        targetFile = path.join(target, path.basename(source))
      }
    }

    fs.writeFileSync(targetFile, fs.readFileSync(source))
  }

  function copyFolderRecursiveSync(source, target) {
    var files = []

    //check if folder needs to be created or integrated
    var targetFolder = path.join(target, path.basename(source))
    if (!fs.existsSync(targetFolder)) {
      console.log('create new folder', targetFolder)
      fs.mkdirSync(targetFolder)
    }

    //copy
    if (fs.lstatSync(source).isDirectory()) {
      console.log('isDir', source)
      files = fs.readdirSync(source)
      files.forEach(function(file) {
        var curSource = path.join(source, file)
        if (fs.lstatSync(curSource).isDirectory()) {
          copyFolderRecursiveSync(curSource, targetFolder)
        } else {
          copyFileSync(curSource, targetFolder)
        }
      })
    }
  }

  const scripts_src_dir = path.join(__dirname, 'scripts')
  const scripts_target_dir = path.join(rootDir, 'scripts')
  if (!fs.existsSync(scripts_target_dir)) {
    console.log('create new layout folder', scripts_target_dir)
    fs.mkdirSync(scripts_target_dir)

    copyFolderRecursiveSync(scripts_src_dir, scripts_target_dir)
  }
}

module.exports.install = install
