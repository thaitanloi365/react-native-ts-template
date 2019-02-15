import React from "react";
import { HeaderProps } from "Types";
import { View, ViewStyle, TextStyle } from "react-native";
import { Device } from "Utils";
import StatusBar from "../StatusBar/StatusBar";
import Text from "../Text/Text";
import Assets from "Assets";

type Props = HeaderProps;
const headerHeight = Device.getHeaderHeight();
const Header: React.SFC<Props> = props => {
  const {
    style,
    title,
    statusBarProps,
    statusBarVisible,
    LeftComponent,
    RightComponent,
    backgroundColor,
    titleContainerStyle,
    titleStyle,
    leftContainerStyle,
    rightContainerStyle
  } = props;

  const defaultStyle: ViewStyle = {
    backgroundColor,
    height: headerHeight,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  };
  const textStyle: TextStyle = {
    fontSize: 18,
    fontFamily: Assets.fontFamily.medium,
    color: "white"
  };

  const titleContainer: ViewStyle = {
    flex: 3,
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center"
  };

  const buttonCornor: ViewStyle = {
    flex: 1,
    alignSelf: "stretch",
    justifyContent: "center"
  };
  return (
    <View>
      {statusBarVisible && <StatusBar {...statusBarProps} />}
      <View style={[defaultStyle, style]}>
        <View style={[buttonCornor, { paddingLeft: 10 }, leftContainerStyle]}>
          {LeftComponent && LeftComponent()}
        </View>
        <View style={[titleContainer, titleContainerStyle]}>
          <Text style={[textStyle, titleStyle]} text={title} />
        </View>
        <View style={[buttonCornor, { paddingRight: 10 }, rightContainerStyle]}>
          {RightComponent && RightComponent()}
        </View>
      </View>
    </View>
  );
};

Header.defaultProps = {
  statusBarProps: {
    translucent: true,
    backgroundColor: Assets.colors.primaryDark,
    barStyle: "light-content"
  },
  backgroundColor: Assets.colors.primary
};

export default Header;
