import { AsyncStorage } from 'react-native'

// const { AsyncStorage } = require('react-native')
// const Storage = require('react-native-storage')
// import { any } from 'prop-types'
// import { isNullOrUndefined } from 'util'

// statelessな実装にして、テスタビリティを確保している。
// そのため、同じファイル内にあるdbを一旦exportしてから使用している。

// date-fnsのparseと、formatを使用し、可逆的な、Dateの保存を実現

type CaloriesType = {
  breakfastCal: number
  lunchCal: number
  dinnerCal: number
  snackCal: number
}

const initialCalories = {
  breakfastCal: 0,
  lunchCal: 0,
  dinnerCal: 0,
  snackCal: 0
}

export const keyPrefix = 'calorieState'

export const saveCalories = async (
  db: AsyncStorage,
  date: string,
  value: CaloriesType
): Promise<void> => {
  try {
    console.log('save: ' + date + JSON.stringify(value))
    await db.setItem(keyPrefix + date, JSON.stringify(value))
  } catch {
    console.error('error at save')
  }
}

export const loadCalories = async (
  db: AsyncStorage,
  date: string
): Promise<CaloriesType> => {
  try {
    const item = await db.getItem(keyPrefix + date)
    if (item) {
      console.log('load: ' + date + JSON.stringify(item))
      return JSON.parse(item)
    } else {
      return initialCalories
    }
  } catch {
    console.error('error at load')
    return initialCalories
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
