const fs = require("fs");
const path = require("path");
const splashscreen = require("./scripts/splash_screen/splashScreen");
const { name } = require("./app.json");
const iosAppName = `thaitanloi365/${name}-iOS`;
const androidAppName = `thaitanloi365/${name}-Android`;
const updatePackageJson = fileName => {
  try {
    let packageJson = require(path.resolve(__dirname, fileName));
    const rnpm = {
      assets: ["Sources/Assets/Fonts"]
    };
    packageJson.scripts.tsc = "tsc";
    packageJson.scripts.android = "adb reverse tcp:8081 tcp:8081 & react-native run-android";
    packageJson.scripts.shake = "adb shell input keyevent 82";
    packageJson.scripts.ios = "react-native run-ios";
    packageJson.scripts.post_version = "react-native-version --increment-build --never-amend";
    packageJson.scripts.reset_version = "react-native-version --reset-build --set-build 1";
    packageJson.codepush_release_staging_ios = `appcenter codepush release-react -a ${iosAppName} -d Staging`;
    packageJson.codepush_release_production_ios = `appcenter codepush release-react -a ${iosAppName} -d Production`;
    packageJson.codepush_release_staging_android = `appcenter codepush release-react -a ${androidAppName} -d Staging`;
    packageJson.codepush_release_production_android = `appcenter codepush release-react -a ${androidAppName} -d Production`;
    packageJson.codepush_add_staging_ios = `appcenter codepush deployment add -a ${iosAppName} Staging`;
    packageJson.codepush_add_production_ios = `appcenter codepush deployment add -a ${iosAppName} Production`;
    packageJson.codepush_add_staging_android = `appcenter codepush deployment add -a ${androidAppName} Staging`;
    packageJson.codepush_add_production_android = `appcenter codepush deployment add -a ${androidAppName} Production`;
    packageJson.codepush_create_ios = `appcenter apps create -d ThePark-Android -o Android -p React-Native`;
    packageJson.codepush_create_android = `appcenter apps create -d ThePark-iOS -o iOS -p React-Native`;
    packageJson.codepush_list_deployment_ios = `appcenter codepush deployment list -a ${iosAppName} -k`;
    packageJson.codepush_list_deployment_android = `appcenter codepush deployment list -a ${androidAppName} -k`;

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

const writeFile = (fileName, data) => fs.writeFileSync(path.join(__dirname, fileName), data);

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
moveFile(path.join(__dirname, "app.json"), path.join(__dirname, "Sources/App/app.json"));

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
exec("yarn reset_version", (error, stdout, stderr) => {
  if (error) {
    console.error(`exec error: ${error}`);
    return;
  }
  console.log(stdout);
  console.log(stderr);
});

console.log(`✅ Project ${name} - version 0.0.1(1) setup completed!`);
