import React from 'react';
import { StyleSheet, Text } from 'react-native'
import { Card } from 'native-base'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


export default function weekSelectFooter({category, calorie}) {
  return (
    <Card style={S.container}>
      <Text style={S.categoryText}>{category}</Text>
      <Text style={S.calorieValueText}>{calorie}</Text>
      <Text style={S.calorieUnitText}>cal</Text>
    </Card> 
  )
}

const S = StyleSheet.create({
  container: {
    height: hp('13%'),
    width: wp('86%'),
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryText: {
    position: 'absolute',
    left: wp('8%'),
    fontSize: 22
  },
  calorieValueText: {
    position: 'absolute',
    right: wp(15),
    fontSize: 22
  },
  calorieUnitText: {
    position: 'absolute',
    right: wp(8),
    fontSize: 17
  }
})
