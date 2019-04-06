import React from 'react'
import { Animated, ViewProps, Easing, EasingStatic, EasingFunction } from 'react-native'
import { BaseIndicatorProps } from '@Types'

type Props = BaseIndicatorProps

type State = {
  progress: Animated.Value
  animation: Animated.CompositeAnimation | null
}

class BaseIndicator extends React.Component<Props, State> {
  private mounted = false
  state: State = {
    progress: new Animated.Value(0),
    animation: null,
  }
  static defaultProps: Props = {
    animating: true,
    animationDuration: 250,
    animationEasing: Easing.linear,
    interaction: false,
    size: 40,
  }

  private renderComponent = (c: any, index: number) => {
    let { progress } = this.state
    let { renderComponent, count = 1 } = this.props

    if (typeof renderComponent === 'function') {
      return renderComponent(index, count, progress)
    } else {
      return null
    }
  }

  componentDidMount() {
    const { animating } = this.props
    this.mounted = true
    if (animating) {
      this.startAnimation()
    }
  }

  componentWillUnmount() {
    this.mounted = false
  }

  componentWillReceiveProps(props: Props) {
    let { animating } = this.props

    if (animating !== props.animating) {
      if (animating) {
        this.stopAnimation()
      } else {
        this.startAnimation()
      }
    }
  }
  private startAnimation = (finished: boolean = true) => {
    let { progress } = this.state
    let { interaction, animationEasing, animationDuration } = this.props

    if (!this.mounted || finished === false) {
      return
    }

    const animation = Animated.timing(progress, {
      duration: animationDuration,
      easing: animationEasing,
      useNativeDriver: true,
      isInteraction: interaction,
      toValue: 1,
    })

    Animated.loop(animation).start()

    this.setState({ animation })
  }

  private stopAnimation() {
    let { animation } = this.state

    if (null == animation) {
      return
    }

    animation.stop()

    this.setState({ animation: null })
  }

  render() {
    const { count, ...other } = this.props
    return (
      <Animated.View {...other}>{Array.from(new Array(count), this.renderComponent)}</Animated.View>
    )
  }
}

export default BaseIndicator
