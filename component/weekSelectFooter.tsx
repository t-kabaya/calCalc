import React from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback, FlatList } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { dayEnum } from '../enum/dayEnum'

const weekData = [
  { dayName: '日', dayKey: dayEnum.sunday },
  { dayName: '月', dayKey: dayEnum.monday },
  { dayName: '火', dayKey: dayEnum.tuesday },
  { dayName: '水', dayKey: dayEnum.wednesday },
  { dayName: '木', dayKey: dayEnum.thursday },
  { dayName: '金', dayKey: dayEnum.friday },
  { dayName: '土', dayKey: dayEnum.saturday },
]


const WeekSelectFooter = (props) => {
  dayItem = ({ item, index }) => {
    return (
      <TouchableWithoutFeedback onPress={() => props.onPressDay(index)}>
        <View style={props.selectedDayIndex === index ? S.selectedDay : S.defaultDay} >
          <Text style={S.dayText}>{item.dayName}</Text>
        </View>
      </TouchableWithoutFeedback>
    )
  }

  return (
    <View style={S.container}>
      <FlatList
        data={weekData}
        renderItem={item => this.dayItem(item)}
        horizontal
        extraData={props}
        contentContainerStyle={S.listContainer}
        scrollEnabled={false}
      />
    </View>
  )
}

const S = StyleSheet.create({
  container: {
    height: hp('11%'),
    width: wp('100%'),
    backgroundColor: '#fff',
    // flexDirection: 'row',
    alignItems: 'center'
  },
  listContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
    width: wp(90)
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
    borderRadius: 50,
    width: wp(12),
    height: wp(12),
    justifyContent: 'center',
    alignItems: 'center'
  },
  selectedDay: {
    backgroundColor: '#03DACE',
    borderRadius: 50,
    width: wp(12),
    height: wp(12),
    justifyContent: 'center',
    alignItems: 'center'
  },
  dayContainer: {
    width: wp(10)
  },
  dayText: {
    fontSize: wp(6),
    fontWeight: 'bold'
  }
})

export default WeekSelectFooter
