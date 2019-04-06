import React, { PureComponent } from 'react'
import { View, Animated, Easing, StyleSheet } from 'react-native'
import { AndroidIndicatorProps } from '@Types'
import BaseIndicator from './BaseIndicator'
import Assets from '@Assets'

type Props = AndroidIndicatorProps

class AndroidIndicator extends PureComponent<Props> {
  static defaultProps: Props = {
    animationDuration: 2400,
    color: Assets.colors.primary,
    size: 40,
  }
  private renderComponent = (index: number, count: number, progress: Animated.Value) => {
    const { size = 40, color = Assets.colors.primary, animationDuration = 2400 } = this.props

    const frames = (60 * animationDuration) / 1000
    const easing = Easing.bezier(0.4, 0.0, 0.7, 1.0)

    const inputRange = Array.from(
      new Array(frames),
      (undefined, frameIndex) => frameIndex / (frames - 1)
    )

    const outputRange = Array.from(new Array(frames), (_, frameIndex) => {
      const rotation = index ? +(360 - 15) : -(180 - 15)
      let progress = (2 * frameIndex) / (frames - 1)
      if (progress > 1.0) {
        progress = 2.0 - progress
      }

      const direction = index ? -1 : +1

      return direction * (180 - 30) * easing(progress) + rotation + 'deg'
    })

    const layerRotate = progress.interpolate({
      inputRange: [0, 1],
      outputRange: [0 + 30 + 15 + 'deg', 2 * 360 + 30 + 15 + 'deg'],
    })
    const layerStyle = {
      width: size,
      height: size,
      transform: [{ rotate: layerRotate }],
    }

    const viewportRotate = progress.interpolate({ inputRange, outputRange })
    const viewportTranslateY = index ? -size / 2 : 0
    const viewportStyle = {
      width: size,
      height: size,
      transform: [{ translateY: viewportTranslateY }, { rotate: viewportRotate }],
    }

    let containerStyle = {
      width: size,
      height: size / 2,
      overflow: 'hidden',
    }

    let offsetStyle = index ? { top: size / 2 } : null

    let lineStyle = {
      width: size,
      height: size,
      borderColor: color,
      borderWidth: size / 10,
      borderRadius: size / 2,
    }

    // prettier-ignore
    return (
      <Animated.View style={styles.layer} {...{ key: index }}>
        <Animated.View style={layerStyle}>
          <Animated.View style={[containerStyle, offsetStyle]} collapsable={false}>
            <Animated.View style={viewportStyle}>
              <Animated.View style={containerStyle} collapsable={false}>
                <Animated.View style={lineStyle} />
              </Animated.View>
            </Animated.View>
          </Animated.View>
        </Animated.View>
      </Animated.View>
    );
  }

  render() {
    const { style, size: width, size: height, ...props } = this.props

    return (
      <View style={[styles.container, style]}>
        <BaseIndicator
          style={{ width, height }}
          renderComponent={this.renderComponent}
          count={2}
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

export default AndroidIndicator
