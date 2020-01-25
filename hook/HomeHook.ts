import { format } from 'date-fns'
import { hookFactory } from './HookHelper'
const easyHooks = require('easy-hooks')

type useStateType = {
  lunchCal: number
  setLunchCal: (launchCal: number) => void
  breakfastCal: number
  setBreakfastCal: (breakfastCal: number) => void
  dinnerCal: number
  setDinnerCal: (dinnerCal: number) => void
  snackCal: number
  setSnackCal: (snackCal: number) => void
  isModalVisible: boolean
  setIsModalVisible: (isModalVisible: boolean) => void
  isSearchModalVisible: boolean
  setIsSearchModalVisible: (isSearchModalVisible: boolean) => void
  modalCategory: string
  setModalCategory: (modalCategory: string) => void
  modalCalorie: number
  setModalCalorie: (modalCalorie: number) => void
  selectedDateStr: string
  setSelectedDateStr: (selectedDateStr: string) => void
}

export const useState = (): useStateType =>
  hookFactory([
    ['lunchCal', 0],
    ['breakfastCal', 0],
    ['dinnerCal', 0],
    ['snackCal', 0],
    ['isModalVisible', false],
    ['isSearchModalVisible', false],
    ['modalCategory', ''],
    ['modalCalorie', 0],
    ['selectedDateStr', format(new Date(), 'MM/dd/yyyy')]
  ])
