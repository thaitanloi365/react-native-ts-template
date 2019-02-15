import {
  LayoutAnimation,
  Platform,
  UIManager,
  LayoutAnimationConfig
} from "react-native";

type LayoutAnimationType =
  | "Linear"
  | "Spring"
  | "Keyboard"
  | "EaseInOut"
  | "Default";

function enableAndroidLayoutAnimation() {
  if (Platform.OS == "android") {
    UIManager.setLayoutAnimationEnabledExperimental &&
      UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

const Default: LayoutAnimationConfig = LayoutAnimation.Presets.linear;

const Linear: LayoutAnimationConfig = {
  duration: 200,
  create: {
    type: LayoutAnimation.Types.linear,
    property: LayoutAnimation.Properties.opacity
  },
  update: {
    type: LayoutAnimation.Types.easeInEaseOut
  }
};

const Spring: LayoutAnimationConfig = {
  duration: 250,
  create: {
    duration: 250,
    type: LayoutAnimation.Types.easeInEaseOut,
    property: LayoutAnimation.Properties.opacity
  },
  update: {
    type: LayoutAnimation.Types.spring,
    springDamping: 200
  }
};

const EaseInOut: LayoutAnimationConfig = {
  duration: 250,
  create: {
    duration: 250,
    type: LayoutAnimation.Types.easeInEaseOut,
    property: LayoutAnimation.Properties.opacity
  },
  update: {
    type: LayoutAnimation.Types.spring,
    springDamping: 200
  }
};

const Keyboard: LayoutAnimationConfig = {
  duration: 250,
  create: {
    duration: 250,
    type: LayoutAnimation.Types.keyboard,
    property: LayoutAnimation.Properties.opacity
  },
  update: {
    type: LayoutAnimation.Types.easeInEaseOut
  }
};

function setLayoutAnimation(
  config?: LayoutAnimationConfig,
  callback?: () => void
) {
  if (config) {
    LayoutAnimation.configureNext(config, callback);
  } else {
    LayoutAnimation.configureNext(Default, callback);
  }
}

const PresetEaseInOut = LayoutAnimation.Presets.easeInEaseOut;
const PresetLinear = LayoutAnimation.Presets.linear;
const PresetSpring = LayoutAnimation.Presets.spring;
export default {
  enableAndroidLayoutAnimation,
  setLayoutAnimation,
  Linear,
  Spring,
  Keyboard,
  EaseInOut,
  Default,
  PresetEaseInOut,
  PresetLinear,
  PresetSpring
};
