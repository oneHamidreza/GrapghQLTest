import AsyncStorage from '@react-native-community/async-storage';
import SharedConfig from "../SharedConfig"
import {log} from "../utils/log"

export default class Storage {

    static set = async (key, value) => {
        try {
            await AsyncStorage.setItem(key, value);
        } catch (error) {
            log(error)
            // Error saving data
        }
    };

    static get = async (key) => {
        try {
            const value = await AsyncStorage.getItem(key);
            if (value !== null) {
                return value
            }
        } catch (error) {
            log(error)
            // Error retrieving data
        }
    };

    static remove = async (key) => {
        try {
            await AsyncStorage.removeItem(key);
        } catch (error) {
            // Error remove
        }
    };

    static async clear() {
        try {
            SharedConfig.clear()
            await AsyncStorage.clear();
        } catch (error) {
            // Error clear
        }
    };

    static async isAuth() {
        try {
            let auth = await this.getAuth()

            return auth != null;
        } catch (error) {
            log(error)
            return false
        }
    }

    static async setupWithSharedConfig() {
        try {
            await Storage.isAuth().then(async isAuth => {
                if (isAuth) {
                    await Storage.getAuth().then(auth => {
                        SharedConfig.auth = auth
                    })

                    await Storage.getUser().then(user => {
                        SharedConfig.user = user
                    })

                    await Storage.getAppUpdate().then(appUpdate => {
                        SharedConfig.appUpdateInfo = appUpdate
                    })
                }
                await SharedConfig.generateUUIDIfNeed()
            })

        } catch (e) {
            log(e, '#f00')
        }
    }

    static async getAuth() {
        let authObject
        try {
            authObject = await Storage.get('auth').then(u => {
                return JSON.parse(u)
            })
        } catch (e) {
            log(e.message)
        }
        return authObject
    }

    static async setAuth(value) {
        try {
            await Storage.set('auth', JSON.stringify(value))
            SharedConfig.auth = value
        } catch (e) {
            log(e.message)
        }
    }

    static async getDevice() {
        let device
        try {
            device = await Storage.get('device').then(u => {
                return JSON.parse(u)
            })
        } catch (e) {
            log(e.message)
        }
        return device
    }

    static async setDevice(value) {
        try {
            await Storage.set('device', JSON.stringify(value))
            SharedConfig.device = value
        } catch (e) {
            log(e.message)
        }
    }

    static async getUser() {
        let user
        try {
            user = await Storage.get('user').then(u => {
                return JSON.parse(u)
            })
        } catch (e) {
            user = null
        }
        return user
    }

    static async setUser(value) {
        try {
            await Storage.set('user', JSON.stringify(value))
            SharedConfig.user = value
        } catch (e) {
            log(e.message)
        }
    }

    static async updateUser(value) {
        try {
            let user = await Storage.getUser()
            let updatedUser = {...user, ...value}
            SharedConfig.user = updatedUser
            await Storage.setUser(updatedUser)
        } catch (e) {
            log(e.message)
        }
    }

    static async getTenant() {
        let tenant
        try {
            tenant = await Storage.get('tenant').then(u => {
                return JSON.parse(u)
            })
        } catch (e) {
            log(e.message)
        }
        return tenant
    }

    static async setTenant(value) {
        try {
            await Storage.set('tenant', JSON.stringify(value))
            SharedConfig.tenant = value
        } catch (e) {
            log(e.message)
        }
    }

    static async getAppUpdate() {
        let tenant
        try {
            tenant = await Storage.get('app_update').then(u => {
                return JSON.parse(u)
            })
        } catch (e) {
            log(e.message)
        }
        return tenant
    }

    static async setAppUpdate(value) {
        try {
            await Storage.set('app_update', JSON.stringify(value))
            SharedConfig.appUpdateInfo = value
        } catch (e) {
            log(e.message)
        }
    }


}