import {
  NavigationContainerComponent,
  NavigationActions,
  NavigationParams,
  StackActions,
  NavigationNavigateAction,
  DrawerActions,
} from 'react-navigation'
import { StatusBarStyle } from 'react-native'
import { ToastType } from '@Types'

export type RouteName = 'Start' | 'Authentication' | HomeStack

type HomeStack = 'Home' | 'Dashboard'

type AnimationType = 'slideFromLeft' | 'slideFromBottom'

type ParamsDefaultProps = {
  animationType?: AnimationType
  tabBarVisible: boolean
  swipeBackEnabled: boolean
  drawerLockMode: 'unlocked' | 'locked-open' | 'locked-closed'
}

type ParamsProps = NavigationParams & Partial<ParamsDefaultProps>

type NavigationContainer = NavigationContainerComponent | null

class Navigator {
  private static instance = new Navigator()
  private rootNavigator: NavigationContainer = null
  private drawerProps = null

  constructor() {
    if (Navigator.instance) {
      throw new Error('Error: Instantiation failed: Use Navigation.getInstance() instead of new.')
    }
    Navigator.instance = this
  }
  public static getInstance(): Navigator {
    return Navigator.instance
  }

  public setRoot = (rootNavigator: NavigationContainer | null) => {
    if (this.rootNavigator) return
    this.rootNavigator = rootNavigator
  }

  public navTo = (
    routeName: RouteName,
    params?: ParamsProps,
    action?: NavigationNavigateAction,
    key?: string
  ) => {
    if (this.rootNavigator) {
      this.rootNavigator.dispatch(NavigationActions.navigate({ routeName, params, action, key }))
    }
  }

  public setTabbar(forScreen: string, isVisible: boolean = true) {
    const params = { tabBarVisible: isVisible }
    if (this.rootNavigator) {
      this.rootNavigator.dispatch(NavigationActions.setParams({ params, key: forScreen }))
    }
  }

  public back = (key?: string | null) => {
    if (this.rootNavigator) {
      this.rootNavigator.dispatch(NavigationActions.back({ key }))
    }
  }

  public reset = (
    routeName: RouteName,
    params?: NavigationParams,
    action?: NavigationNavigateAction,
    key?: string
  ) => {
    if (this.rootNavigator) {
      this.rootNavigator.dispatch(
        StackActions.reset({
          index: 0,
          key: null,
          actions: [NavigationActions.navigate({ routeName, params, action, key })],
        })
      )
    }
  }

  public popToTop = (key?: RouteName, immediate?: boolean) => {
    if (this.rootNavigator) {
      this.rootNavigator.dispatch(StackActions.popToTop({ key, immediate }))
    }
  }

  public push = (
    routeName: RouteName,
    params?: NavigationParams,
    action?: NavigationNavigateAction,
    key?: string
  ) => {
    if (this.rootNavigator) {
      this.rootNavigator.dispatch(StackActions.push({ routeName, params, action, key }))
    }
  }

  public pop = (n?: number, immediate?: boolean) => {
    if (this.rootNavigator) {
      this.rootNavigator.dispatch(StackActions.pop({ n, immediate }))
    }
  }

  public closeDrawer() {
    if (this.rootNavigator) {
      this.rootNavigator.dispatch(DrawerActions.closeDrawer())
    }
  }

  public openDrawer() {
    if (this.rootNavigator) {
      this.rootNavigator.dispatch(DrawerActions.openDrawer())
    }
  }

  public toggleDrawer() {
    if (this.rootNavigator) {
      this.rootNavigator.dispatch(DrawerActions.toggleDrawer())
    }
  }

  public getScreenProps() {
    if (this.rootNavigator) {
      return this.rootNavigator.props.screenProps
    }
    return null
  }

  public showLoading(msg?: string) {
    if (this.rootNavigator) {
      const { showLoading } = this.rootNavigator.props.screenProps
      if (showLoading) showLoading(msg)
    }
  }

  public hideLoading(onClose?: () => void) {
    if (this.rootNavigator) {
      const { hideLoading } = this.rootNavigator.props.screenProps
      if (hideLoading) hideLoading(onClose)
    }
  }
  public alertShow = (msg: string, onClose?: () => void) => {
    if (this.rootNavigator) {
      const { alertShow } = this.rootNavigator.props.screenProps
      if (alertShow) alertShow(msg, onClose)
    }
  }

  public alertConfirm = (msg: string, onOk?: () => void, onCancel?: () => void) => {
    if (this.rootNavigator) {
      const { alertConfirm } = this.rootNavigator.props.screenProps
      if (alertConfirm) alertConfirm(msg, onOk, onCancel)
    }
  }

  public showToast = (
    title: string,
    message: string,
    type: ToastType = 'Info',
    duration: number = 1000,
    activeStatusBarType: StatusBarStyle = 'light-content',
    deactiveStatusBarType: StatusBarStyle = 'dark-content'
  ) => {
    if (this.rootNavigator) {
      const { showToast } = this.rootNavigator.props.screenProps
      if (showToast)
        showToast(title, message, type, duration, activeStatusBarType, deactiveStatusBarType)
    }
  }

  public hideToast = () => {
    if (this.rootNavigator) {
      const { hideToast } = this.rootNavigator.props.screenProps
      if (hideToast) hideToast()
    }
  }

  public setDrawer(drawerProps: any) {
    this.drawerProps = drawerProps
  }

  public getDrawerProps(): any {
    return this.drawerProps
  }
}

export default Navigator.getInstance()
