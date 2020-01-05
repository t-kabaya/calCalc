import dummyDb from 'dummyAsyncStorage'
import { keyPrefix, loadCalories } from '../database'

const dummyDate = '30/12/2020'

it('works', () => {
  dummyDb.setItem(keyPrefix + dummyDate, JSON.stringify({ foo: 'foo' }))
  const actual = loadCalories(dummyDb, dummyDate)
  expect(actual).toBe(1)
})
