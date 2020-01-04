const { AsyncStorage } = require('react-native')
import Storage from 'react-native-storage'
// import { any } from 'prop-types'
// import { isNullOrUndefined } from 'util'

exports.db = new Storage({ storageBackend: AsyncStorage })

// statelessな実装にして、テスタビリティを確保している。
// そのため、同じファイル内にあるdbを一旦exportしてから使用している。

// date-fnsのparseと、formatを使用し、可逆的な、Dateの保存を実現

const keyPrefix = 'calorieState'

// export const save = (db: any, date: string, data: object): void => {
//   db.save({
//     key: keyPrefix + date, // Note: Do not use underscore("_") in key!
//     data
//   })
// }
exports.save = async (db, date, value) => {
  try {
    const key = keyPrefix + date
    await db.setItem(key, JSON.stringify(value))
    return true
  } catch {
    console.error('error at save')
  }
}

// export const load = async (db: any, date: string, data: object): any => {
//   const loadResult = await db.load({
//     key: keyPrefix + date, // Note: Do not use underscore("_") in key!
//     data
//   })

//   return loadResult
// }

exports.load = async (db, date) => {
  try {
    const item = await db.getItem(keyPrefix + date)
    return JSON.parse(item)
  } catch (e) {
    console.error('error at load: ' + e)
    return {
      breakFastCal: 0,
      launchCal: 0,
      dinnerCal: 0,
      snackCal: 0
    }
  }
}

// テスト用のモックdatabase
// export const mockDb = {
//   data: new Map(),
//   save: ({ key, data }) => {
//     mockDb.data.set(key, data)
//   },
//   load: ({ key }) => mockDb.data.get(key)
// }
