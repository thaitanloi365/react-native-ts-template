import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { configStore } from "@ReduxManager";
import { Navigator, AppContainer } from "@Navigation";
import {
  StatusBarStyle,
  StatusBar as RN,
  Platform,
  Linking
} from "react-native";
import { ToastType } from "@Types";
import { Loading, Alert, Toast, NetInfo } from "rn-notifier";
import VersionCheck from "react-native-version-check";
import CodePush from "react-native-code-push";

const { store, persistor } = configStore();

const IOS_PROD_KEY = "MAwfe7__oedMISSDYOBOrE8h-KY6B1A8oWNRE";
const IOS_STAGING_KEY = "DkiGB34b-D-nFUwCSqybVU8YyQQrH1tIs-EAN";

const ANDROID_PROD_KEY = "3mXZHReQArcQPOdDTJGez0F-8Rt9SyJasW4CE";
const ANDROID_STAGING_KEY = "mooSDY5Cm41X07gKGjA0KAece452BkYns-4AV";

const STAGING_KEY =
  Platform.OS === "ios" ? IOS_STAGING_KEY : ANDROID_STAGING_KEY;

const PROD_KEY = Platform.OS === "ios" ? IOS_PROD_KEY : ANDROID_PROD_KEY;

const DEPLOYMENT_KEY = __DEV__ ? STAGING_KEY : PROD_KEY;

const APP_ID = "";
const APP_NAME = "";

type Props = {};

type State = {
  checkedUpdate: boolean;
};

export class App extends React.Component<Props, State> {
  private loadingRef = React.createRef<Loading>();
  private alertRef = React.createRef<Alert>();
  private toastRef = React.createRef<Toast>();

  componentWillMount() {
    this.checkStore();
    CodePush.disallowRestart();
    CodePush.getUpdateMetadata(CodePush.UpdateState.RUNNING)
      .then(packageInfo => {
        if (!packageInfo) return;
        const { label, appVersion } = packageInfo;
        const buildNumber = label.substring(1);
        const version = `${appVersion}.${buildNumber}`;
      })
      .catch(error => {
        console.log("error", error);
      });
  }

  componentDidMount() {
    CodePush.allowRestart();
  }

  checkStore() {
    let info = null;
    let storeUrl = "";
    VersionCheck.needUpdate()
      .then(res => {
        info = res;
        return VersionCheck.getStoreUrl({
          appID: APP_ID,
          appName: APP_NAME,
          ignoreErrors: true
        });
      })
      .then(url => {
        if (!info.isNeeded || !url)
          throw Error(
            "No need to update store, will fallback to check code push"
          );
        storeUrl = url;
        return Linking.canOpenURL(url);
      })
      .then(canOpen => {
        if (!canOpen)
          throw Error("Can't open store url, will fallback to check code push");
        this.showAlert(
          "Update Available",
          "Please update to newest version.",
          () => {
            Linking.openURL(storeUrl);
          }
        );
      })
      .catch(error => {
        console.log("**** error", error);
      });
  }

  codePushStatusDidChange(status) {
    switch (status) {
      case CodePush.SyncStatus.CHECKING_FOR_UPDATE:
        console.log("Checking for updates.");
        break;
      case CodePush.SyncStatus.DOWNLOADING_PACKAGE:
        console.log("Downloading package.");
        break;
      case CodePush.SyncStatus.INSTALLING_UPDATE:
        console.log("Installing update.");
        break;
      case CodePush.SyncStatus.UP_TO_DATE:
        console.log("Up-to-date.");
        this.setState({ checkedUpdate: true });
        break;
      case CodePush.SyncStatus.UPDATE_INSTALLED:
        console.log("Update installed.");

        break;
      case CodePush.SyncStatus.UNKNOWN_ERROR:
        console.log("Update installed.");
        this.setState({ checkedUpdate: true });

        break;
    }
  }

  showLoading = (msg?: string) => {
    if (this.loadingRef.current) this.loadingRef.current.show(msg);
  };

  hideLoading = (onClose?: () => void) => {
    if (this.loadingRef.current) this.loadingRef.current.hide(onClose);
  };

  showAlert = (
    title: string,
    msg: string,
    onOk?: () => void,
    onCancel?: () => void,
    okButtonText?: string,
    cancelButtonText?: string
  ) => {
    if (this.alertRef.current)
      this.alertRef.current.show(
        title,
        msg,
        onOk,
        onCancel,
        okButtonText,
        cancelButtonText
      );
  };

  showToast = (
    title: string,
    message: string,
    type: ToastType = "Error",
    duration: number = 4000,
    onShow?: () => void,
    onClose?: () => void,
    isDisableInteraction = false,
    activeStatusBarType: StatusBarStyle = "light-content",
    deactiveStatusBarType: StatusBarStyle = "default"
  ) => {
    if (this.toastRef.current) {
      // @ts-ignore
      const backupProps = RN._currentValues;
      let _deactiveStatusBarType = deactiveStatusBarType;
      if (backupProps && backupProps.barStyle) {
        const { value } = backupProps.barStyle;
        if (value) {
          _deactiveStatusBarType = value;
        }
      }
      this.toastRef.current.show(
        title,
        message,
        type,
        duration,
        onShow,
        onClose,
        isDisableInteraction,
        activeStatusBarType,
        _deactiveStatusBarType
      );
    }
  };

  hideToast = () => {
    if (this.toastRef.current) {
      this.toastRef.current.hide();
    }
  };

  private getScreenProps() {
    return {
      showLoading: this.showLoading,
      hideLoading: this.hideLoading,
      showAlert: this.showAlert,
      showToast: this.showToast,
      hideToast: this.hideToast
    };
  }

  private setRoot = (r: any) => {
    Navigator.setRoot(r);
  };

  render() {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          {this.state.checkedUpdate && (
            <AppContainer
              ref={this.setRoot}
              screenProps={this.getScreenProps()}
            />
          )}
          <Toast ref={this.toastRef} />
          <Loading ref={this.loadingRef} />
          <Alert ref={this.alertRef} />
          <NetInfo />
        </PersistGate>
      </Provider>
    );
  }
}

export default CodePush({
  checkFrequency: CodePush.CheckFrequency.ON_APP_START,
  installMode: CodePush.InstallMode.IMMEDIATE,
  mandatoryInstallMode: CodePush.InstallMode.IMMEDIATE,
  deploymentKey: DEPLOYMENT_KEY
})(App);
