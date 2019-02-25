import React from "react";
import { View, Animated } from "react-native";
import { StyleSheet, BottomSheetBase, Header, InputGroup } from "Components";
import { Strings } from "Localization";
import { Navigator } from "Navigation";

type Props = {};
type State = {
  yValue: Animated.Value;
  refreshing: boolean;
};
class Dashboard extends React.Component<Props, State> {
  private bs = React.createRef<BottomSheetBase>();
  private inputGroup = React.createRef<InputGroup>();
  state: State = {
    yValue: new Animated.Value(0),
    refreshing: false
  };
  render() {
    return (
      <View style={StyleSheet.absoluteFill}>
        <Header title={Strings.home.dashboard} />
      </View>
    );
  }
}

export default Dashboard;
