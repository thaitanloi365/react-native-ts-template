import React from "react";
import { View, Image, Animated } from "react-native";
import {
  Text,
  Button,
  ScrollView,
  StyleSheet,
  TextInput,
  Card,
  BottomSheetBase,
  Menu,
  Header,
  InputGroup,
  RefreshControl
} from "Components";
import { Navigator } from "Navigation";
import Assets from "Assets";

type Props = {};
type State = {
  yValue: Animated.Value;
  refreshing: boolean;
};
class Home extends React.Component<Props, State> {
  private bs = React.createRef<BottomSheetBase>();
  private inputGroup = React.createRef<InputGroup>();
  state: State = {
    yValue: new Animated.Value(0),
    refreshing: false
  };
  render() {
    return (
      <View style={StyleSheet.absoluteFill}>
        <Header title="Home" />

        <ScrollView
          scrollEventThrottle={16}
          onScroll={Animated.event([
            { nativeEvent: { contentOffset: { y: this.state.yValue } } }
          ])}
        >
          <RefreshControl
            scrollY={this.state.yValue}
            height={120}
            onRefresh={() => {
              return new Promise((resolve, reject) => {
                setTimeout(() => resolve(), 3000);
              });
            }}
          />
          <Button
            text="Button"
            onPress={() => Navigator.alertShow("Awesome Alert")}
            style={{
              marginTop: 20,
              marginLeft: 120,
              marginRight: 120,
              backgroundColor: "red"
            }}
          />
          <InputGroup ref={this.inputGroup}>
            <TextInput
              style={{ marginTop: 60, marginHorizontal: 60, height: 30 }}
              placeholder="TextInput 2"
            />
            <TextInput
              style={{ marginTop: 60, marginHorizontal: 60, height: 30 }}
              placeholder="TextInput 2"
            />
          </InputGroup>
          <Button
            text="Button"
            onPress={() =>
              Navigator.alertConfirm(
                "Awesome Alert Awesome Alert Awesome Alert Awesome Alert"
              )
            }
            style={{
              marginTop: 20,
              marginLeft: 120,
              marginRight: 120,
              backgroundColor: "blue",
              borderRadius: 10
            }}
          />

          <Button
            onPress={() => {
              if (this.inputGroup.current) {
                const [
                  username,
                  password
                ] = this.inputGroup.current.getAllText();
                console.log({ username, password });
                console.log(this.inputGroup.current.getAllText());
                console.log(this.inputGroup.current.getText(0));
                console.log(this.inputGroup.current.getText(1));
                console.log(this.inputGroup.current.getText(6));
              }
              setTimeout(() => {
                Navigator.hideLoading();
              }, 2000);
              Navigator.showLoading();
            }}
            rasied
            text="Button"
            style={{
              marginTop: 20,
              marginLeft: 120,
              marginRight: 120,
              backgroundColor: "blue",
              borderRadius: 10
            }}
          />

          <Button
            style={{
              marginTop: 20,
              width: 44,
              height: 44,
              borderRadius: 22,
              alignItems: "center",
              justifyContent: "center",
              alignSelf: "center",
              backgroundColor: "transparent"
            }}
            onPress={() => this.bs.current!.show()}
          >
            <Image source={Assets.images.back} />
          </Button>

          <Menu
            style={{
              marginTop: 20,
              marginLeft: 120,
              marginRight: 120,
              backgroundColor: "blue",
              borderRadius: 10
            }}
            items={[
              { text: "Item 1" },
              { text: "Item 2" },
              { text: "Item 3" },
              { text: "Item 4" },
              { text: "Item 5" },
              { text: "Item 6" },
              { text: "Item 7" },
              { text: "Item 8" }
            ]}
          />

          <TextInput
            style={{ marginTop: 60, marginHorizontal: 60, height: 30 }}
            placeholder="TextInput 1"
          />
          <TextInput
            style={{ marginTop: 60, marginHorizontal: 60, height: 30 }}
            placeholder="TextInput 3"
          />
          <TextInput
            style={{ marginTop: 60, marginHorizontal: 60, height: 30 }}
            placeholder="TextInput 2"
          />
          <Card style={{ marginTop: 20, marginHorizontal: 60 }} />
          <BottomSheetBase ref={this.bs} closeOnSwipeDown={false}>
            <ScrollView>
              <Button
                rasied
                text="Button"
                style={{
                  marginTop: 20,
                  marginLeft: 120,
                  marginRight: 120,
                  backgroundColor: "blue",
                  borderRadius: 10
                }}
              />
              <Button
                rasied
                text="Button"
                style={{
                  marginTop: 20,
                  marginLeft: 120,
                  marginRight: 120,
                  backgroundColor: "blue",
                  borderRadius: 10
                }}
              />
              <Button
                rasied
                text="Button"
                style={{
                  marginTop: 20,
                  marginLeft: 120,
                  marginRight: 120,
                  backgroundColor: "blue",
                  borderRadius: 10
                }}
              />
              <Button
                rasied
                text="Button"
                style={{
                  marginTop: 20,
                  marginLeft: 120,
                  marginRight: 120,
                  backgroundColor: "blue",
                  borderRadius: 10
                }}
              />
              <Button
                rasied
                text="Button"
                style={{
                  marginTop: 20,
                  marginLeft: 120,
                  marginRight: 120,
                  backgroundColor: "blue",
                  borderRadius: 10
                }}
              />
              <Button
                rasied
                text="Button"
                style={{
                  marginTop: 20,
                  marginLeft: 120,
                  marginRight: 120,
                  backgroundColor: "blue",
                  borderRadius: 10
                }}
              />
              <Button
                rasied
                text="Button"
                style={{
                  marginTop: 20,
                  marginLeft: 120,
                  marginRight: 120,
                  backgroundColor: "blue",
                  borderRadius: 10
                }}
              />
            </ScrollView>
          </BottomSheetBase>
        </ScrollView>
      </View>
    );
  }
}

export default Home;
