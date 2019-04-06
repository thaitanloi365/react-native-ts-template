import React, { PureComponent } from 'react'
import { View, Animated, Easing, StyleSheet } from 'react-native'
import { SkypeIndicatorProps } from '@Types'
import BaseIndicator from './BaseIndicator'
import Assets from '@Assets'

type Props = SkypeIndicatorProps
class SkypeIndicator extends PureComponent<Props> {
  static defaultProps: Props = {
    animationDuration: 1600,
    color: Assets.colors.primary,
    count: 5,
    size: 40,
    minScale: 0.2,
    maxScale: 1.0,
    animating: true,
    interaction: false,
    animationEasing: Easing.linear,
  }

  renderComponent = (index: number, count: number, progress: Animated.Value) => {
    const {
      size = 40,
      minScale = 0.2,
      maxScale = 1.0,
      color: backgroundColor,
      animationDuration = 1600,
    } = this.props
    let frames = (60 * animationDuration) / 1000
    let offset = index / (count - 1)
    let easing = Easing.bezier(0.5, offset, 0.5, 1.0)

    let inputRange = Array.from(new Array(frames), (_, index) => index / (frames - 1))

    let outputRange = Array.from(
      new Array(frames),
      (_, index) => easing(index / (frames - 1)) * 360 + 'deg'
    )

    const rotate = progress.interpolate({ inputRange, outputRange })
    let layerStyle = {
      transform: [{ rotate }],
    }

    let ballStyle = {
      width: size / 5,
      height: size / 5,
      borderRadius: size / 10,
      backgroundColor,
      transform: [
        {
          scale: progress.interpolate({
            inputRange: [0, 1],
            outputRange: [
              maxScale - (maxScale - minScale) * offset,
              minScale + (maxScale - minScale) * offset,
            ],
          }),
        },
      ],
    }

    return (
      <Animated.View style={[styles.layer, layerStyle]} {...{ key: index }}>
        <Animated.View style={ballStyle} />
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
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
})

export default SkypeIndicator
