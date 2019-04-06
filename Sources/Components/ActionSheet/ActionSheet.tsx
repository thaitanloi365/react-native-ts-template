import React from 'react'
import { StyleSheet, Animated, Dimensions } from 'react-native'
import { ActionSheetProps, ActionSheetHeaderProps } from '@Types'
import { Device } from '@Utils'
import Modal from '../Modal/Modal'
import Assets from '@Assets'

const { width, height } = Dimensions.get('window')
const marginBottom = Device.isIphoneX() ? 20 : 10
type Props = ActionSheetProps

type State = {
  animatedValue: Animated.Value
}

class ActionSheet extends React.Component<Props, State> {
  private modalRef = React.createRef<Modal>()

  state: State = {
    animatedValue: new Animated.Value(0),
  }

  show = () => {
    if (this.modalRef.current) {
      this.modalRef.current.show(() => {
        Animated.spring(this.state.animatedValue, {
          toValue: 1,
          useNativeDriver: true,
          tension: 10,
          friction: 9,
          velocity: 5,
        }).start()
      })
    }
  }

  hide = (onHide?: () => void) => {
    Animated.timing(this.state.animatedValue, {
      toValue: 0,
      useNativeDriver: true,
      duration: 250,
    }).start(() => this.overlayHide(onHide))
  }

  private onPressOutSide = () => {
    this.hide()
  }

  private overlayHide = (onHide?: () => void) => {
    if (this.modalRef.current) {
      this.modalRef.current.hide(onHide)
    }
  }
  private getAnimationStyle() {
    const { animatedValue } = this.state

    const translateY = animatedValue.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [height, height / 4, 0],
      extrapolate: 'clamp',
    })
    const animationStyle = {
      opacity: animatedValue,
      transform: [{ translateY }],
    }

    return animationStyle
  }

  private renderItems = () => {
    const { children } = this.props
    return React.Children.map(children, (child, index) => {
      // prettier-ignore
      if (React.isValidElement<ActionSheetProps | ActionSheetHeaderProps>(child)) {

        const firstItem = index === 0 ;
        const lastItem = index === children.length - 1;
        const prevLastItem = index === children.length - 2;
        
        return React.cloneElement(child, {
          style: StyleSheet.flatten([
            child.props.style,
            {
              borderTopLeftRadius: firstItem || lastItem ? 10 : 0,
              borderTopRightRadius: firstItem || lastItem ? 10 : 0,
              borderBottomLeftRadius: prevLastItem || lastItem ? 10 : 0,
              borderBottomRightRadius: prevLastItem || lastItem ? 10 : 0,
              borderBottomWidth: prevLastItem ? 0 : StyleSheet.hairlineWidth,
              borderBottomColor: prevLastItem ? "transparent" : Assets.colors.gray,
              marginTop: lastItem ? 10 : 0
            }
          ])
        });
      }
      return null
    })
  }
  render() {
    const { style, children } = this.props
    let animationStyle = this.getAnimationStyle()
    return (
      <Modal
        ref={this.modalRef}
        animated
        style={{ justifyContent: 'flex-end' }}
        onPressOutside={this.onPressOutSide}
      >
        <Animated.View style={[styles.container, style, animationStyle]}>
          {this.renderItems()}
        </Animated.View>
      </Modal>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width,
    alignItems: 'center',
    marginBottom,
  },
})

export default ActionSheet
