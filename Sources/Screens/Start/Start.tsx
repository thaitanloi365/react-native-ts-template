import React from 'react'
import { Navigator } from '@Navigation'
import { SplashScreen } from '@Components'
import { Authentication } from '@Services'
import RNSplashScreen from 'react-native-splash-screen'

class Start extends React.Component {
  private timeoutHandler: any

  private start = async () => {
    const success = await Authentication.createSession()
    RNSplashScreen.hide()
    if (success) {
      this.timeoutHandler = setTimeout(() => Navigator.navTo('Home'), 500)
    } else {
      this.timeoutHandler = setTimeout(() => Navigator.navTo('Authentication'), 500)
    }
  }

  componentWillMount() {
    this.start()
  }

  componentWillUnmount() {
    if (this.timeoutHandler) {
      clearTimeout(this.timeoutHandler)
      this.timeoutHandler = 0
    }
  }

  render() {
    return <SplashScreen />
  }
}

export default Start
