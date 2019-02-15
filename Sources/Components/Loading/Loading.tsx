import React from "react";
import { ActivityIndicator, View, Platform, StyleSheet } from "react-native";
import Overlay from "../Overlay/Overlay";
import { Text } from "Components";
import Assets from "Assets";

type Props = {};
type State = {
  msg?: string;
};

class Loading extends React.Component<Props, State> {
  private overlayRef = React.createRef<Overlay>();
  state: State = { msg: "Loading" };
  show = (msg?: string) => {
    this.setState({ msg }, () => {
      if (this.overlayRef.current) {
        this.overlayRef.current.show();
      }
    });
  };

  hide = (onClose?: () => void) => {
    if (this.overlayRef.current) {
      this.overlayRef.current.hide(onClose);
    }
  };

  render() {
    const { msg = "Loading" } = this.state;
    return (
      <Overlay ref={this.overlayRef} animated duration={250}>
        <View style={styles.container}>
          <ActivityIndicator size="large" color={Assets.colors.mossyGreen} />
          <Text style={styles.text} text={msg} />
        </View>
      </Overlay>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 5,
    backgroundColor: "white",
    ...Platform.select({
      android: {
        elevation: 2
      },
      ios: {
        shadowColor: "#000000",
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.2,
        shadowRadius: 9
      }
    })
  },
  text: {
    marginLeft: 12,
    textAlign: "left",
    fontSize: 18,
    fontFamily: Assets.fontFamily.medium,
    color: Assets.colors.slate
  }
});

export default Loading;
