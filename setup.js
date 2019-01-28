const fs = require("fs");
const path = require("path");

const updatePackageJson = () => {
  try {
    let packageJson = require("./package.json");
    const rnpm = {
      assets: ["Sources/Assets/Fonts"]
    };
    packageJson.scripts.tsc = "tsc";
    packageJson.scripts.android =
      "adb reverse tcp:8081 tcp:8081 & react-native run-android";
    packageJson.scripts.shake = "adb shell input keyevent 82";
    packageJson.scripts.iosD = "react-native run-ios --device";
    packageJson.scripts.iosE = "react-native run-ios";
    packageJson = Object.assign(packageJson, { rnpm });
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

console.log("🔄 Setting up...");
updatePackageJson();
deleteFile(".flowconfig");
deleteFile("App.js");
deleteFile("setup.js");
moveFile(
  path.join(__dirname, "app.json"),
  path.join(__dirname, "Sources/App/app.json")
);

console.log(`✅ Setup completed!`);
