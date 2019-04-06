import React from 'react'
import { View, Animated, Easing, StyleSheet } from 'react-native'
import BaseIndicator from './BaseIndicator'
import { WaveIndicatorProps } from '@Types'
import Assets from '@Assets'

type Props = WaveIndicatorProps
export default class WaveIndicator extends React.PureComponent<Props> {
  static defaultProps: Props = {
    animationEasing: Easing.out(Easing.ease),
    animationDuration: 1600,
    waveFactor: 0.54,
    waveMode: 'Fill',
    color: Assets.colors.primary,
    count: 4,
    size: 40,
    animating: true,
    interaction: true,
  }

  private renderComponent = (index: number, count: number, progress: Animated.Value) => {
    const { size = 40, color, waveFactor = 0.54, waveMode = 'Fill' } = this.props
    const fill = 'Fill' === waveMode

    const scale = progress.interpolate({
      inputRange: [0, 1 - Math.pow(waveFactor, index), 1],
      outputRange: [0, 0, 1],
    })

    const opacity = progress.interpolate({
      inputRange: [0, 1 - Math.pow(waveFactor, index), 1],
      outputRange: [1, 1, 0],
    })
    const waveStyle = {
      height: size,
      width: size,
      borderRadius: size / 2,
      borderWidth: fill ? 0 : Math.floor(size / 20),
      [fill ? 'backgroundColor' : 'borderColor']: color,
      transform: [{ scale }],
      opacity,
    }

    return (
      <Animated.View style={styles.layer} {...{ key: index }}>
        <Animated.View style={waveStyle} />
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
