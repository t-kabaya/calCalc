import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Modal, TextInput } from 'react-native'
import { Card } from 'native-base'
import { WebView } from 'react-native-webview'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

type PropsType = {
  isSearchModalVisible: boolean,
  closeModal(): void,
  setCalorie(category: string, calorie: number): void
}

const ModalWebView = (props: PropsType) => {
  return (
    <Modal
      animationType="fade"
      transparent
      visible={props.isSearchModalVisible}
      onRequestClose={() => props.closeModal()}
    >
      <View style={S.darkContainer}>
        <View style={S.webViewContainer}>
          <WebView
            source={{ uri: 'https://www.google.com/' }}
            style={{ width: wp(90), height: hp(90) }}
          />
        </View>
      </View>
    </Modal >
  )
}


const S: any = StyleSheet.create({
  darkContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  webViewContainer: {
    width: wp(90),
    height: hp(90),
  },
  container: {
    left: wp(7),
    right: wp(7),
    top: hp(35),
    bottom: hp(35),
    marginTop: 22,
    marginBottom: 22,
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

export default ModalWebView
