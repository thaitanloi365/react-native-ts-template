import React from "react";
import { View, StyleSheet, FlexStyle } from "react-native";
import { ColumnProps } from "Types";

const Col: React.SFC<ColumnProps> = props => {
  const { children, flex, style } = props;
  const flexStyle: FlexStyle = {
    flexDirection: "column",
    flex: flex ? flex : style && StyleSheet.flatten(style).width ? 0 : 1
  };
  return <View style={[styles.default, style, flexStyle]}>{children}</View>;
};

const styles = StyleSheet.create({
  default: {
    justifyContent: "center"
  }
});
export default Col;
