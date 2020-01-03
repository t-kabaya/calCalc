const assert = require('assertz')
// const db = require('dummyAsyncStorage')
const db = require('../mockDatabase.js')
// const Storage = require('react-native-storage')
const { save, load } = require('../database.ts')

// adds 1 + 1 to equal 2
const date = '20200101'
const data = [
  {
    category: '朝食',
    calorie: 0,
    touchAble: true,
    editable: true
  },
  {
    category: '昼食',
    calorie: 0,
    touchAble: true,
    editable: true
  },
  {
    category: '夕食',
    calorie: 0,
    touchAble: true,
    editable: true
  },
  {
    category: '間食',
    calorie: 0,
    touchAble: true,
    editable: true
  }
]

save(db, date, data).then(response => {
  console.log(response)
  const result = db.getItem('calorieState' + date)
  assert(result, response, 'first test')
})
