import { createStackNavigator } from 'react-navigation-stack'
import { Login } from '@Screens'
import getSlideFromRightTransitionConfig from './transitionConfig'

const AuthenticationStack = createStackNavigator(
  {
    Login: Login
  },
  {
    transitionConfig: getSlideFromRightTransitionConfig,
    initialRouteName: 'Login',
    defaultNavigationOptions: {
      header: null
    }
  }
)

export default AuthenticationStack
