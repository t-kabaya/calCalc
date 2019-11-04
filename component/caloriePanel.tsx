import React from 'react';
import { StyleSheet, Text } from 'react-native'
import { Card } from 'native-base'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


export default function calorieCard(props) {
  return (
    <Card style={S.container}>
      <Text style={S.categoryText}>朝食</Text>
      <Text style={S.calorieValueText}>0</Text>
      <Text style={S.calorieUnitText}>cal</Text>
    </Card> 
  )
}

const S = StyleSheet.create({
  container: {
    height: hp('13%'),
    width: wp('84%'),
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryText: {
    position: 'absolute',
    left: wp('10%'),
    fontSize: 30
  },
  calorieValueText: {
    position: 'absolute',
    right: wp(20),
    fontSize: 30
  },
  calorieUnitText: {
    position: 'absolute',
    right: wp(10),
    fontSize: 20
  }
})
