import React from "react";
import Text from "../Text/Text";
import { ButtonProps } from "Types";
import {
  StyleSheet,
  View,
  Platform,
  TouchableOpacity,
  TouchableNativeFeedback
} from "react-native";
import Assets from "Assets";

const isAndroid = Platform.OS === "android";
type Props = ButtonProps;
type State = {};
class Button extends React.Component<Props, State> {
  static defaultProps: Props = {
    TouchableComponent:
      Platform.OS === "android" ? TouchableNativeFeedback : TouchableOpacity,
    activeOpacity: 0.5,
    linearProps: {
      start: { x: 0, y: 0.5 },
      end: { x: 1, y: 0.5 },
      colors: [Assets.colors.primaryDark, Assets.colors.primary],
      locations: [0, 1]
    }
  };
  render() {
    const {
      style,
      buttonStyle,
      text,
      textStyle,
      rasied,
      TouchableComponent = TouchableOpacity,
      ViewComponent = View,
      linearProps,
      children,
      onLayout,
      ...other
    } = this.props;

    const hasBorder =
      (buttonStyle && StyleSheet.flatten(buttonStyle).borderRadius) ||
      (style && StyleSheet.flatten(style).borderRadius);
    const borderRadius =
      (buttonStyle && StyleSheet.flatten(buttonStyle).borderRadius) ||
      (style && StyleSheet.flatten(style).borderRadius) ||
      styles.button.borderRadius;

    if (isAndroid && hasBorder && !other.background) {
      if (Platform.Version >= 21) {
        other.background = TouchableNativeFeedback.Ripple(
          "ThemeAttrAndroid",
          true
        );
      } else {
        other.background = TouchableNativeFeedback.SelectableBackground();
      }
    }

    const linearGradientProps = ViewComponent === View ? {} : linearProps;
    const backgroundColor =
      (style && StyleSheet.flatten(style).backgroundColor) ||
      (buttonStyle && StyleSheet.flatten(buttonStyle).backgroundColor) ||
      styles.button.backgroundColor;
    const { activeOpacity, background, onPress, disabled, hitSlop } = other;

    const isFixedDimension =
      style &&
      StyleSheet.flatten(style).width &&
      StyleSheet.flatten(style).height;

    const fixedStyle = isFixedDimension ? styles.full : { padding: 8 };

    return (
      <View
        style={[rasied && styles.rasied, style, { borderRadius }]}
        hitSlop={hitSlop}
        onLayout={onLayout}
      >
        <TouchableComponent
          activeOpacity={activeOpacity}
          background={background}
          onPress={onPress}
          disabled={disabled}
        >
          <ViewComponent
            {...linearGradientProps}
            style={[
              styles.button,
              { backgroundColor, borderRadius },
              fixedStyle,
              buttonStyle
            ]}
          >
            {text && <Text text={text} style={textStyle} />}
            {children}
          </ViewComponent>
        </TouchableComponent>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  rasied: {
    backgroundColor: "#fff",
    ...Platform.select({
      android: {
        elevation: 2
      },
      default: {
        shadowColor: "rgba(0,0,0, .4)",
        shadowOffset: { height: 1, width: 1 },
        shadowOpacity: 1,
        shadowRadius: 1
      }
    })
  },
  button: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    backgroundColor: "#eee"
  },
  full: {
    width: "100%",
    height: "100%"
  }
});
export default Button;
