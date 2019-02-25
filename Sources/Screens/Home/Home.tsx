import React from "react";
import { View } from "react-native";
import { StyleSheet, Header, RightHeaderButton, Menu } from "Components";
import { Strings } from "Localization";

type Props = {};
type State = {
  visible: boolean;
};
class Home extends React.Component<Props, State> {
  state = {
    visible: false
  };
  render() {
    return (
      <View style={StyleSheet.absoluteFill}>
        <Header
          title={Strings.home.home}
          RightComponent={
            <RightHeaderButton onPress={() => console.log("press")} />
          }
        />
        <Menu
          items={[
            { text: "test 1" },
            { text: "test 2" },
            { text: "test 3" },
            { text: "test 4" }
          ]}
        />
      </View>
    );
  }
}

export default Home;
