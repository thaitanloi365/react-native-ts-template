import React from 'react'
import { ActionSheetItemProps } from '@Types'
import { StyleSheet } from 'react-native'
import Text from '../Text/Text'
import Assets from '@Assets'
import Touchable from '../Touchable/Touchable'

type Props = ActionSheetItemProps
const ActionSheetItem: React.SFC<Props> = props => {
  const { style, text, textStyle, onPress } = props

  return (
    <Touchable style={[styles.container, style]} onPress={onPress}>
      <Text style={[styles.text, textStyle]} text={text} />
    </Touchable>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '90%',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    paddingVertical: 16,
  },
  text: {
    fontSize: 18,
    color: Assets.colors.blue,
    fontFamily: Assets.font.avenir.medium,
  },
})

export default ActionSheetItem
