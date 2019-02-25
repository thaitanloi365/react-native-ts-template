import React from "react";
import { Navigator } from "Navigation";
import { IconProps, Omit } from "Types";
import Icon from "../Icon/Icon";
import Assets from "Assets";

type Props = Omit<IconProps, "iconSource">;
const HamburgerButton: React.SFC<Props> = props => {
  const onToggleDrawer = () => Navigator.toggleDrawer();
  return (
    <Icon
      onPress={onToggleDrawer}
      hitSlop={{ left: 10, right: 20, top: 5, bottom: 5 }}
      iconSource={Assets.images.hamburger}
      style={{ alignItems: "flex-start", marginLeft: 0 }}
      {...props}
    />
  );
};
export default HamburgerButton;
