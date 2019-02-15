import React from "react";
import {
  View,
  TextInput as RNTextInput,
  Platform,
  StyleSheet
} from "react-native";
import { TextInputProps } from "Types";
import Text from "../Text/Text";
import Assets from "Assets";

type Props = TextInputProps;
type State = {
  text: string;
};
class TextInput extends React.Component<Props, State> {
  private textInputRef = React.createRef<RNTextInput>();
  state: State = {
    text: ""
  };

  setNativeProps = (props: object) => {
    if (this.textInputRef.current) {
      this.textInputRef.current.setNativeProps(props);
    }
  };
  focus = () => {
    if (this.textInputRef.current) this.textInputRef.current.focus();
  };

  clearText = () => {
    this.setState({ text: "" }, () => {
      if (this.textInputRef.current) this.textInputRef.current.clear();
    });
  };

  getText = () => {
    return this.state.text;
  };

  private onTextChanged = (text: string) => {
    this.setState({ text }, () => {
      if (this.props.onChangeText) {
        this.props.onChangeText(text);
      }
    });
  };

  render() {
    const {
      style,
      inputStyle,
      helperText,
      helperStyle,
      underlineColor,
      underlineWidth,
      returnKeyLabel,
      returnKeyType,
      defaultValue,
      placeholder,
      placeholderTextColor,
      keyboardType,
      secureTextEntry,
      multiline,
      maxLength,
      onSubmitEditing,
      onKeyPress,
      onFocus,
      editable,
      numberOfLines,
      scrollEnabled,
      autoCapitalize
    } = this.props;

    const underlineStyle = multiline
      ? {}
      : {
          borderBottomColor: underlineColor || "black",
          borderBottomWidth: underlineWidth || StyleSheet.hairlineWidth
        };

    const defaultStyle: any = {
      fontSize: 16,
      fontFamily: Assets.fontFamily.roman,
      ...Platform.select({
        android: {
          paddingVertical: 0,
          textAlignVertical: multiline ? "top" : "auto"
        }
      })
    };

    return (
      <View style={[style, underlineStyle]}>
        {helperText && <Text text={helperText} style={helperStyle} />}
        <RNTextInput
          ref={this.textInputRef}
          style={[defaultStyle, inputStyle]}
          returnKeyLabel={returnKeyLabel}
          returnKeyType={returnKeyType}
          defaultValue={defaultValue}
          placeholder={placeholder}
          placeholderTextColor={placeholderTextColor}
          keyboardType={keyboardType}
          secureTextEntry={secureTextEntry}
          maxLength={maxLength}
          onChangeText={this.onTextChanged}
          onSubmitEditing={onSubmitEditing}
          onKeyPress={onKeyPress}
          onFocus={onFocus}
          underlineColorAndroid="transparent"
          autoCapitalize={autoCapitalize || "none"}
          autoCorrect={false}
          editable={editable}
          multiline={multiline}
          numberOfLines={numberOfLines}
          scrollEnabled={scrollEnabled}
        />
      </View>
    );
  }
}

export default TextInput;
