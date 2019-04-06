import React from 'react'
import { View, Animated, Easing, StyleSheet } from 'react-native'
import { PulseIndicatorProps } from '@Types'
import BaseIndicator from './BaseIndicator'
import Assets from '@Assets'

type Props = PulseIndicatorProps

class PulseIndicator extends React.PureComponent<Props> {
  static defaultProps: Props = {
    animationEasing: Easing.out(Easing.ease),
    animating: true,
    interaction: false,
    animationDuration: 1000,
    color: Assets.colors.primary,
    size: 40,
    count: 1,
  }

  private renderComponent = (index: number, count: number, progress: Animated.Value) => {
    const { size = 40, color } = this.props

    const scale = progress.interpolate({
      inputRange: [0, 0.67, 1],
      outputRange: index ? [0.4, 0.6, 0.4] : [0.4, 0.6, 1.0],
    })

    const opacity = progress.interpolate({
      inputRange: [0, 0.67, 1],
      outputRange: index ? [1.0, 1.0, 1.0] : [0.5, 0.5, 0.0],
    })

    const pulseStyle = {
      height: size,
      width: size,
      borderRadius: size / 2,
      backgroundColor: color,
      transform: [{ scale }],
      opacity,
    }

    return (
      <Animated.View style={styles.layer} {...{ key: index }}>
        <Animated.View style={pulseStyle} />
      </Animated.View>
    )
  }

  render() {
    let { style, size: width, size: height, ...props } = this.props

    return (
      <View style={[styles.container, style]}>
        <BaseIndicator
          style={{ width, height }}
          renderComponent={this.renderComponent}
          {...props}
          count={2}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  layer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
export default PulseIndicator
