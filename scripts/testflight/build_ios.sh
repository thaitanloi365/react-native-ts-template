#Edit here
export PROJECT_NAME=YOUR_PROJECT_NAME

cp ./script/exportOptions.plist ios/

fastlane run increment_build_number

cd ios
xcodebuild -workspace $PROJECT_NAME.xcworkspace -scheme $PROJECT_NAME -sdk iphoneos -configuration Release archive -archivePath $PWD/build/$PROJECT_NAME.xcarchive
xcodebuild -exportArchive -archivePath $PWD/build/$PROJECT_NAME.xcarchive -exportOptionsPlist exportOptions.plist -exportPath $PWD/build/$PROJECT_NAME.ipa
cd ..
