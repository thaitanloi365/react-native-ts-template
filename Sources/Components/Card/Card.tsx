import React from "react";
import Button from "../Button/Button";
import Text from "../Text/Text";
import { View, StyleSheet, Platform } from "react-native";
import { CardProps } from "Types";

type Props = CardProps;
const Card: React.SFC<Props> = props => {
  const { style } = props;
  return (
    <Button style={[styles.card, style]}>
      <View>
        <Text />
        <Text />
        <Text />
      </View>
    </Button>
  );
};

const styles = StyleSheet.create({
  card: {
    borderColor: "#989898",
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 5,
    backgroundColor: "blue",
    ...Platform.select({
      android: {
        elevation: 2
      },
      ios: {
        shadowColor: "#000000",
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.1,
        shadowRadius: 9
      }
    })
  }
});
export default Card;
