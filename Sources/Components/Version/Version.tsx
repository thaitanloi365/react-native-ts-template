import React from 'react'
import { TouchableOpacity, StyleSheet } from 'react-native'
import { VersionProps } from '@Types'
import { StoreState } from '@ReduxManager'
import { connect } from 'react-redux'
import { AppConfiguration } from '@Models'
import Text from '../Text/Text'
import Assets from '@Assets'
import VersionNumber from 'react-native-version-number'

type Props = VersionProps & {
  appConfiguration?: AppConfiguration
}

type State = {
  shuoldShowCodePushVersion: boolean
}

class Version extends React.Component<Props, State> {
  state = {
    shuoldShowCodePushVersion: false,
  }
  private toggle = () => {
    const { shuoldShowCodePushVersion } = this.state
    this.setState({ shuoldShowCodePushVersion: !shuoldShowCodePushVersion })
  }
  render() {
    const { shuoldShowCodePushVersion } = this.state
    const { style, textStyle, appConfiguration } = this.props
    const text =
      shuoldShowCodePushVersion && appConfiguration
        ? `Code Push Version: ${appConfiguration.codePushVersion || ''}`
        : `App Version: ${VersionNumber.appVersion} (${VersionNumber.buildVersion})`
    return (
      <TouchableOpacity style={style} onPress={this.toggle} activeOpacity={0.7}>
        <Text style={[styles.text, textStyle]} text={text} />
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  text: {
    fontSize: 14,
    fontFamily: Assets.font.avenir.medium,
    color: Assets.colors.slate,
  },
})

const mapPropsToState = (state: StoreState) => {
  return {
    appConfiguration: state.appConfiguration,
  }
}
export default connect(mapPropsToState)(Version)
