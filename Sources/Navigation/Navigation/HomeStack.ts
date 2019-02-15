import { createStackNavigator } from "react-navigation";
import { Home } from "Screens";
import getSlideFromRightTransitionConfig from "./transitionConfig";

const HomeStack = createStackNavigator(
  {
    Home: Home
  },
  {
    transitionConfig: getSlideFromRightTransitionConfig,
    initialRouteName: "Home"
  }
);

export default HomeStack;
