import React from "react";
import { IconProps, Omit } from "Types";
import Icon from "../Icon/Icon";
import Assets from "Assets";

type Props = Omit<IconProps, "iconSource">;
const RightHeaderButton: React.SFC<Props> = props => {
  return (
    <Icon
      iconSource={Assets.images.back}
      hitSlop={{ left: 20, right: 10, top: 5, bottom: 5 }}
      style={{ alignSelf: "flex-end", marginRight: 0 }}
      {...props}
    />
  );
};

export default RightHeaderButton;
