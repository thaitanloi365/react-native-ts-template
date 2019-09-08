import React from 'react'
import { View } from 'react-native'
import { Navigator } from '@Navigation'
import { Authentication } from '@Services'
import { StyleSheet, Text } from 'react-native-base'
import RNSplashScreen from 'react-native-splash-screen'

class Start extends React.Component {
  private timeoutHandler: any

  private start = () => {
    RNSplashScreen.hide()
    Authentication.createSession()
      .then(() => {
        this.timeoutHandler = setTimeout(() => Navigator.navTo('Home'), 500)
      })
      .catch(() => {
        this.timeoutHandler = setTimeout(() => Navigator.navTo('Authentication'), 500)
      })
  }

  componentWillUnmount() {
    if (this.timeoutHandler) {
      clearTimeout(this.timeoutHandler)
      this.timeoutHandler = null
    }
  }

  componentDidMount() {
    this.start()
  }

  render() {
    return (
      <View style={StyleSheet.absoluteFill}>
        <Text text="Splash screen" />
      </View>
    )
  }
}

export default Start
