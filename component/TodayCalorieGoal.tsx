import React from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback, FlatList } from 'react-native'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'

const todayCalorieGoal = (props) => {
  return (
    <View style={S.container}>
      <View style={S.textBlock}>
        <Text style={S.calorieValueText}>2000</Text>
        <Text style={S.smallGrayText}>1日の目標</Text>
      </View>
    
      <Text>-</Text>

      <View style={S.textBlock}>
        <Text style={S.calorieValueText}>2000</Text>
        <Text style={S.smallGrayText}>食べたもの</Text>
      </View>

      <Text>＝</Text>

      <View style={S.textBlock}>
        <Text style={S.calorieValueText}>100</Text>
        <Text style={S.smallGrayText}>残り</Text>
      </View>
    </View> 
  )
}

const S = StyleSheet.create({
  container: {
    height: hp('11%'),
    width: wp('100%'),
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  textBlock: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  calorieValueText: {
    fontSize: 20
  },
  smallGrayText: {
    fontSize: 10
  }
})

export default todayCalorieGoal
