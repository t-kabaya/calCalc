import React from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback, FlatList } from 'react-native'
import { Card } from 'native-base'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'
import {dayEnum} from '../assets/enum/dayEnum'

const weekData = [
  {dayName: '月', dayKey: dayEnum.monday},
  {dayName: '火', dayKey: dayEnum.tuesday},
  {dayName: '水', dayKey: dayEnum.wednesday},
  {dayName: '木', dayKey: dayEnum.thursday},
  {dayName: '金', dayKey: dayEnum.friday},
  {dayName: '土', dayKey: dayEnum.saturday},
  {dayName: '日', dayKey: dayEnum.sunday},
]


const weekSelectFooter = (props) => {

  dayItem = ({item}) => {
    return(
      <TouchableWithoutFeedback onPress={() => props.onPressDay(item.dayKey)}>
        <View style={props.selectedDay === item.dayKey ? S.selectedDay : S.defaultDay} >
          <Text>{item.dayName}</Text>
        </View>
      </TouchableWithoutFeedback>
    )
  }

  return (
    <Card style={S.container}>
      <FlatList data={weekData} renderItem={item => this.dayItem(item)} extraData={props} />
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
  },
  defaultDay: {

  }, 
  selectedDay: {
    backgroundColor: 'red'
  }
})

export default weekSelectFooter
