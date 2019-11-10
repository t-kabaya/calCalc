import React from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback, FlatList } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'

const todayCalorieGoal = (props) => {
  return (
    <View style={S.container}>
      <View style={S.leftTextBlock}>
        <Text style={S.calorieValueText}>{props.todaysCalorieGoal}</Text>
        <Text style={S.smallGrayText}>1日の目標</Text>
      </View>

      <Text style={S.subtractionOperatorText}>-</Text>

      <View style={S.centerTextBlock}>
        <Text style={S.calorieValueText}>{props.totalCalorie}</Text>
        <Text style={S.smallGrayText}>食べたもの</Text>
      </View>

      <Text style={S.equalOperatorText}>＝</Text>

      <View style={S.rightTextBlock}>
        <Text style={S.calorieValueText}>{props.restCalorie}</Text>
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
    justifyContent: 'space-around'
  },
  leftTextBlock: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  centerTextBlock: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  rightTextBlock: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  calorieValueText: {
    fontSize: wp(7)
  },
  smallGrayText: {
    fontSize: wp(3)
  },
  subtractionOperatorText: {
    fontSize: 20
  },
  equalOperatorText: {
    fontSize: 20
  }
})

export default todayCalorieGoal
