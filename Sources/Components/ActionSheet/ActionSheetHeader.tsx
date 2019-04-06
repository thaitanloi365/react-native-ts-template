import React from 'react'
import { View, StyleProp, TextStyle, StyleSheet } from 'react-native'
import { Text } from '@Components'
import { ActionSheetHeaderProps } from '@Types'
import Assets from '@Assets'

type Props = ActionSheetHeaderProps
const ActionSheetHeader: React.SFC<Props> = props => {
  const { style, title, titleStyle, message, messageStyle } = props
  return (
    <View style={[styles.container, style]}>
      {title && <Text style={[styles.title, titleStyle]} text={title} />}
      <Text style={[styles.message, messageStyle]} text={message} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Assets.colors.gray,
    backgroundColor: 'white',
    width: '90%',
  },
  title: {
    marginTop: 6,
    fontSize: 18,
    fontFamily: Assets.font.avenir.heavy,
    color: Assets.colors.gray,
  },
  message: {
    marginVertical: 12,
    fontSize: 16,
    fontFamily: Assets.font.avenir.medium,
    color: Assets.colors.gray,
    textAlign: 'center',
  },
})

export default ActionSheetHeader
