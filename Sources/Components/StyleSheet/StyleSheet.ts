import {
  StyleSheet as RNStyleSheet,
  ViewStyle,
  TextStyle,
  ImageStyle,
  RegisteredStyle,
  Dimensions
} from "react-native";

const { width, height } = Dimensions.get("window");
const [shortDimension, longDimension] =
  width < height ? [width, height] : [height, width];

const _baseWidth = 375;
const _baseHeight = 812;
const hs = shortDimension / _baseWidth;
const vs = longDimension / _baseHeight;

type StyleProps = Partial<ViewStyle | TextStyle | ImageStyle>;
type StyleObject = { [className: string]: StyleProps };
function create(styles: StyleObject) {
  return RNStyleSheet.create(styles);
}

function flatten<T>(style?: RegisteredStyle<T>): T {
  return RNStyleSheet.flatten(style);
}

const absoluteFill = RNStyleSheet.absoluteFill;
const absoluteFillObject = RNStyleSheet.absoluteFillObject;
const hairlineWidth = RNStyleSheet.hairlineWidth;

export default {
  create,
  flatten,
  absoluteFill,
  absoluteFillObject,
  hairlineWidth,
  vs,
  hs
};
