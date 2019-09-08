import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Header, Button } from 'react-native-base'
import { Navigator } from '@Navigation'
class Login extends React.Component {
  render() {
    return (
      <View style={StyleSheet.absoluteFill}>
        <Header title="Login Page" />
        <Button
          text="Show toast"
          onPress={() => Navigator.showToast('This is a header', 'This is a message', 'Error')}
        />
        <Button
          text="Show alert confirm"
          onPress={() => Navigator.showAlert('', 'This is a message', () => {}, () => {})}
        />
        <Button text="Show alert" onPress={() => Navigator.showAlert('', 'This is a message')} />
        <Button
          text="Show loading"
          onPress={() => {
            Navigator.showLoading()
            setTimeout(() => Navigator.hideLoading(), 3000)
          }}
        />
      </View>
    )
  }
}

export default Login
