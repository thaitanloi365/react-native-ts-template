import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { configStore } from "./Store";
import { AppContainer } from "../RootNavigation/RootNavigation";
import { SplashScreen, NetInfo, Loading, Alert } from "../Components";
import { Navigation } from "../Services";

const { store, persistor } = configStore();

export default class App extends React.Component {
  private loading: Loading | null = null;
  private alert: Alert | null = null;

  showLoading = () => {
    if (this.loading) this.loading.show();
  };

  hideLoading = (onClose?: () => void) => {
    if (this.loading) this.loading.hide(onClose);
  };

  alertShow = (msg: string, onClose?: () => void) => {
    if (this.alert) this.alert.show(msg, onClose);
  };

  alertConfirm = (msg: string, onOk?: () => void, onCancel?: () => void) => {
    if (this.alert) this.alert.confirm(msg, onOk, onCancel);
  };

  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={<SplashScreen />} persistor={persistor}>
          <NetInfo />
          <AppContainer
            ref={r => {
              Navigation.setRoot(r);
            }}
            screenProps={{
              showLoading: this.showLoading,
              hideLoading: this.hideLoading,
              alertShow: this.alertShow,
              alertConfirm: this.alertConfirm
            }}
          />
          <Loading
            ref={r => {
              this.loading = r;
            }}
          />
          <Alert
            ref={r => {
              this.alert = r;
            }}
          />
        </PersistGate>
      </Provider>
    );
  }
}
