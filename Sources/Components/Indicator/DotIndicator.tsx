import React from 'react'
import { Animated, Easing, StyleSheet } from 'react-native'
import { DotIndicatorProps } from '@Types'
import BaseIndicator from './BaseIndicator'
import Assets from '@Assets'

type Props = DotIndicatorProps

class DotIndicator extends React.PureComponent<Props> {
  static defaultProps: Props = {
    animationEasing: Easing.inOut(Easing.ease),
    color: Assets.colors.primary,
    count: 3,
    size: 16,
    animationDuration: 1200,
  }

  private renderComponent = (index: number, count: number, progress: Animated.Value) => {
    const { size = 16, color: backgroundColor } = this.props

    const scale = progress.interpolate({
      inputRange: [
        0.0,
        (index + 0.5) / (count + 1),
        (index + 1.0) / (count + 1),
        (index + 1.5) / (count + 1),
        1.0,
      ],
      outputRange: [1.0, 1.36, 1.56, 1.06, 1.0],
    })
    const style = {
      width: size,
      height: size,
      margin: size / 2,
      borderRadius: size / 2,
      backgroundColor,
      transform: [{ scale }],
    }

    return <Animated.View style={style} {...{ key: index }} />
  }

  render() {
    let { style, ...props } = this.props

    return (
      <BaseIndicator
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

export default DotIndicator
