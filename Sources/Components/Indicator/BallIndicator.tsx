import React from 'react'
import { View, Animated, StyleSheet, Easing } from 'react-native'
import { BallIndicatorProps } from '@Types'
import BaseIndicator from './BaseIndicator'
import Assets from '@Assets'

type Props = BallIndicatorProps
class BallIndicator extends React.PureComponent<Props> {
  static defaultProps: Props = {
    color: Assets.colors.primary,
    count: 8,
    size: 40,
    animationEasing: Easing.linear,
    animationDuration: 1200,
    animating: true,
    interaction: true,
  }

  private renderComponent = (index: number, count: number, progress: Animated.Value) => {
    let { size = 40, color: backgroundColor } = this.props
    let angle = (index * 360) / count

    const rotate = angle + 'deg'
    const layerStyle = { transform: [{ rotate }] }

    const inputRange = Array.from(new Array(count + 1), (_, index) => index / count)

    const outputRange = Array.from(
      new Array(count),
      (_, index) => 1.2 - (0.5 * index) / (count - 1)
    )

    for (let j = 0; j < index; j++) {
      const popItem = outputRange.pop()
      if (popItem) {
        outputRange.unshift(popItem)
      }
    }

    outputRange.unshift(...outputRange.slice(-1))

    const scale = progress.interpolate({ inputRange, outputRange })
    const ballStyle = {
      margin: size / 20,
      backgroundColor,
      width: size / 5,
      height: size / 5,
      borderRadius: size / 10,
      transform: [{ scale }],
    }

    return (
      <Animated.View style={[styles.layer, layerStyle]} {...{ key: index }}>
        <Animated.View style={ballStyle} />
      </Animated.View>
    )
  }

  render() {
    let { style, size, size: width, size: height, ...props } = this.props

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
    flexDirection: 'row',
  },

  layer: {
    ...StyleSheet.absoluteFillObject,

    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
})

export default BallIndicator
