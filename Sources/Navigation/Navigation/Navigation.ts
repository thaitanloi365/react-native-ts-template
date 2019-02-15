import { createStackNavigator, createAppContainer } from "react-navigation";
import { Start } from "Screens";
import AuthenticationStack from "./AuthenticationStack";
import HomeStack from "./HomeStack";
import getSlideFromRightTransitionConfig from "./transitionConfig";

const RootStack = createStackNavigator(
  {
    Authentication: AuthenticationStack,
    Home: HomeStack,
    Start: Start
  },
  {
    initialRouteName: "Start",
    transitionConfig: getSlideFromRightTransitionConfig,
    headerMode: "none",
    defaultNavigationOptions: {
      swipeEnabled: false,
      gesturesEnabled: false,
      header: null
    }
  }
);

const AppContainer = createAppContainer(RootStack);

export default AppContainer;
