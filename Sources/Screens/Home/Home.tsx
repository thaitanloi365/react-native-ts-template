import React from "react";
import { View, StyleSheet } from "react-native";
import { Header, Button } from "rn-components";
import { Navigator } from "@Navigation";

class Home extends React.Component {
  render() {
    return (
      <View style={StyleSheet.absoluteFill}>
        <Header title="Login Page" />
      </View>
    );
  }
}

export default Home;
