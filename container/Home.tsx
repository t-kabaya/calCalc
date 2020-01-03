import React, { useState } from 'react';
import { StyleSheet, FlatList, Platform, StatusBar, SafeAreaView } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import CaloriePanel from '../component/CaloriePanel'
import CalorieChangeModal from '../component/CalorieChangeModal'
import WeekSelectFooter from '../component/WeekSelectFooter'
import getTodayName from '../utils/getDayUtils'
import TodayCalorieGoal from '../component/TodayCalorieGoal'
import { db } from '../utils/storageUtils'
import { startOfWeek, isBefore } from 'date-fns'

const useCalorieState = () => {
  const [breakfastCal, setBreakFastCal] = useState(0)
  const [launchCal, setLaunchCal] = useState(0)
  const [dinnerCal, setDinnerCal] = useState(0)
  const [snackCal, setSnackCal] = useState(0)

  return { breakfastCal, setBreakFastCal, launchCal, setLaunchCal, dinnerCal, setDinnerCal, snackCal, setSnackCal }
}

const useModalState = () => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [modalCategory, setModalCategory] = useState('')
  const [modalCalorie, setModalCalorie] = useState(0)

  return { isModalVisible, setIsModalVisible, modalCategory, setModalCategory, modalCalorie, setModalCalorie }
}

const useSelectedDayState = () => {
  const [selectedDay, setSelectedDay] = useState(getTodayName())

  return { selectedDay, setSelectedDay }
}

const calcTotalCalorie = () => {
  const { breakfastCal, launchCal, dinnerCal, snackCal, } = useCalorieState()

  return breakfastCal + launchCal + dinnerCal + snackCal
}

const todaysCalorieGoal = 2000

const closeModal = () => {
  this.setState({ isModalVisible: false })
}

const HookedHome = () => {
  const { breakfastCal, setBreakFastCal, launchCal, setLaunchCal, dinnerCal, setDinnerCal, snackCal, setSnackCal } = useCalorieState()
  const { isModalVisible, setIsModalVisible, modalCategory, setModalCategory, modalCalorie, setModalCalorie } = useModalState()

  const onPressPanel = (category, calorie) => {
    setModalCategory(category)
    setModalCalorie(calorie)
    setIsModalVisible(true)
  }

  const setCalorie = (category, calorie) => {

    switch (category) {
      case '朝食':
        setBreakFastCal(calorie)
        console.log(calorie)
        break;
      case '昼食':
        setLaunchCal(calorie)
        break;
      case '夕食':
        setDinnerCal(calorie)
        break;
      case 'おやつ':
        setSnackCal(calorie)
        break;


      default:
        break;
    }
    setIsModalVisible(false)
  }


  return (
    <SafeAreaView style={S.container}>
      <CaloriePanel
        category={'朝食'}
        calorie={breakfastCal}
        onPressPanel={() => onPressPanel('朝食', 0)} />
      <CaloriePanel
        category={'昼食'}
        calorie={launchCal}
        onPressPanel={() => console.log(777)} />
      <CaloriePanel
        category={'夕食'}
        calorie={dinnerCal}
        onPressPanel={() => console.log(777)} />
      <CaloriePanel
        category={'おやつ'}
        calorie={snackCal}
        onPressPanel={() => console.log(777)} />

      <CalorieChangeModal
        isModalVisible={isModalVisible}
        category={modalCategory}
        calorie={modalCalorie}

        closeModal={() => setIsModalVisible(false)}
        setCalorie={setCalorie}
      />

      <TodayCalorieGoal
        todaysCalorieGoal={todaysCalorieGoal}
        totalCalorie={calcTotalCalorie()}
        restCalorie={todaysCalorieGoal - calcTotalCalorie()}
      />

      {/* <WeekSelectFooter onPressDay={this.onPressDay} selectedDay={this.state.selectedDay} /> */}
    </SafeAreaView>
  )
}

export default HookedHome

const S = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Platform.OS == 'ios' ? 0 : StatusBar.currentHeight
  },
  listContainer: {
    width: wp(100),
    alignItems: 'center'
  }
})

const calorieState = {
  monday: {
    calorie: [
      {
        category: '朝食',
        calorie: 0,
        touchAble: true, editable: true
      },
      {
        category: '昼食',
        calorie: 0,
        touchAble: true, editable: true
      },
      {
        category: '夕食',
        calorie: 0,
        touchAble: true, editable: true
      },
      {
        category: '間食',
        calorie: 0,
        touchAble: true, editable: true
      }
    ]
  },
  tuesday: {
    calorie: [
      {
        category: '朝食',
        calorie: 0,
        touchAble: true, editable: true
      },
      {
        category: '昼食',
        calorie: 0,
        touchAble: true, editable: true
      },
      {
        category: '夕食',
        calorie: 0,
        touchAble: true, editable: true
      },
      {
        category: '間食',
        calorie: 0,
        touchAble: true, editable: true
      }
    ]
  },
  wednesday: {
    calorie: [
      {
        category: '朝食',
        calorie: 0,
        touchAble: true, editable: true
      },
      {
        category: '昼食',
        calorie: 0,
        touchAble: true, editable: true
      },
      {
        category: '夕食',
        calorie: 0,
        touchAble: true, editable: true
      },
      {
        category: '間食',
        calorie: 0,
        touchAble: true, editable: true
      }
    ]
  },
  thursday: {
    calorie: [
      {
        category: '朝食',
        calorie: 0,
        touchAble: true, editable: true
      },
      {
        category: '昼食',
        calorie: 0,
        touchAble: true, editable: true
      },
      {
        category: '夕食',
        calorie: 0,
        touchAble: true, editable: true
      },
      {
        category: '間食',
        calorie: 0,
        touchAble: true, editable: true
      }
    ]
  },
  friday: {
    calorie: [
      {
        category: '朝食',
        calorie: 0,
        touchAble: true, editable: true
      },
      {
        category: '昼食',
        calorie: 0,
        touchAble: true, editable: true
      },
      {
        category: '夕食',
        calorie: 0,
        touchAble: true, editable: true
      },
      {
        category: '間食',
        calorie: 0,
        touchAble: true, editable: true
      }
    ]
  },
  saturday: {
    calorie: [
      {
        category: '朝食',
        calorie: 0,
        touchAble: true, editable: true
      },
      {
        category: '昼食',
        calorie: 0,
        touchAble: true, editable: true
      },
      {
        category: '夕食',
        calorie: 0,
        touchAble: true, editable: true
      },
      {
        category: '間食',
        calorie: 0,
        touchAble: true, editable: true
      }
    ]
  },
  sunday: {
    calorie: [
      {
        category: '朝食',
        calorie: 0,
        touchAble: true, editable: true
      },
      {
        category: '昼食',
        calorie: 0,
        touchAble: true, editable: true
      },
      {
        category: '夕食',
        calorie: 0,
        touchAble: true, editable: true
      },
      {
        category: '間食',
        calorie: 0,
        touchAble: true, editable: true
      }
    ]
  }
}
