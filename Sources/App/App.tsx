import React from 'react'
import RNSplashScreen from 'react-native-splash-screen'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { configStore } from '@ReduxManager'
import { Navigator, AppContainer } from '@Navigation'
import { NetInfo, Loading, Alert, CodePushUpdate, Toast } from '@Components'
import { StatusBarStyle } from 'react-native'
import { ToastType } from '@Types'

const { store, persistor } = configStore()

export class App extends React.Component {
  private loadingRef = React.createRef<Loading>()
  private alertRef = React.createRef<Alert>()
  private toastRef = React.createRef<Toast>()

  async componentDidMount() {
    if (__DEV__) {
      RNSplashScreen.hide()
    }
  }

  showLoading = (msg?: string) => {
    if (this.loadingRef.current) this.loadingRef.current.show(msg)
  }

  hideLoading = (onClose?: () => void) => {
    if (this.loadingRef.current) this.loadingRef.current.hide(onClose)
  }

  alertShow = (msg: string, onClose?: () => void) => {
    if (this.alertRef.current) this.alertRef.current.show(msg, onClose)
  }

  alertConfirm = (msg: string, onOk?: () => void, onCancel?: () => void) => {
    if (this.alertRef.current) this.alertRef.current.confirm(msg, onOk, onCancel)
  }

  showToast = (
    title: string,
    message: string,
    type: ToastType = 'Info',
    duration: number = 1000,
    activeStatusBarType: StatusBarStyle = 'light-content',
    deactiveStatusBarType: StatusBarStyle = 'dark-content'
  ) => {
    if (this.toastRef.current) {
      this.toastRef.current.show(
        title,
        message,
        type,
        duration,
        activeStatusBarType,
        deactiveStatusBarType
      )
    }
  }

  hideToast = () => {
    if (this.toastRef.current) {
      this.toastRef.current.hide()
    }
  }

  private getScreenProps() {
    return {
      showLoading: this.showLoading,
      hideLoading: this.hideLoading,
      alertShow: this.alertShow,
      alertConfirm: this.alertConfirm,
      showToast: this.showToast,
      hideToast: this.hideToast,
    }
  }

  private setRoot = (r: any) => {
    Navigator.setRoot(r)
  }

  // r => {
  //   Navigator.setRoot(r);
  // }

  render() {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <AppContainer ref={this.setRoot} screenProps={this.getScreenProps()} />
          <Toast ref={this.toastRef} />
          <Loading ref={this.loadingRef} />
          <Alert ref={this.alertRef} />
          <NetInfo />
          <CodePushUpdate />
        </PersistGate>
      </Provider>
    )
  }
}

export default App
