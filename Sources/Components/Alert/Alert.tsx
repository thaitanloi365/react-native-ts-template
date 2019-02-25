import React from "react";
import {
  View,
  StyleSheet,
  Platform,
  Keyboard,
  Animated,
  Dimensions
} from "react-native";
import { AlertProps } from "Types";
import Assets from "Assets";
import Overlay from "../Overlay/Overlay";
import Text from "../Text/Text";
import Button from "../Button/Button";

const { width, height } = Dimensions.get("window");

type Props = AlertProps;

type State = {
  content: string;
  confirm: boolean;
  animatedValue: Animated.Value;
};

class Alert extends React.Component<Props, State> {
  private onClose?: () => void;
  private onOk?: () => void;
  private onCancel?: () => void;

  private overlayRef = React.createRef<Overlay>();

  static defaultProps: Props = {
    positiveButtonText: "OK",
    negativeButtonText: "Cancel",
    animationReverse: true,
    animationType: "scale"
  };

  constructor(props: Props) {
    super(props);
    this.state = {
      content: "Are you sure?",
      confirm: false,
      animatedValue: new Animated.Value(0)
    };
  }

  show = (msg: string, onClose?: () => void) => {
    Keyboard.dismiss();
    this.setState({ content: msg, confirm: false }, () => {
      if (this.overlayRef.current) {
        this.overlayRef.current.show(() => {
          this.onClose = onClose;
          if (this.props.animationType !== "none") {
            Animated.timing(this.state.animatedValue, {
              toValue: 1,
              useNativeDriver: true,
              duration: 250
            }).start();
          }
        });
      }
    });
  };

  confirm = (msg: string, onOk?: () => void, onCancel?: () => void) => {
    Keyboard.dismiss();
    this.setState({ content: msg, confirm: true }, () => {
      if (this.overlayRef.current) {
        this.overlayRef.current.show(() => {
          this.onOk = onOk;
          this.onCancel = onCancel;
          if (this.props.animationType !== "none") {
            Animated.timing(this.state.animatedValue, {
              toValue: 1,
              useNativeDriver: true,
              duration: 250
            }).start();
          }
        });
      }
    });
  };

  private hide = (onHide?: () => void) => {
    const { animationReverse, animationType } = this.props;
    if (animationType === "none") {
      if (onHide) onHide();
    } else {
      if (animationReverse) {
        Animated.timing(this.state.animatedValue, {
          toValue: 0,
          useNativeDriver: true,
          duration: 200
        }).start(onHide);
      } else {
        if (onHide) onHide();
      }
    }
  };

  private onOkPressed = () => {
    this.hide(() => {
      if (this.overlayRef.current) {
        this.overlayRef.current.hide(() => {
          if (this.state.confirm) {
            if (this.onOk) this.onOk();
          } else {
            if (this.onClose) this.onClose();
          }
        });
      }
    });
  };

  private onCancelPressed = () => {
    this.hide(() => {
      if (this.overlayRef.current) {
        this.overlayRef.current.hide(() => {
          if (this.onCancel) this.onCancel();
        });
      }
    });
  };

  private getAnimationStyle() {
    const { animatedValue } = this.state;
    const { animationType } = this.props;

    let animationStyle = {};
    switch (animationType) {
      case "fade": {
        animationStyle = {
          opacity: animatedValue
        };
        break;
      }

      case "scale": {
        const scale = animatedValue.interpolate({
          inputRange: [0, 0.5, 1],
          outputRange: [0, 0.7, 1],
          extrapolate: "clamp"
        });
        animationStyle = {
          opacity: animatedValue,
          transform: [{ scale }]
        };
        break;
      }

      case "slideFromLeft": {
        const translateX = animatedValue.interpolate({
          inputRange: [0, 0.5, 1],
          outputRange: [-width, -width / 4, 0],
          extrapolate: "clamp"
        });
        animationStyle = {
          opacity: animatedValue,
          transform: [{ translateX }]
        };
        break;
      }
      case "slideFromRight": {
        const translateX = animatedValue.interpolate({
          inputRange: [0, 0.5, 1],
          outputRange: [width, width / 4, 0],
          extrapolate: "clamp"
        });
        animationStyle = {
          opacity: animatedValue,
          transform: [{ translateX }]
        };
        break;
      }
      case "slideFromBottom": {
        const translateY = animatedValue.interpolate({
          inputRange: [0, 0.5, 1],
          outputRange: [height, height / 4, 0],
          extrapolate: "clamp"
        });
        animationStyle = {
          opacity: animatedValue,
          transform: [{ translateY }]
        };
        break;
      }
      case "slideFromTop": {
        const translateY = animatedValue.interpolate({
          inputRange: [0, 0.5, 1],
          outputRange: [-height, -height / 4, 0],
          extrapolate: "clamp"
        });
        const opacity = animatedValue.interpolate({
          inputRange: [0, 0.5, 1],
          outputRange: [0, 0.7, 1],
          extrapolate: "clamp"
        });
        animationStyle = {
          opacity,
          transform: [{ translateY }]
        };
        break;
      }
      default:
        break;
    }

    return animationStyle;
  }

  render() {
    const { content, confirm } = this.state;
    const {
      positiveButtonText,
      positiveButtonStyle,
      negativeButtonStyle,
      negativeButtonText,
      overlayAnimated = true
    } = this.props;

    let animationStyle = this.getAnimationStyle();

    const justifyContent = confirm ? "space-around" : "center";
    return (
      <Overlay ref={this.overlayRef} animated={overlayAnimated}>
        <Animated.View style={[styles.container, animationStyle]}>
          <Text style={styles.content} text={content} />
          <View style={[styles.buttonContainer, { justifyContent }]}>
            <Button
              onPress={this.onOkPressed}
              style={[styles.okButton, positiveButtonStyle]}
              text={positiveButtonText}
              textStyle={styles.okButtonText}
            />
            {confirm && (
              <Button
                onPress={this.onCancelPressed}
                style={[styles.cancelButton, negativeButtonStyle]}
                text={negativeButtonText}
                textStyle={styles.cancelButtonText}
              />
            )}
          </View>
        </Animated.View>
      </Overlay>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    ...Platform.select({
      android: {
        elevation: 4
      },
      ios: {
        shadowColor: "#000000",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 6
      }
    }),
    borderRadius: 14,
    maxWidth: "90%"
  },
  content: {
    marginTop: 16,
    marginHorizontal: 30,
    marginBottom: 37,
    fontSize: 18,
    fontFamily: Assets.fontFamily.medium,
    textAlign: "center",
    color: Assets.colors.slate
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10
  },
  okButton: {
    marginHorizontal: 20,
    height: 46,
    width: 112,
    borderRadius: 23,
    padding: 0,
    backgroundColor: Assets.colors.primary
  },
  okButtonText: {
    fontSize: 18,
    fontFamily: Assets.fontFamily.medium,
    color: "white",
    textAlign: "center"
  },
  cancelButton: {
    marginHorizontal: 20,
    height: 46,
    width: 112,
    borderRadius: 23,
    padding: 0,
    backgroundColor: Assets.colors.blueGrey
  },
  cancelButtonText: {
    fontSize: 18,
    fontFamily: Assets.fontFamily.medium,
    color: "white"
  }
});

export default Alert;
