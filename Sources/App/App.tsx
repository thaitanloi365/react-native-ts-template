import React from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { configStore } from '@ReduxManager'
import { Navigator, AppContainer } from '@Navigation'
import { StatusBarStyle, StatusBar as RN } from 'react-native'
import { ToastType } from '@Types'
import { Loading, Alert, Toast, NetInfo } from 'react-native-base'

const { store, persistor } = configStore()

export class App extends React.Component {
  private loadingRef = React.createRef<Loading>()
  private alertRef = React.createRef<Alert>()
  private toastRef = React.createRef<Toast>()

  showLoading = (msg?: string) => {
    if (this.loadingRef.current) this.loadingRef.current.show(msg)
  }

  hideLoading = (onClose?: () => void) => {
    if (this.loadingRef.current) this.loadingRef.current.hide(onClose)
  }

  showAlert = (
    title: string,
    msg: string,
    onOk?: () => void,
    onCancel?: () => void,
    okButtonText?: string,
    cancelButtonText?: string
  ) => {
    if (this.alertRef.current) this.alertRef.current.show(title, msg, onOk, onCancel, okButtonText, cancelButtonText)
  }

  showToast = (
    title: string,
    message: string,
    type: ToastType = 'Error',
    duration: number = 4000,
    onShow?: () => void,
    onClose?: () => void,
    isDisableInteraction = false,
    activeStatusBarType: StatusBarStyle = 'light-content',
    deactiveStatusBarType: StatusBarStyle = 'default'
  ) => {
    if (this.toastRef.current) {
      // @ts-ignore
      const backupProps = RN._currentValues
      let _deactiveStatusBarType = deactiveStatusBarType
      if (backupProps && backupProps.barStyle) {
        const { value } = backupProps.barStyle
        if (value) {
          _deactiveStatusBarType = value
        }
      }
      this.toastRef.current.show(
        title,
        message,
        type,
        duration,
        onShow,
        onClose,
        isDisableInteraction,
        activeStatusBarType,
        _deactiveStatusBarType
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
      showAlert: this.showAlert,
      showToast: this.showToast,
      hideToast: this.hideToast
    }
  }

  private setRoot = (r: any) => {
    Navigator.setRoot(r)
  }

  render() {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <AppContainer ref={this.setRoot} screenProps={this.getScreenProps()} />
          <Toast ref={this.toastRef} />
          <Loading ref={this.loadingRef} />
          <Alert ref={this.alertRef} />
          <NetInfo />
        </PersistGate>
      </Provider>
    )
  }
}

export default App
