import React, { useEffect } from 'react'
import { StyleSheet, Platform, StatusBar, SafeAreaView, AsyncStorage, View, TouchableOpacity, Text } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import CaloriePanel from '../component/CaloriePanel'
import CalorieChangeModal from '../component/CalorieChangeModal'
import WeekSelectFooter from '../component/WeekSelectFooter'
import TodayCalorieGoal from '../component/TodayCalorieGoal'
import { loadCalories, saveCalories } from '../database/database'
import { useState } from '../hook/HomeHook'
import { categoryEnum } from '../enum/categoryEnum'
import { createCurrentDateStr } from '../logic/HomeLogic'
import { format } from 'date-fns'
import ModalWebView from '../component/ModalWebView'
import { Ionicons } from '@expo/vector-icons';

const todaysCalorieGoal = 2000

const HomeContainer = () => {
  const { breakfastCal, setBreakfastCal, lunchCal, setLunchCal, dinnerCal, setDinnerCal, snackCal, setSnackCal, isModalVisible, setIsModalVisible, modalCategory, setModalCategory, modalCalorie, isSearchModalVisible, setIsSearchModalVisible, selectedDateStr, setSelectedDateStr } = useState()

  const totalCalorie = breakfastCal + lunchCal + dinnerCal + snackCal
  const selectedDayIndex = new Date(selectedDateStr).getDay()

  const onPressPanel = (category: string) => {
    setModalCategory(category)
    setIsModalVisible(true)
  }

  // componentDidMount相当
  useEffect(() => {
    loadAndSetState(format(new Date(), 'MM/dd/yyyy'))
  }, [])

  const setCalorie = (category: string, calorie: number): void => {
    let newCalories = {
      breakfastCal,
      lunchCal,
      dinnerCal,
      snackCal
    }

    switch (category) {
      case categoryEnum.breakfast:
        setBreakfastCal(calorie)
        newCalories.breakfastCal = calorie
        break;
      case categoryEnum.lunch:
        setLunchCal(calorie)
        newCalories.lunchCal = calorie
        break;
      case categoryEnum.dinner:
        setDinnerCal(calorie)
        newCalories.dinnerCal = calorie
        break;
      case categoryEnum.snack:
        setSnackCal(calorie)
        newCalories.snackCal = calorie
        break;
    }

    setIsModalVisible(false)
    // dbへと保存
    saveCalories(AsyncStorage, selectedDateStr, newCalories)
  }

  const onPressDay = async (dayIndex: any) => {
    const currentDateStr = createCurrentDateStr(dayIndex, new Date())

    // 今日の日付のindexを取得。
    // dayIndexと、sele
    // setDateByDiff(diffOfDate)
    setSelectedDateStr(currentDateStr)
    // await setSelectedDateStr()
    // 20190101
    loadAndSetState(currentDateStr)
  }

  const loadAndSetState = async (currentDateStr: string): Promise<void> => {
    const calorieState = await loadCalories(AsyncStorage, currentDateStr)
    setBreakfastCal(calorieState.breakfastCal)
    setLunchCal(calorieState.lunchCal)
    setDinnerCal(calorieState.dinnerCal)
    setSnackCal(calorieState.snackCal)
  }

  return (
    <SafeAreaView style={S.container}>
      {/* <TouchableOpacity style={S.openWebViewButton} onPress={() => setIsSearchModalVisible(true)}>
        <Text>カロリーを調べる</Text>
        <Ionicons name="logo-google" size={32} color="black" />
      </TouchableOpacity>
      <ModalWebView isSearchModalVisible={isSearchModalVisible} /> */}
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
        calories={modalCalorie}

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
  },
  openWebViewButton: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    padding: 4,
    backgroundColor: '#03DACE'
  }
})

export default HomeContainer
