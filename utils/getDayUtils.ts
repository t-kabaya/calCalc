import { dayEnum } from '../assets/enum/dayEnum'

const getTodayName = () => {
  const dayIndex = new Date().getDay()

  switch (dayIndex) {
    case 0:
      return dayEnum.sunday
      break
    case 1:
      return dayEnum.monday
      break
    case 2:
      return dayEnum.tuesday
      break
    case 3:
      return dayEnum.wednesday
      break
    case 4:
      return dayEnum.thursday
      break
    case 5:
      return dayEnum.friday
      break
    case 6:
      return dayEnum.saturday
      break
  }
}

export default getTodayName