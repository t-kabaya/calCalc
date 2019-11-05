import React from 'react';
import { StyleSheet, Text, View, Modal, TextInput } from 'react-native'
import { Card } from 'native-base'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default class calorieChangeModal extends React.Component {
  state = {
    calorie: 0
  }

  render() {
    const props = this.props
    const state = this.state
    return (
      <Modal
      animationType="fade"
      transparent={true}
      visible={props.isModalVisible}
      // visible={true}
      onRequestClose={() => {
        props.closeModal()
      }}>
      <View style={S.darkContainer}>
        <Card style={S.container}>
          <Text style={S.categoryText}>{props.category}</Text>
          <TextInput
            style={S.calorieValueText}
            onChangeText={calorie => this.setState({calorie: parseInt(calorie)})}
            defaultValue={JSON.stringify(props.calorie)}
            autoFocus
            keyboardType="number-pad"
            onEndEditing={() => {
              props.closeModal()
              props.setCalorie(this.state.calorie)
            }}
          />
          <Text style={S.calorieUnitText}>cal</Text>
        </Card>
      </View>
    </Modal>
    )
  }
}

const S = StyleSheet.create({
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
