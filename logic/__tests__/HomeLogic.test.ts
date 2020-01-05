import { createCurrentDateStr, day } from '../HomeLogic'

// 1月５日は、日。1月7日は火
it('must cerate dateStr from today(Date) and tapped(Day)', () => {
  const inputs = [
    {
      // 火曜日
      tappedDay: 2,
      // // 今日（1月5日日曜日）
      today: new Date(2020, 0, 6),
      expected: '01/07/2020'
    },
    {
      //　日曜日
      tappedDay: 0,
      // 今日（1月7日火曜日）
      today: new Date(2020, 0, 8),
      expected: '01/05/2020'
    }
  ]

  inputs.forEach(x => _createCurrentDateStr(x.tappedDay, x.today, x.expected))
})

const _createCurrentDateStr = (
  tappedDay: day,
  today: Date,
  expected: string
) => {
  const actual = createCurrentDateStr(tappedDay, today)
  expect(actual).toBe(expected)
}
