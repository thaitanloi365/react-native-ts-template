import React from "react";
import { View } from "react-native";
import { TextInputProps, InputGroupProps } from "Types";
import TextInput from "./TextInput";

type Props = InputGroupProps;
class InputGroup extends React.Component<Props> {
  private inputRefs: Array<TextInput> = [];

  private onInputSubmmitEditing = (index: number) => {
    const length = this.inputRefs.length;
    if (index === length - 1) {
      console.log("last index");
      if (this.props.onInputSubmit) {
        this.props.onInputSubmit();
      }
    } else {
      const textInput = this.inputRefs[index + 1];
      console.log("index", index);
      if (textInput) {
        textInput.focus();
        if (this.props.onInputFocus) {
          this.props.onInputFocus(index);
        }
      }
    }
  };

  private onInputFocus = (index: number) => {
    console.log("onfocus", index);
  };

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

  render() {
    const { children, style } = this.props;
    const inputs = React.Children.map(children, (child, index) => {
      if (!React.isValidElement<TextInputProps>(child)) return null;
      return React.cloneElement<any>(child, {
        onSubmitEditing: () => this.onInputSubmmitEditing(index),
        onFocus: () => this.onInputFocus(index),
        ref: (node: any) => {
          console.log(node, node.textInputRef);
          this.inputRefs.push(node);
        }
      });
    });
    return <View style={style}>{inputs}</View>;
  }
}

export default InputGroup;
