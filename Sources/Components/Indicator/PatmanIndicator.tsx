import React from 'react'
import { View, Animated, I18nManager, StyleSheet, ViewStyle } from 'react-native'
import { PacmanIndicatorProps } from '@Types'
import BaseIndicator from './BaseIndicator'
import Assets from '@Assets'

type Props = PacmanIndicatorProps

class PacmanIndicator extends React.PureComponent<Props> {
  static defaultProps: Props = {
    animationDuration: 600,
    color: Assets.colors.primary,
    size: 48,
  }

  private renderBlock(index: number, count: number, progress: Animated.Value) {
    const { size = 48, color: backgroundColor } = this.props

    const translateX = progress.interpolate({
      inputRange: [0, 1],
      outputRange: [0, size / (I18nManager.isRTL ? 4 : -4)],
    })

    const scale =
      count === index + 1
        ? progress.interpolate({
            inputRange: [0, 0.67, 1],
            outputRange: [0, 1, 1],
          })
        : 1

    const style: any = {
      position: 'absolute',
      top: size / 2 - size / 16,
      left: size / 2 + size / 16 + ((index - 2) * size) / 4,
      width: size / 8,
      height: size / 8,
      borderRadius: size / 16,
      backgroundColor,
      transform: [{ translateX }, { scale }],
    }

    if (count === index + 1) {
      style.opacity = progress.interpolate({
        inputRange: [0, 0.67, 1],
        outputRange: [0, 1, 1],
      })
    }

    return <Animated.View style={style} key={index} />
  }

  renderComponent = (index: number, count: number, progress: Animated.Value) => {
    const { size = 48, color: backgroundColor } = this.props

    if (index > 1) {
      return this.renderBlock(index, count, progress)
    }

    const rotate = progress.interpolate({
      inputRange: [0, 0.67, 1],
      outputRange:
        index > 0 !== I18nManager.isRTL ? ['0deg', '45deg', '0deg'] : ['0deg', '-45deg', '0deg'],
    })
    const pacmanStyle = {
      position: 'absolute',
      top: size / 4,
      left: 0,
      width: size / 2,
      height: size / 2,
      transform: [{ rotate }],
    }

    const containerStyle: ViewStyle = {
      width: size / 2,
      height: size / 4,
      overflow: 'hidden',
    }

    const style: ViewStyle = {
      width: size / 2,
      height: size / 2,
      borderRadius: size / 4,
      backgroundColor,
    }

    if (index) {
      containerStyle.top = size / 4
      style.top = -size / 4
    }

    return (
      <Animated.View style={pacmanStyle} key={index}>
        <View style={containerStyle} collapsable={false}>
          <Animated.View style={style} />
        </View>
      </Animated.View>
    )
  }

  render() {
    let { style, size = 48, ...props } = this.props

    return (
      <View style={[styles.container, style]}>
        <BaseIndicator
          style={{ width: size * 1.25, height: size }}
          renderComponent={this.renderComponent}
          count={5}
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
})
export default PacmanIndicator
