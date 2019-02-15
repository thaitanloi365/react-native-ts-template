import React from "react";
import { NetInfo as RNNetInfo, Platform } from "react-native";
import Toast from "../Toast/Toast";

type Props = {};
type State = {};

class NetInfo extends React.Component<Props, State> {
  private toastRef = React.createRef<Toast>();

  componentDidMount() {
    RNNetInfo.isConnected.addEventListener(
      "connectionChange",
      this.handleConnectionChange
    );
    if (Platform.OS == "android") {
      RNNetInfo.isConnected.fetch().then(isConnected => {
        this.handleConnectionChange(isConnected);
      });
    }
  }

  componentWillUnmount() {
    RNNetInfo.isConnected.removeEventListener(
      "connectionChange",
      this.handleConnectionChange
    );
  }

  private handleConnectionChange = (isConnected: boolean) => {
    console.log("handleConnectionChange", isConnected);
    if (this.toastRef.current) {
      if (isConnected) {
        this.toastRef.current.hide();
      } else {
        this.toastRef.current.show();
      }
    }
  };
  render() {
    return <Toast ref={this.toastRef} text="Network is not available" />;
  }
}

export default NetInfo;
