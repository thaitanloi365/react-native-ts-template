import React, { Touch, TouchEventHandler, TouchEvent } from "react";
import { View, NativeSyntheticEvent, NativeScrollEvent } from "react-native";
import { ScrollViewProps } from "Types";
import ScrollView from "./ScrollView";

class ScrollableRefreshControl extends React.Component {
  private scrollViewRef?: ScrollView;

  private onTouchStart = (event: NativeSyntheticEvent<Touch>) => {
    console.log("onTouchStart", event.nativeEvent);
  };

  private onTouchMove = (event: NativeSyntheticEvent<Touch>) => {
    console.log("onTouchMove", event.nativeEvent);
  };

  private onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    console.log("onScroll", event.nativeEvent);
  };

  private onScrollBeginDrag = (
    event: NativeSyntheticEvent<NativeScrollEvent>
  ) => {
    console.log("onScrollBeginDrag", event.nativeEvent);
  };

  private onScrollEndDrag = (
    event: NativeSyntheticEvent<NativeScrollEvent>
  ) => {
    console.log("onScrollEndDrag", event.nativeEvent);
  };

  private onMomentumScrollEnd = (
    event: NativeSyntheticEvent<NativeScrollEvent>
  ) => {
    console.log("onMomentumScrollEnd", event.nativeEvent);
  };

  /**
   * Fires when scroll view has begun moving
   */
  private onMomentumScrollBegin = (
    event: NativeSyntheticEvent<NativeScrollEvent>
  ) => {
    console.log("onMomentumScrollBegin", event.nativeEvent);
  };

  render() {
    const { children } = this.props;
    const ScrollableComponent = React.Children.map(children, child => {
      if (!React.isValidElement<ScrollViewProps>(child)) return null;
      return React.cloneElement<any>(child, {
        scrollEventThrottle: child.props.scrollEventThrottle || 16,
        onTouchStart: this.onTouchStart,
        onTouchMove: this.onTouchMove,
        onScroll: this.onScroll,
        onScrollBeginDrag: this.onScrollBeginDrag,
        onScrollEndDrag: this.onScrollEndDrag,
        onMomentumScrollBegin: this.onMomentumScrollBegin,
        onMomentumScrollEnd: this.onMomentumScrollEnd,
        ref: (node: any) => {
          console.log("node", node);
          this.scrollViewRef = node;
        }
      });
    });

    return (
      <View>
        <View />
        {ScrollableComponent}
      </View>
    );
  }
}

export default ScrollableRefreshControl;
