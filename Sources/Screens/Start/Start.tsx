import React from "react";
import { View } from "react-native";
import { Navigator } from "@Navigation";
import { Authentication } from "@Services";
import RNSplashScreen from "react-native-splash-screen";
import { StyleSheet, Text } from "rn-components";

class Start extends React.Component {
  private timeoutHandler: any;

  private start = () => {
    RNSplashScreen.hide();
    Authentication.createSession()
      .then(() => {
        this.timeoutHandler = setTimeout(() => Navigator.navTo("Home"), 500);
      })
      .catch(() => {
        this.timeoutHandler = setTimeout(() => Navigator.navTo("Authentication"), 500);
      });
  };

  componentWillMount() {
    this.start();
  }

  componentWillUnmount() {
    if (this.timeoutHandler) {
      clearTimeout(this.timeoutHandler);
      this.timeoutHandler = null;
    }
  }

  render() {
    return (
      <View style={StyleSheet.absoluteFill}>
        <Text text="Splash screen" />
      </View>
    );
  }
}

export default Start;
