import uuid from 'react-native-uuid'
import Storage from "./storage/storage"
import {log} from "./utils/log"
import {Platform} from "react-native"

class SharedConfig {

  static getAppId() {
    return 'GraphTest'
  }

  static getLogo() {
    return 'NOICON'
    // return require('../assets/logo.png')
  }

  static getAppName() {
    return 'Graph-Test-App'
  }

  static getAppPersianName() {
    return 'Graph'
  }

  static apiUrl = `http://192.168.1.107:8069/`
  static homeUrl = `${SharedConfig.apiUrl}web/`
  static termsUrl = `${SharedConfig.homeUrl}terms?tid=`
  static supportUrl = `${SharedConfig.homeUrl}support?tid=`
  static aboutAppUrl = `${SharedConfig.homeUrl}aboutApp?tid=`
  static aboutUrl = `${SharedConfig.homeUrl}about?tid=`

  static device = {
    uuid: '',
    pid: '',
    os: Platform.OS,
  }
  static auth = {
    token: '',
    refreshToken: ''
  }
  static user = {}

  static appUpdateInfo = {
    android: {},
    ios: {},
    web: {}
  }

  static generateWebViewUrl(url) {
    return url + this.getAppId()
  }

  static async generateUUIDIfNeed() {
    if (SharedConfig.device.uuid)
      return

    let device = await Storage.getDevice()
    if (device && device.uuid) {
      SharedConfig.device.uuid = device.uuid
      log('saved uuid : ' + device.uuid)
      return
    }

    let uuid = uuid.v1()
    SharedConfig.device.uuid = uuid
    await Storage.setDevice(SharedConfig.device)
    log('generated uuid : ' + uuid)
  }

  static clear() {
    this.auth = {}
    this.user = {}
  }
}

export default SharedConfig;
