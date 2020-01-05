import React from 'react';
import { StyleSheet, Platform, StatusBar, SafeAreaView, AsyncStorage } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import CaloriePanel from '../component/CaloriePanel'
import CalorieChangeModal from '../component/CalorieChangeModal'
import WeekSelectFooter from '../component/WeekSelectFooter'
import TodayCalorieGoal from '../component/TodayCalorieGoal'
import { loadCalories, saveCalories } from '../database/database'
import { useCalorieState, useModalState, useSelectedDayState } from '../hook/HomeHook'
import { categoryEnum } from '../assets/enum/categoryEnum'

const todaysCalorieGoal = 2000

const HomeContainer = () => {
  const { breakfastCal, setBreakFastCal, lunchCal, setLunchCal, dinnerCal, setDinnerCal, snackCal, setSnackCal } = useCalorieState()
  const { isModalVisible, setIsModalVisible, modalCategory, setModalCategory, modalCalorie, setModalCalorie } = useModalState()
  const { selectedDayIndex, selectedDateStr, setSelectedDateStr, setDateByDiff } = useSelectedDayState()

  const onPressPanel = (category: string) => {
    setModalCategory(category)
    setIsModalVisible(true)
  }

  const setCalorie = (category: string, calorie: number) => {

    let newCalories = {
      breakfastCal,
      lunchCal,
      dinnerCal,
      snackCal
    }

    switch (category) {
      case categoryEnum.breakfast:
        setBreakFastCal(calorie)
        newCalories.breakfastCal = calorie
        console.log(calorie)
        break;
      case categoryEnum.lunch:
        setLunchCal(calorie)
        newCalories.lunchCal = calorie
        break;
      case categoryEnum.dinner:
        setDinnerCal(calorie)
        newCalories.breakfastCal = calorie
        break;
      case categoryEnum.snack:
        setSnackCal(calorie)
        newCalories.breakfastCal = calorie
        break;
    }

    setIsModalVisible(false)
    // dbへと保存
    saveCalories(AsyncStorage, selectedDateStr, newCalories)
  }

  const totalCalorie = breakfastCal + lunchCal + dinnerCal + snackCal

  const onPressDay = async (dayIndex) => {
    // TODO: 曜日と、日付を両方管理しているので、二重管理になる。要リファクタ。
    const diffOfDate = dayIndex - selectedDayIndex
    // console.log({}})
    const newDateStr: string = setDateByDiff(diffOfDate)
    // await setSelectedDateStr()
    // 20190101
    const calorieState = await loadCalories(AsyncStorage, newDateStr)
    setBreakFastCal(calorieState.breakfastCal)
    setLunchCal(calorieState.lunchCal)
    setDinnerCal(calorieState.dinnerCal)
    setSnackCal(calorieState.snackCal)
  }

  return (
    <SafeAreaView style={S.container}>
      <CaloriePanel
        category={'朝食'}
        calorie={breakfastCal}
        onPressPanel={() => onPressPanel(categoryEnum.breakfast)} />
      <CaloriePanel
        category={'昼食'}
        calorie={lunchCal}
        onPressPanel={() => onPressPanel(categoryEnum.lunch)} />
      <CaloriePanel
        category={'夕食'}
        calorie={dinnerCal}
        onPressPanel={() => onPressPanel(categoryEnum.dinner)} />
      <CaloriePanel
        category={'おやつ'}
        calorie={snackCal}
        onPressPanel={() => onPressPanel(categoryEnum.snack)} />

      <CalorieChangeModal
        isModalVisible={isModalVisible}
        category={modalCategory}
        calorie={modalCalorie}

        closeModal={() => setIsModalVisible(false)}
        setCalorie={setCalorie}
      />

      <TodayCalorieGoal
        todaysCalorieGoal={todaysCalorieGoal}
        totalCalorie={totalCalorie}
        restCalorie={todaysCalorieGoal - totalCalorie}
      />

      <WeekSelectFooter onPressDay={onPressDay} selectedDayIndex={selectedDayIndex} />
    </SafeAreaView>
  )
}

export default HomeContainer

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
