import React from 'react'
import {
  Image,
  Animated,
  Platform,
  StatusBarStyle,
  StatusBar,
  StyleSheet,
  PanResponder,
  PanResponderInstance,
  LayoutChangeEvent,
} from 'react-native'
import Text from '../Text/Text'
import Column from '../Layout/Column'
import Assets from '@Assets'
import { Device } from '@Utils'
import { ToastType, ToastProps } from '@Types'

type Props = ToastProps

type State = {
  type: ToastType
  title: string
  message: string
  animatedValue: Animated.Value
  activeStatusBarType: StatusBarStyle
  deactiveStatusBarType: StatusBarStyle
  duration: number
  showing: boolean
  animatedPan: Animated.ValueXY
  contentHeight: number
}

class Toast extends React.Component<Props, State> {
  private timoutHandler: any = null
  private panResponder?: PanResponderInstance

  constructor(props: Props) {
    super(props)
    this.createPanResponder()
  }

  state: State = {
    type: 'Error',
    title: 'Error title',
    message: 'Message of error',
    animatedValue: new Animated.Value(0),
    activeStatusBarType: 'light-content',
    deactiveStatusBarType: 'light-content',
    duration: 0,
    showing: false,
    animatedPan: new Animated.ValueXY(),
    contentHeight: 200,
  }

  static defaultProps: Props = {
    typeProps: {
      Warn: {
        source: Assets.images.toastWarn,
        color: Assets.colors.warn,
      },
      Error: {
        source: Assets.images.toastError,
        color: Assets.colors.error,
      },
      Info: {
        source: Assets.images.toastInfo,
        color: Assets.colors.info,
      },
      Success: {
        source: Assets.images.toastSuccess,
        color: Assets.colors.success,
      },
    },
    minmumHeightToClose: 20,
  }

  componentWillUnmount() {
    if (this.timoutHandler !== null) {
      clearTimeout(this.timoutHandler)
    }
  }

  show = (
    title: string,
    message: string,
    type: ToastType = 'Info',
    duration: number = 0,
    activeStatusBarType: StatusBarStyle = 'light-content',
    deactiveStatusBarType: StatusBarStyle = 'dark-content'
  ) => {
    this.setState(
      {
        title,
        message,
        showing: true,
        activeStatusBarType,
        deactiveStatusBarType,
        type,
        duration,
      },
      () => {
        StatusBar.setBarStyle(activeStatusBarType, true)
        if (duration) {
          this.timoutHandler = setTimeout(this.hide, duration)
        }
        Animated.spring(this.state.animatedValue, {
          toValue: 1,
          friction: 20,
          useNativeDriver: true,
          tension: 10,
        }).start()
      }
    )
  }

  hide = () => {
    if (!this.state.showing) return
    let { deactiveStatusBarType } = this.state
    //@ts-ignore
    const statusBarProps = StatusBar.prototype._defaultProps
    if (statusBarProps && statusBarProps.barStyle && statusBarProps.barStyle.value) {
      deactiveStatusBarType = statusBarProps.barStyle.value
    }
    StatusBar.setBarStyle(deactiveStatusBarType, false)
    Animated.spring(this.state.animatedValue, {
      toValue: 0,
      friction: 9,
      useNativeDriver: true,
    }).start(() => {
      this.setState({ showing: false })
    })
  }

  private createPanResponder() {
    const { animatedPan } = this.state
    const { minmumHeightToClose } = this.props
    const dy = animatedPan.y
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (e, gestureState) => {
        gestureState.dy > 0 ? null : Animated.event([null, { dy }])(e, gestureState)
      },
      onPanResponderRelease: (e, gestureState) => {
        console.log(gestureState.dy)
        if (Math.abs(gestureState.dy) > minmumHeightToClose) {
          this.hide()
        } else {
          Animated.spring(animatedPan, {
            toValue: { x: 0, y: 0 },
          }).start()
        }
      },
    })
  }

  private getAnimationStyle = () => {
    const { contentHeight, animatedValue } = this.state
    const translateY = animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [-contentHeight, 0],
    })

    return {
      transform: [{ translateY }],
    }
  }

  private onLayout = (e: LayoutChangeEvent) => {
    const { height } = e.nativeEvent.layout
    if (height !== this.state.contentHeight) {
      this.setState({ contentHeight: height })
    }
  }

  render() {
    const { type, title, message, animatedPan } = this.state
    const { style, typeProps } = this.props
    const typeProp = typeProps[type]
    const source = typeProp.source
    const color = typeProp.color
    const animationStyle = this.getAnimationStyle()
    const panStyle = {
      transform: this.state.animatedPan.getTranslateTransform(),
    }
    return (
      <Animated.View
        style={[styles.container, panStyle, { backgroundColor: color }, animationStyle, style]}
        {...this.panResponder!.panHandlers}
        onLayout={this.onLayout}
      >
        <Column style={{ padding: 8 }} flex={0} alignVertical="center">
          <Image source={source} />
        </Column>
        <Column flex={1}>
          <Text style={styles.title} text={title} />
          <Text style={styles.text} text={message} />
        </Column>
      </Animated.View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    flexDirection: 'row',
    paddingTop: Device.getStatusBarHeight(true),
    paddingBottom: 10,
    top: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        zIndex: 5,
      },
      android: { elevation: 5 },
    }),
  },
  content: {
    paddingLeft: 8,
  },
  title: {
    fontSize: 22,
    fontFamily: Assets.font.avenir.heavy,
    color: 'white',
  },
  text: {
    fontSize: 18,
    fontFamily: Assets.font.avenir.medium,
    color: 'white',
  },
})

export default Toast
