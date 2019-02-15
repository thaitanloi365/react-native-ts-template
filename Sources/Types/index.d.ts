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
  StatusBarProps as RNStatusBarProps
} from "react-native";

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export type Point = {
  x: number;
  y: number;
};

export type TouchableProps = TouchableNativeFeedbackProps &
  TouchableOpacityProps;

export type AlertProps = ViewProps & {
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
  inputStyle?: StyleProp<TextStyle>;
  helperText?: string;
  helperStyle?: StyleProp<TextStyle>;
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

export type StatusBarProps = RNStatusBarProps;

export type HeaderProps = ViewProps & {
  statusBarVisible?: boolean;
  statusBarProps?: StatusBarProps;
  title: string;
  titleStyle?: StyleProp<TextStyle>;
  titleContainerStyle?: StyleProp<ViewStyle>;
  LeftComponent?: () => JSX.Element;
  leftContainerStyle?: StyleProp<ViewStyle>;
  RightComponent?: () => JSX.Element;
  rightContainerStyle?: StyleProp<ViewStyle>;
  backgroundColor?: string;
};

export type InputGroupProps = ViewProps & {
  onInputFocus?: (index: number) => void;
  onInputEndEditing?: (index: number) => void;
  onInputSubmit?: () => void;
};
