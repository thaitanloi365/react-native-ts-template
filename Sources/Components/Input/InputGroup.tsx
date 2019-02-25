import React from "react";
import { View, StyleSheet } from "react-native";
import { TextInputProps, InputGroupProps } from "Types";
import TextInput from "./TextInput";

type Props = InputGroupProps;
class InputGroup extends React.Component<Props> {
  private inputRefs: Array<TextInput> = [];

  private onInputSubmmitEditing = (index: number) => {
    const length = this.inputRefs.length;
    if (index === length - 1) {
      if (this.props.onInputSubmit) {
        this.props.onInputSubmit();
      }
    } else {
      const textInput = this.inputRefs[index + 1];
      if (textInput) {
        textInput.focus();
        if (this.props.onInputFocus) {
          this.props.onInputFocus(index);
        }
      }
    }
  };

  private onInputFocus = (index: number) => {};

  clearText(atIndex: number) {
    const textInput = this.inputRefs[atIndex];
    if (textInput) {
      textInput.clearText();
    }
  }

  getText(atIndex: number): string | null {
    const textInput = this.inputRefs[atIndex];
    if (textInput) {
      return textInput.getText();
    }
    return null;
  }

  getAllText(): Array<string> {
    const texts = this.inputRefs.map(input => {
      if (input) {
        return input.getText();
      }
      return "";
    });
    return texts;
  }

  focus(atIndex: number) {
    const textInput = this.inputRefs[atIndex];
    if (textInput) {
      textInput.focus();
    }
  }

  render() {
    const { children, style, spacing } = this.props;
    const inputs = React.Children.map(children, (child, index) => {
      if (!React.isValidElement<TextInputProps>(child)) return null;
      const { style } = child.props;
      const marginTop =
        index === 0
          ? 0
          : (style && StyleSheet.flatten(style).marginTop) || spacing;
      return React.cloneElement<any>(child, {
        style: { marginTop },
        onSubmitEditing: () => this.onInputSubmmitEditing(index),
        onFocus: () => this.onInputFocus(index),
        ref: (node: any) => {
          if (node) {
            this.inputRefs.push(node);
          }
        }
      });
    });
    return <View style={style}>{inputs}</View>;
  }
}

export default InputGroup;
