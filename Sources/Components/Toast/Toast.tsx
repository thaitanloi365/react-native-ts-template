import React from "react";
import { StyleSheet, Platform, View } from "react-native";
import { ToastProps } from "Types";
import { Device, LayoutAnimations } from "Utils";
import Assets from "Assets";
import Text from "../Text/Text";

type Props = ToastProps;
type State = {
  visible: boolean;
  height: number;
};

const statusBarHeight = Device.getStatusBarHeight(true);

class Toast extends React.Component<Props, State> {
  static defaultProps: Props = {
    backgroundColor: Assets.colors.primary,
    text: "Network is not available"
  };
  constructor(props: Props) {
    super(props);
    this.state = {
      visible: false,
      height: 0
    };
    LayoutAnimations.enableAndroidLayoutAnimation();
  }

  show = () => {
    LayoutAnimations.setLayoutAnimation(LayoutAnimations.PresetEaseInOut);
    this.setState({ height: 60 });
    console.log("show");
  };

  hide = () => {
    LayoutAnimations.setLayoutAnimation(LayoutAnimations.PresetEaseInOut);
    this.setState({ height: 0 });
    console.log("hide");
  };

  render() {
    const { text, backgroundColor, textStyle } = this.props;
    const { height } = this.state;
    console.log({ height });
    return (
      <View style={[styles.container, { height }]}>
        <View style={[styles.textContainer, { backgroundColor }]}>
          <Text text={text} style={[styles.text, textStyle]} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: statusBarHeight,
    left: 0,
    right: 0,
    height: 0,
    ...Platform.select({
      ios: {
        zIndex: 4
      },
      android: {
        elevation: 4
      }
    })
  },
  textContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10
  },
  text: {
    fontSize: 15,
    fontFamily: Assets.fontFamily.roman,
    color: "white"
  }
});

export default Toast;
