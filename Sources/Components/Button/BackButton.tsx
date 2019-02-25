import React from "react";
import { Navigator } from "Navigation";
import { IconProps, Omit } from "Types";
import Icon from "../Icon/Icon";
import Assets from "Assets";

type Props = Omit<IconProps, "iconSource">;
const BackButton: React.SFC<Props> = props => {
  const onBack = () => Navigator.back();
  return (
    <Icon
      iconSource={Assets.images.back}
      hitSlop={{ left: 10, right: 20, top: 5, bottom: 5 }}
      style={{ alignItems: "flex-start", paddingLeft: 0 }}
      onPress={onBack}
      {...props}
    />
  );
};

export default BackButton;
