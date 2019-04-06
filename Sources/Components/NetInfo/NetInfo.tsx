import React from 'react'
import { NetInfo as RNNetInfo, Platform, StyleSheet } from 'react-native'
import { Strings } from '@Localization'
import Toast from '../Toast/Toast'

type Props = {}
type State = {}

class NetInfo extends React.Component<Props, State> {
  private toastRef = React.createRef<Toast>()

  componentDidMount() {
    RNNetInfo.isConnected.addEventListener('connectionChange', this.handleConnectionChange)
    if (Platform.OS == 'android') {
      RNNetInfo.isConnected.fetch().then(isConnected => {
        this.handleConnectionChange(isConnected)
      })
    }
  }

  componentWillUnmount() {
    RNNetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectionChange)
  }

  private handleConnectionChange = (isConnected: boolean) => {
    if (this.toastRef.current) {
      if (isConnected) {
        this.toastRef.current.hide()
      } else {
        this.toastRef.current.show(Strings.networkError, Strings.networkNotAvailable, 'Error')
      }
    }
  }

  render() {
    return <Toast ref={this.toastRef} style={styles.container} />
  }
}

const styles = StyleSheet.create({
  container: {
    ...Platform.select({
      android: { elevation: 6 },
      ios: { zIndex: 6 },
    }),
  },
})
export default NetInfo
