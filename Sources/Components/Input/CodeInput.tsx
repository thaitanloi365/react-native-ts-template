import React from 'react'
import {
  View,
  StyleSheet,
  NativeSyntheticEvent,
  TextInputKeyPressEventData,
  TextInputFocusEventData,
} from 'react-native'
import { CodeInputProps } from '@Types'
import TextInput from '../Input/TextInput'

type Props = CodeInputProps
type State = {
  lastIndex: number
  currentIndex: number
  texts: string[]
  submited: boolean
}

class CodeInput extends React.Component<Props, State> {
  private inputRefs: TextInput[] = []

  constructor(props: Props) {
    super(props)
    const { numberInputs } = props
    this.state = {
      texts: new Array(numberInputs).fill(''),
      lastIndex: 0,
      currentIndex: -1,
      submited: false,
    }
  }

  static defaultProps: Props = {
    numberInputs: 4,
    spacing: 10,
    width: 50,
    height: 50,
    inputBorderRadius: 4,
    activeBorderColor: 'blue',
    activeBorderWidth: 2,
    deactiveBorderColor: 'black',
    deactiveBorderWidth: 1,
    fontSize: 20,
    secureTextEntry: true,
  }

  focusInput(atIndex: number) {
    const input = this.inputRefs[atIndex]
    if (input) input.focus()
  }

  getText = () => {
    return this.state.texts.join('').toString()
  }

  clearText = () => {
    if (this.inputRefs.length < 1) return
    this.setState({ texts: [] }, () => {
      this.inputRefs.forEach(input => input.clearText())
    })
  }

  private onTextChange = (index: number, text: string) => {
    const { numberInputs, onTextChanged, onSubmit } = this.props
    let texts = this.state.texts
    texts[index] = text
    if (text !== '') {
      if (index == numberInputs - 1) {
        if (onSubmit && texts.length === numberInputs) {
          const currentIndexRef = this.inputRefs[index]
          if (currentIndexRef) {
            currentIndexRef.blur()
            this.setState({ submited: true })
          }

          const result = this.getText()
          onSubmit(result)
        }
      } else {
        const nextInputRef = this.inputRefs[index + 1]
        if (nextInputRef) {
          nextInputRef.focus()
          if (this.state.submited) {
            this.setState({ submited: false })
          }
        }
      }
    }

    this.setState({ texts }, () => {
      const text = texts.join('')
      if (onTextChanged) onTextChanged(text)
    })
  }

  private onBackSpacePress = (index: number) => {
    if (index > 0) {
      const currentText = this.state.texts[index]
      if (currentText === '') {
        const nextInputRef = this.inputRefs[index - 1]
        if (nextInputRef) nextInputRef.focus()
      }
    }
  }

  private onFocus = (index: number) => {
    this.setState({ currentIndex: index })
  }

  private renderInputs = () => {
    const {
      numberInputs,
      returnKeyType,
      secureTextEntry,
      fontFamily,
      fontSize,
      spacing,
      width,
      height,
      activeBorderColor,
      activeBorderWidth,
      deactiveBorderColor,
      deactiveBorderWidth,
      inputBorderRadius,
      keyboardType,
    } = this.props

    const { currentIndex, submited } = this.state
    const inputStyle: any = {
      fontFamily,
      fontSize,
      textAlign: 'center',
    }
    const inputs = Array.apply(null, Array(numberInputs)).map((_, index) => {
      const shuoldChange = index === currentIndex && submited === false
      const containerInputStyle: any = {
        width,
        height,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: spacing! / 2,
        borderColor: shuoldChange ? activeBorderColor : deactiveBorderColor,
        borderWidth: shuoldChange ? activeBorderWidth : deactiveBorderWidth,
        borderRadius: inputBorderRadius,
      }

      const id = `input${index}`

      const onChangeText = (text: string) => {
        this.onTextChange(index, text)
      }

      const onKeyPress = (e: NativeSyntheticEvent<TextInputKeyPressEventData>) => {
        if (e.nativeEvent.key === 'Backspace') {
          this.onBackSpacePress(index)
        }
      }

      const onFocus = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
        this.onFocus(index)
      }

      return (
        <TextInput
          style={containerInputStyle}
          key={id}
          ref={r => {
            if (r) this.inputRefs[index] = r
          }}
          returnKeyType={returnKeyType}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          maxLength={1}
          inputStyle={inputStyle}
          onChangeText={onChangeText}
          onKeyPress={onKeyPress}
          onFocus={onFocus}
          underlineWidth={0}
        />
      )
    })
    return inputs
  }
  render() {
    const { style } = this.props
    return <View style={[styles.container, style]}>{this.renderInputs()}</View>
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
})
export default CodeInput
