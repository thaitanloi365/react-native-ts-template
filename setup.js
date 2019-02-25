const fs = require("fs");
const path = require("path");
const splashscreen = require("./scripts/splash_screen/splashScreen");
const { name } = require("./app.json");
const updatePackageJson = fileName => {
  try {
    let packageJson = require(path.resolve(__dirname, fileName));
    const rnpm = {
      assets: ["Sources/Assets/Fonts"]
    };
    packageJson.scripts.tsc = "tsc";
    packageJson.scripts.android =
      "adb reverse tcp:8081 tcp:8081 & react-native run-android";
    packageJson.scripts.shake = "adb shell input keyevent 82";
    packageJson.scripts.ios = "react-native run-ios";
    packageJson.scripts.postversion = "react-native-version";
    packageJson.scripts.resetversion =
      "react-native-version --reset-build --set-build 1";

    packageJson = Object.assign(packageJson, { rnpm });
    writeFile(fileName, JSON.stringify(packageJson, null, 2));
    console.log("update package json success");
  } catch (e) {
    console.log("update package json error: ", e);
  }
};

const deleteFile = fileName => {
  try {
    fs.unlinkSync(path.join(__dirname, fileName));
  } catch (e) {
    console.log("delete file error: ", fileName);
  }
};

const writeFile = (fileName, data) =>
  fs.writeFileSync(path.join(__dirname, fileName), data);

const moveFile = (oldPath, newPath) => {
  fs.rename(oldPath, newPath, function(err) {
    if (err) {
      if (err.code === "EXDEV") {
        copy();
      } else {
        console.log("rename error: ", newPath);
      }
      return;
    }
  });

  function copy() {
    var readStream = fs.createReadStream(oldPath);
    var writeStream = fs.createWriteStream(newPath);

    readStream.on("error", () => console.log("copy error"));
    writeStream.on("error", () => console.log("write error"));

    readStream.on("close", function() {
      fs.unlink(oldPath, () => console.log("read error"));
    });

    readStream.pipe(writeStream);
  }
};

function rimraf(dir_path) {
  if (fs.existsSync(dir_path)) {
    fs.readdirSync(dir_path).forEach(function(entry) {
      var entry_path = path.join(dir_path, entry);
      if (fs.lstatSync(entry_path).isDirectory()) {
        rimraf(entry_path);
      } else {
        fs.unlinkSync(entry_path);
      }
    });
    fs.rmdirSync(dir_path);
  }
}

console.log(`🔄 Project ${name} setting up...`);

deleteFile(".flowconfig");
deleteFile("App.js");
deleteFile("setup.js");
deleteFile("README.md");
moveFile(
  path.join(__dirname, "app.json"),
  path.join(__dirname, "Sources/App/app.json")
);

updatePackageJson("package.json");
splashscreen.install();
rimraf(path.join(__dirname, "scripts"));

const { exec } = require("child_process");

console.log("👉👉👉 Types checking ...");
exec("yarn tsc", (error, stdout, stderr) => {
  if (error) {
    console.error(`exec error: ${error}`);
    return;
  }
  console.log(stdout);
  console.log(stderr);
});

console.log("👉👉👉 Reset version to 0.0.1(1) ...");
exec("yarn resetversion", (error, stdout, stderr) => {
  if (error) {
    console.error(`exec error: ${error}`);
    return;
  }
  console.log(stdout);
  console.log(stderr);
});

console.log(`✅ Project ${name} - version 0.0.1(1) setup completed!`);
