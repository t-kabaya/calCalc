import React, { useState } from 'react';
import { StyleSheet, FlatList, Platform, StatusBar, SafeAreaView } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import CaloriePanel from '../component/CaloriePanel'
import CalorieChangeModal from '../component/CalorieChangeModal'
import WeekSelectFooter from '../component/WeekSelectFooter'
import getTodayName from '../utils/getDayUtils'
import TodayCalorieGoal from '../component/TodayCalorieGoal'
import { db, load, save } from '../database/database.ts'
import { startOfWeek, isBefore } from 'date-fns'
import { useCalorieState, useModalState, useSelectedDayState } from '../hook/HomeHook'
import { categoryEnum } from '../assets/enum/categoryEnum.ts'

const todaysCalorieGoal = 2000

const HomeContainer = () => {
  const { breakfastCal, setBreakFastCal, launchCal, setLaunchCal, dinnerCal, setDinnerCal, snackCal, setSnackCal } = useCalorieState()
  const { isModalVisible, setIsModalVisible, modalCategory, setModalCategory, modalCalorie, setModalCalorie } = useModalState()
  const { selectedDayIndex, selectedDateStr, setSelectedDateStr, setDateByDiff } = useSelectedDayState()

  const onPressPanel = (category) => {
    setModalCategory(category)
    setIsModalVisible(true)
  }

  const setCalorie = (category, calorie) => {

    switch (category) {
      case categoryEnum.breakFast:
        setBreakFastCal(calorie)
        console.log(calorie)
        break;
      case categoryEnum.launch:
        setLaunchCal(calorie)
        break;
      case categoryEnum.dinner:
        setDinnerCal(calorie)
        break;
      case categoryEnum.snack:
        setSnackCal(calorie)
        break;
    }

    setIsModalVisible(false)
    // dbへと保存
    save(db, selectedDateStr, { breakfastCal, launchCal, dinnerCal, snackCal })
  }

  const totalCalorie = breakfastCal + launchCal + dinnerCal + snackCal

  const onPressDay = async (dayIndex) => {
    // TODO: 曜日と、日付を両方管理しているので、二重管理になる。要リファクタ。
    const diffOfDate = dayIndex - selectedDayIndex
    await setDateByDiff(diffOfDate)
    // await setSelectedDateStr()
    // 20190101
    const calorieState = await load(db, selectedDateStr)
    setBreakFastCal(calorieState.breakFastCal)
    setLaunchCal(calorieState.launchCal)
    setDinnerCal(calorieState.dinnerCal)
    setSnackCal(calorieState.snackCal)
  }

  return (
    <SafeAreaView style={S.container}>
      <CaloriePanel
        category={'朝食'}
        calorie={breakfastCal}
        onPressPanel={() => onPressPanel(categoryEnum.breakFast)} />
      <CaloriePanel
        category={'昼食'}
        calorie={launchCal}
        onPressPanel={() => onPressPanel(categoryEnum.launch)} />
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
