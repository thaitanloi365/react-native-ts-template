import {
  TextProps as RNTextProps,
  TouchableOpacityProps,
  StyleProp,
  ViewStyle,
  ViewProps,
  TouchableNativeFeedbackProps,
  BackgroundPropType,
  TextStyle,
  ScrollViewProps as RNScrollViewProps,
  TextInputProps as RNTextInputProps,
  ModalProps as RNModalProps,
  StatusBarProps as RNStatusBarProps,
  ImageSourcePropType,
  ImageStyle,
  Animated
} from "react-native";
import {
  DrawerItemsProps as RNDrawerProps,
  NavigationScreenProp,
  NavigationState
} from "react-navigation";

export type NavigationProps = NavigationScreenProp<NavigationState>;
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export type Point = {
  x: number;
  y: number;
};

export type AnimationType =
  | "slideFromLeft"
  | "slideFromRight"
  | "slideFromBottom"
  | "slideFromTop"
  | "fade"
  | "scale"
  | "none";

export type TouchableProps = TouchableNativeFeedbackProps &
  TouchableOpacityProps;

export type AlertProps = ViewProps & {
  HeaderComponent?: () => JSX.Element;
  overlayAnimated?: boolean;
  animationType?: AnimationType;
  animationReverse?: boolean;
  positiveButtonText?: string;
  positiveButtonStyle?: StyleProp<ViewStyle>;
  negativeButtonText?: string;
  negativeButtonStyle?: StyleProp<ViewStyle>;
};

export type ButtonProps = TouchableProps & {
  text?: React.ReactText;
  textStyle?: StyleProp<TextStyle>;
  TouchableComponent?: React.ComponentClass<any>;
  ViewComponent?: React.ComponentClass<any>;
  buttonStyle?: StyleProp<ViewStyle>;
  linearProps?: {
    start?: Point;
    end?: Point;
    locations?: number[];
    colors?: string[];
  };
  rasied?: boolean;
  boundedRipple?: boolean;
};

export type TextProps = RNTextProps & {
  text?: React.ReactText;
};

export type ToastProps = ViewProps & {
  text: string;
  textStyle?: StyleProp<TextStyle>;
  backgroundColor?: string;
  height?: number;
};

export type OverlayProps = ViewProps & {
  onPressOutside?: () => void;
  closeOnPressOutside?: boolean;
  backgroundColor?: string;
  animated?: boolean;
  duration?: number;
  containerStyle?: StyleProp<ViewStyle>;
};

export type GridChildProps = RowProps | ColumnProps;

export type RowProps = ViewProps & {
  flex?: number;
  children?: React.ReactElement<GridChildProps>[] | React.ReactNode;
};

export type ColumnProps = ViewProps & {
  flex?: number;
  children?: React.ReactElement<GridChildProps>[] | React.ReactNode;
};

export type GridProps = ViewProps & {
  children: React.ReactElement<GridChildProps>[];
};

export type KeyboardSpacerProps = ViewProps & {
  onShow?: (spacer: number) => void;
  onHide?: () => void;
  keyboardTopOffset?: number;
};

export type ScrollViewProps = RNScrollViewProps & {
  keyboardTopOffset?: number;
};

type TextInputExtraProps = Omit<RNTextInputProps, "style"> & ViewProps;
export type TextInputProps = TextInputExtraProps & {
  underlineColor?: string;
  underlineWidth?: number;
  inputContainerStyle?: StyleProp<TextStyle>;
  inputStyle?: StyleProp<TextStyle>;
  helperText?: string;
  helperStyle?: StyleProp<TextStyle>;
  LeftComponent?: React.ReactElement | React.FunctionComponent;
  RightComponent?: React.ReactElement | React.FunctionComponent;
};

type CodeInputExtraProps = Pick<
  RNTextInputProps,
  "returnKeyType" | "secureTextEntry" | "keyboardType"
>;
export type CodeInputProps = CodeInputExtraProps & {
  style?: StyleProp<ViewStyle>;
  fontSize?: number;
  fontFamily?: string;
  activeBorderColor?: string;
  activeBorderWidth?: number;
  deactiveBorderColor?: string;
  deactiveBorderWidth?: number;
  numberInputs: number;
  spacing?: number;
  width?: number;
  height?: number;
  inputBorderRadius?: number;
  onTextChanged?: (text: string) => void;
};

export type IconProps = ViewProps & {
  size?: number;
  iconSource: ImageSourcePropType;
  iconContainerStyle?: StyleProp<ViewStyle>;
  iconStyle?: StyleProp<ImageStyle>;
  onPress?: () => void;
};

export type CardProps = ViewProps;

export type BottomSheetBaseProps = {
  height?: number;
  duration?: number;
  closeOnSwipeDown?: boolean;
  closeOnPressOutside?: boolean;
  bottomSheetStyle?: StyleProp<ViewStyle>;
};

export type ModalProps = OverlayProps & {
  closeOnBackAndroid?: boolean;
};

export type MenuItem = {
  text: string;
  key?: string;
  data?: any;
};

export type MenuProps = ViewProps & {
  items: MenuItem[];
  buttonStyle?: StyleProp<ViewStyle>;
  buttonTextStyle?: StyleProp<TextStyle>;
  menuStyle?: StyleProp<ViewStyle>;
  menuItemStyle?: StyleProp<ViewStyle>;
  menuItemTextStyle?: StyleProp<TextStyle>;
  onItemSelected?: (item: MenuItem, index: number) => void;
  initialText?: string;
};

export type StatusBarProps = RNStatusBarProps & {
  // valid on iOS & Android transluent
  style?: StyleProp<ViewStyle>;
};

export type HeaderProps = ViewProps & {
  statusBarVisible?: boolean;
  statusBarProps?: StatusBarProps;
  title: string;
  titleStyle?: StyleProp<TextStyle>;
  titleContainerStyle?: StyleProp<ViewStyle>;
  LeftComponent?: React.ReactElement | React.FunctionComponent;
  leftContainerStyle?: StyleProp<ViewStyle>;
  RightComponent?: React.ReactElement | React.FunctionComponent;
  rightContainerStyle?: StyleProp<ViewStyle>;
  backgroundColor?: string;
};

export type InputGroupProps = ViewProps & {
  onInputFocus?: (index: number) => void;
  onInputEndEditing?: (index: number) => void;
  onInputSubmit?: () => void;
  spacing?: number;
};

export type SectionProps = ViewProps & {
  text: string;
  textStyle?: StyleProp<TextStyle>;
};

export type DrawerProps = RNDrawerProps & {
  drawerOpenProgress?: Animated.Value;
  overlayColor?: string;
  drawerType?: "front" | "back";
  useNativeAnimations?: boolean;
  contentContainerStyle?: StyleProp<ViewStyle>;
};

export type DrawerHeaderProps = ViewProps & {
  imageContainerStyle?: ViewStyle;
  imageSource?: ImageSourcePropType;
  imageStyle?: StyleProp<ImageStyle>;
  drawerOpenProgress?: Animated.Value;
};

export type DrawerItemProps = ViewProps & {
  buttonStyle?: StyleProp<ViewStyle>;
  leftIconSource?: ImageSourcePropType;
  leftIconStyle?: StyleProp<ImageStyle>;
  text: string;
  textStyle?: StyleProp<TextStyle>;
  rightIconSource?: ImageSourcePropType;
  rightIconStyle?: StyleProp<ImageStyle>;
  onPress?: () => void;
  hiddenDivider?: boolean;
};
