import { useState } from 'react'
import { startOfWeek, isBefore, format } from 'date-fns'
import getTodayName from '../utils/getDayUtils'
// import {save, load} from '../database/database'

// var result = format(
//   new Date(),
//   'YYYYMMDD'
// )

export const useCalorieState = () => {
  const [breakfastCal, setBreakFastCal] = useState(0)
  const [launchCal, setLaunchCal] = useState(0)
  const [dinnerCal, setDinnerCal] = useState(0)
  const [snackCal, setSnackCal] = useState(0)

  return {
    breakfastCal,
    setBreakFastCal,
    launchCal,
    setLaunchCal,
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
  const [selectedDay, setSelectedDay] = useState(getTodayName())

  return { selectedDay, setSelectedDay }
}
