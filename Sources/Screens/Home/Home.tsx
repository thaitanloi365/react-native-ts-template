import React from 'react'
import { View } from 'react-native'
import {
  StyleSheet,
  Button,
  BottomSheetBase,
  ActionSheet,
  ActionSheetItem,
  ActionSheetHeader,
  AndroidIndicator,
  SkypeIndicator,
  Indicator,
  BallIndicator,
  ScrollView,
  Row,
  Text,
  CodeInput,
} from '@Components'
import { Navigator } from '@Navigation'
import { Strings } from '@Localization'
import { AppConfigRedux } from '@ReduxManager'

class Home extends React.Component {
  render() {
    return (
      <ScrollView>
        <Button
          style={{ marginTop: 80, marginHorizontal: 40 }}
          text="Erorr"
          onPress={() =>
            Navigator.showToast(Strings.networkError, Strings.networkNotAvailable, 'Error', 2000)
          }
        />
        <Button
          style={{ marginTop: 80, marginHorizontal: 40 }}
          text="Erorr"
          onPress={() => Navigator.showToast('Warn Titlte', 'Swipe to close.....', 'Warn', 0)}
        />

        <Button
          style={{ marginTop: 80, marginHorizontal: 40 }}
          text="Bottom Sheet"
          onPress={() => this.ss.show()}
        />

        <Button
          style={{ marginTop: 80, marginHorizontal: 40 }}
          text="Alert with confirm"
          onPress={() => Navigator.alertConfirm('ssss222')}
        />

        <Button
          style={{ marginTop: 80, marginHorizontal: 40 }}
          text="Alert without config"
          onPress={() => Navigator.alertShow('sss')}
        />

        <Button
          style={{ marginTop: 80, marginHorizontal: 40 }}
          text="Action Sheet"
          onPress={() => {
            this.act.show()
          }}
        />

        <Indicator type="Android" />
        <Indicator type="iOS" />
        <Indicator type="Bar" />
        <Indicator type="Pulse" />
        <Indicator type="Ball" />
        <Indicator type="Patman" />
        <Indicator type="Skype" />
        <Indicator waveMode="Outline" type="Wave" />
        <Indicator waveMode="Fill" type="Wave" />
        <Indicator type="Dot" />

        <BottomSheetBase ref={r => (this.ss = r)} />

        <ActionSheet ref={r => (this.act = r)}>
          <ActionSheetHeader message="asdfasdfasdfasdfasdfasdfsadf" />
          <ActionSheetItem text="Clear image 1" />
          <ActionSheetItem text="Clear image 1" />
          <ActionSheetItem text="Clear image 1" />
          <ActionSheetItem text="Clear image 1" />
        </ActionSheet>

        <CodeInput
          style={{ marginHorizontal: 20, marginTop: 20, marginBottom: 20 }}
          numberInputs={6}
          onSubmit={text => Navigator.showToast('OTP', 'OTP Code: ' + text)}
        />
      </ScrollView>
    )
  }
}

export default Home
