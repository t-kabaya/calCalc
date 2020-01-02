import { AsyncStorage } from 'react-native'
import Storage from 'react-native-storage'
import { any } from 'prop-types'

export const db = new Storage({ storageBackend: AsyncStorage })
// statelessな実装にして、テスタビリティを確保している。
// そのため、同じファイル内にあるdbを一旦exportしてから使用している。

// date-fnsのparseと、formatを使用し、可逆的な、Dateの保存を実現

export const save = (db: any, date: string, data: object): void => {
  db.save({
    key: 'calorieState' + date, // Note: Do not use underscore("_") in key!
    data
  })
}

export const load = async (db: any, date: string, data: object): any => {
  const loadResult = await db.load({
    key: 'loginState' + date, // Note: Do not use underscore("_") in key!
    data
  })

  return loadResult
}

// テスト用のモックdatabase
export const mockDb = {
  data: new Map(),
  save: ({ key, data }) => {
    mockDb.data.set(key, data)
  },
  load: ({ key }) => mockDb.data.get(key)
}
