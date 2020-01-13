import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Modal, TextInput } from 'react-native'
import { Card } from 'native-base'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

type PropsType = {
  isModalVisible: boolean,
  category: string,
  calories: number,
  closeModal(): void,
  setCalorie(category: string, calorie: number): void
}

const CalorieChangeModal = (props: PropsType) => {
  const [calorie, setCalorie] = useState(0)
  const inputEl = useRef(null)

  useEffect(() => {
    if (props.isModalVisible) {
      // CARE: androidの為にsetTimeoutが必要
      setTimeout(() => inputEl.current.focus(), 150)
    }

  })

  return (
    <Modal
      animationType="fade"
      transparent
      visible={props.isModalVisible}
      onRequestClose={() => props.closeModal()}
    >
      <View style={S.darkContainer}>
        <Card style={S.container}>
          <Text style={S.categoryText}>{props.category}</Text>
          <TextInput
            style={S.calorieValueText}
            onChangeText={calorie => setCalorie(parseInt(calorie))}
            placeholder={JSON.stringify(props.calories)}
            autoFocus
            keyboardType="number-pad"
            ref={inputEl}
            onEndEditing={() => {
              props.closeModal()
              props.setCalorie(props.category, calorie)
            }}
          />
          <Text style={S.calorieUnitText}>cal</Text>
        </Card>
      </View>
    </Modal>
  )
}


const S: any = StyleSheet.create({
  darkContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  container: {
    left: wp(7),
    right: wp(7),
    top: hp(35),
    marginTop: 22,
    backgroundColor: 'white',
    width: wp(86),
    height: hp(13),
    borderWidth: 1,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center'
  },
  innerContainer: {
    flexDirection: 'row',
    justifyContent: 'center'
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
  calorieInput: {
    fontSize: 20
  }
})

export default CalorieChangeModal
