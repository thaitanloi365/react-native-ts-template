import React from "react";
import Button from "../Button/Button";
import { IconProps } from "Types";
import { Image, View } from "react-native";

type Props = IconProps;
const Icon: React.SFC<Props> = props => {
  const {
    style,
    iconSource,
    iconStyle,
    onPress,
    hitSlop,
    iconContainerStyle,
    size = 24
  } = props;

  const containerStyle = {
    width: size * 2,
    height: size * 2,
    borderRadius: size,
    backgroundColor: "transparent"
  };
  return (
    <Button onPress={onPress} style={[containerStyle, style]} hitSlop={hitSlop}>
      <View style={[{ padding: 5 }, iconContainerStyle]}>
        <Image style={iconStyle} source={iconSource} />
      </View>
    </Button>
  );
};

export default Icon;
