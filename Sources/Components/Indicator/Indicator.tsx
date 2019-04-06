import React from 'react'
import { IndicatorProps } from '@Types'
import AndroidIndicator from './AndroidIndicator'
import BallIndicator from './BallIndicator'
import BarIndicator from './BarIndicator'
import DotIndicator from './DotIndicator'
import IOSIndicator from './IOSIndicator'
import PatmanIndicator from './PatmanIndicator'
import PulseIndicator from './PulseIndicator'
import SkypeIndicator from './SkypeIndicator'
import WaveIndicator from './WaveIndicator'

type Props = IndicatorProps

class Indicator extends React.PureComponent<Props> {
  render() {
    const { type, ...props } = this.props

    switch (type) {
      case 'Ball':
        return <BallIndicator {...props} />
      case 'iOS':
        return <IOSIndicator {...props} />
      case 'Bar':
        return <BarIndicator {...props} />
      case 'Dot':
        return <DotIndicator {...props} />
      case 'Patman':
        return <PatmanIndicator {...props} />
      case 'Pulse':
        return <PulseIndicator {...props} />
      case 'Skype':
        return <SkypeIndicator {...props} />
      case 'Wave':
        return <WaveIndicator {...props} />
    }
    return <AndroidIndicator {...props} />
  }
}

export default Indicator
