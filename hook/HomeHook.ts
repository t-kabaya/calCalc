import { useState } from 'react'
import { startOfWeek, isBefore, format, parse, addDays } from 'date-fns'
import getTodayName from '../utils/getDayUtils'
// import {save, load} from '../database/database'

// var result = format(
//   new Date(),
//   'YYYYMMDD'
// )

export const useCalorieState = () => {
  const [breakfastCal, setBreakFastCal] = useState(0)
  const [lunchCal, setLunchCal] = useState(0)
  const [dinnerCal, setDinnerCal] = useState(0)
  const [snackCal, setSnackCal] = useState(0)

  return {
    breakfastCal,
    setBreakFastCal,
    lunchCal,
    setLunchCal,
    dinnerCal,
    setDinnerCal,
    snackCal,
    setSnackCal
  }
}

export const useModalState = () => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [modalCategory, setModalCategory] = useState('')
  const [modalCalorie, setModalCalorie] = useState(0)

  return {
    isModalVisible,
    setIsModalVisible,
    modalCategory,
    setModalCategory,
    modalCalorie,
    setModalCalorie
  }
}

export const useSelectedDayState = () => {
  const [selectedDateStr, setSelectedDateStr] = useState(
    // date-fnsのparseで使用するため、月/日/年と言う並び順にしている。
    format(new Date(), 'MM/dd/yyyy')
  )

  const setDateByDiff = diffOfDate => {
    const newSelectedDate = addDays(new Date(selectedDateStr), diffOfDate)
    const currentDate: string = format(newSelectedDate, 'MM/dd/yyyy')
    setSelectedDateStr(currentDate)

    return selectedDateStr
  }

  const selectedDayIndex = new Date(selectedDateStr).getDay()

  return {
    selectedDayIndex,
    selectedDateStr,
    setSelectedDateStr,
    setDateByDiff
  }
}
