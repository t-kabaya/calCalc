import { useState } from 'react'
import { format, addDays } from 'date-fns'
const easyHooks = require('easy-hooks')

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
  const hooks = hookFactory([
    ['isModalVisible', false],
    ['isSearchModalVisible', false],
    ['modalCategory', ''],
    ['modalCalorie', 0]
  ])

  const onPressPanel = (category: string) => {
    hooks.setModalCategory(category)
    hooks.setIsModalVisible(true)
  }

  return {
    ...hooks,
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
