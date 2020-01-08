import { useState } from 'react'
import { format, addDays } from 'date-fns'

// @param [[hookname, initialState]]
const hookFactory = (inputs: any) => {
  const hooks = {}

  inputs.forEach(input => {
    const [state, setState] = useState(input[1])
    hooks[input[0]] = state
    hooks['set' + capitalize(input[0])] = setState
  })

  return hooks
}

const capitalize = (s: string) => {
  return s.charAt(0).toUpperCase() + s.slice(1)
}

export const useCalorieState = () => {
  const state = [
    ['lunchCal', 0],
    ['breakfastCal', 0],
    ['dinnerCal', 0],
    ['snackCal', 0]
  ]

  const hooks = hookFactory(state)

  const totalCalorie =
    hooks.breakfastCal + hooks.lunchCal + hooks.dinnerCal + hooks.snackCal

  return {
    ...hooks,
    totalCalorie
  }
}

export const useModalState = () => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [modalCategory, setModalCategory] = useState('')
  const [modalCalorie, setModalCalorie] = useState(0)

  const onPressPanel = (category: string) => {
    setModalCategory(category)
    setIsModalVisible(true)
  }

  return {
    isModalVisible,
    setIsModalVisible,
    modalCategory,
    setModalCategory,
    modalCalorie,
    setModalCalorie,
    onPressPanel
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
