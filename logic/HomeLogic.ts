import { addDays, format } from 'date-fns'

export type day = 0 | 1 | 2 | 3 | 4 | 5 | 6

export const createCurrentDateStr = (tappedDay: day, today: Date): string => {
  const todaysday = today.getDay()
  const tappedDate = addDays(today, tappedDay - todaysday)

  return format(tappedDate, 'MM/dd/yyyy')
  // ケース１
  // 今日が日曜日で、ユーザーが、水曜日をタップ
  // todayIndex = 0, currentDayIndex = 2
  // ケース２
  // 今日が木曜日で、ユーザーが火曜日をタップ
  // todayIndex = 4, currentDayIndex = 2
}
