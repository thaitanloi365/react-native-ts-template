import React from "react";
import { View, StyleSheet, FlexStyle } from "react-native";
import { RowProps } from "Types";

const Row: React.SFC<RowProps> = props => {
  const { children, flex, style } = props;
  const flexStyle: FlexStyle = {
    flexDirection: "row",
    flex: flex ? flex : style && StyleSheet.flatten(style).height ? 0 : 1
  };
  return <View style={[styles.default, style, flexStyle]}>{children}</View>;
};

const styles = StyleSheet.create({
  default: {
    alignItems: "center"
  }
});
export default Row;
