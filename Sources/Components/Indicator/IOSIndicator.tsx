import React from 'react'
import { View, Animated, StyleSheet } from 'react-native'
import { IOSIndicatorProps } from '@Types'
import BaseIndicator from './BaseIndicator'
import Assets from '@Assets'

type Props = IOSIndicatorProps

class IOSIndicator extends React.PureComponent<Props> {
  static defaultProps: Props = {
    color: Assets.colors.primary,
    count: 12,
    size: 40,
    animationDuration: 1600,
  }

  private renderComponent = (index: number, count: number, progress: Animated.Value) => {
    const { size = 40, color: backgroundColor } = this.props
    const angle = (index * 360) / count

    const rotate = angle + 'deg'
    const layerStyle = {
      transform: [{ rotate }],
    }

    const inputRange = Array.from(new Array(count + 1), (_, index) => index / count)

    const outputRange = Array.from(new Array(count), (_, index) =>
      Math.max(1.0 - index * (1 / (count - 1)), 0)
    )

    for (let j = 0; j < index; j++) {
      //@ts-ignore
      outputRange.unshift(outputRange.pop())
    }

    outputRange.unshift(...outputRange.slice(-1))

    const barStyle = {
      width: size / 10,
      height: size / 4,
      borderRadius: size / 20,
      backgroundColor,
      opacity: progress.interpolate({ inputRange, outputRange }),
    }

    return (
      <Animated.View style={[styles.layer, layerStyle]} {...{ key: index }}>
        <Animated.View style={barStyle} />
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

export default IOSIndicator
