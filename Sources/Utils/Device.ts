import { Dimensions, Platform, StatusBar, PixelRatio } from 'react-native'

const { width, height } = Dimensions.get('window')

const _isAndroid = Platform.OS == 'android'
const _version = Platform.Version

const _pixelDensity = PixelRatio.get()
const _adjustedWidth = width * _pixelDensity
const _adjustedHeight = height * _pixelDensity

type DeviceType = 'Phone' | 'Tablet'

function isAndroid(): boolean {
  return _isAndroid
}

function version(): string | number {
  return _version
}

function getScreenSize(): { width: number; height: number } {
  return { width, height }
}

function isIphoneX() {
  return Platform.OS === 'ios' && (height === 812 || width === 812 || (height === 896 || width === 896))
}

function ifIphoneX(iphoneXStyle: any, regularStyle: any) {
  if (isIphoneX()) {
    return iphoneXStyle
  }
  return regularStyle
}

function getStatusBarHeight(safe?: boolean) {
  return Platform.select({
    ios: ifIphoneX(safe ? 44 : 30, 20),
    android: StatusBar.currentHeight
  })
}

function getHeaderHeight() {
  const headerHeight = Platform.OS == 'android' ? 56 : 44
  return headerHeight
}

function deviceType(): DeviceType {
  let type: DeviceType = 'Phone'
  if (_pixelDensity < 2 && (_adjustedWidth >= 1000 || _adjustedHeight >= 1000)) {
    type = 'Tablet'
  } else if (_pixelDensity === 2 && (_adjustedWidth >= 1920 || _adjustedHeight >= 1920)) {
    type = 'Tablet'
  }
  return type
}

export default {
  getScreenSize,
  isAndroid,
  version,
  getStatusBarHeight,
  getHeaderHeight,
  width,
  height,
  isIphoneX,
  ifIphoneX,
  deviceType
}
