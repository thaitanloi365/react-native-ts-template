import React from "react";
import { View, StyleSheet, Animated } from "react-native";
import Text from "../Text/Text";
import { LayoutAnimations } from "Utils";

type Props = {
  scrollY: Animated.Value;
  height: number;
  onRefresh?: () => Promise<boolean>;
};

type State = {
  refreshing: boolean;
};
class RefreshControl extends React.Component<Props, State> {
  state: State = {
    refreshing: false
  };

  componentDidMount() {
    if (this.props.scrollY) {
      this.props.scrollY.addListener(this.handleScroll);
    }
  }

  componentWillUnmount() {
    if (this.props.scrollY) {
      this.props.scrollY.removeAllListeners();
    }
  }

  private handleScroll = (state: { value: number }) => {
    if (this.state.refreshing) return;
    const { height, onRefresh } = this.props;
    const { value } = state;
    if (value < 0 && -value > height) {
      console.log("refreshing");
      this.setState({ refreshing: true }, () => {
        if (onRefresh) {
          onRefresh()
            .then(() => {
              LayoutAnimations.setLayoutAnimation(
                LayoutAnimations.PresetLinear
              );
              this.setState({ refreshing: false });
            })
            .catch(() => {
              LayoutAnimations.setLayoutAnimation(
                LayoutAnimations.PresetLinear
              );
              this.setState({ refreshing: false });
            });
        }
      });
    }
  };

  render() {
    const { height } = this.props;
    const { refreshing } = this.state;
    console.log({ refreshing });
    const marginTop = refreshing ? 0 : -height;
    return (
      <Animated.View style={{ height, marginTop, backgroundColor: "blue" }}>
        {/* <View style={styles.container}> */}
        <Text style={{ color: "black", fontSize: 16 }}>
          {this.state.refreshing ? "Release to refresh" : "Pull to refresh"}
        </Text>
        {/* </View> */}
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row"
  }
});
export default RefreshControl;
