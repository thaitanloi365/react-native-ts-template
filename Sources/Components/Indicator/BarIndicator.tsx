import React from 'react'
import { View, Animated, StyleSheet } from 'react-native'
import { BarIndicatorProps } from '@Types'
import Indicator from './BaseIndicator'
import Assets from '@Assets'

type Props = BarIndicatorProps

class BarIndicator extends React.PureComponent<Props> {
  static defaultProps: Props = {
    count: 3,
    color: Assets.colors.primary,
    size: 40,
    animationDuration: 1000,
  }

  private outputRange(base: number, index: number, count: number, samples: number) {
    let range = Array.from(new Array(samples), (undefined, index) => {
      return base * Math.abs(Math.cos((Math.PI * index) / (samples - 1)))
    })

    for (let j = 0; j < index * (samples / count); j++) {
      //@ts-ignore
      range.unshift(range.pop())
    }

    range.unshift(...range.slice(-1))

    return range
  }

  private renderComponent = (index: number, count: number, progress: Animated.Value) => {
    let { color: backgroundColor, animationDuration = 1000, size = 40 } = this.props

    const frames = (60 * animationDuration) / 1000
    let samples = 0

    do samples += count
    while (samples < frames)

    const inputRange = Array.from(new Array(samples + 1), (_, index) => index / samples)

    const width = Math.floor(size / 5),
      height = Math.floor(size / 2),
      radius = Math.ceil(width / 2)

    const containerStyle = {
      height: size,
      width: width,
      marginHorizontal: radius,
    }

    const topTranslateY = progress.interpolate({
      inputRange,
      outputRange: this.outputRange(+(height - radius) / 2, index, count, samples),
    })
    const topStyle = {
      width,
      height,
      backgroundColor,
      borderTopLeftRadius: radius,
      borderTopRightRadius: radius,
      transform: [{ translateY: topTranslateY }],
    }

    const bottomTranslateY = progress.interpolate({
      inputRange,
      outputRange: this.outputRange(-(height - radius) / 2, index, count, samples),
    })
    const bottomStyle = {
      width,
      height,
      backgroundColor,
      borderBottomLeftRadius: radius,
      borderBottomRightRadius: radius,
      transform: [{ translateY: bottomTranslateY }],
    }

    return (
      <View style={containerStyle} {...{ key: index }}>
        <Animated.View style={topStyle} />
        <Animated.View style={bottomStyle} />
      </View>
    )
  }

  render() {
    let { style, ...props } = this.props

    return (
      <Indicator
        style={[styles.container, style]}
        renderComponent={this.renderComponent}
        {...props}
      />
    )
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
})
export default BarIndicator
