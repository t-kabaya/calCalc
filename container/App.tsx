import React from 'react';
import { StyleSheet, FlatList, Platform, Modal, View, Text, TouchableHighlight, StatusBar } from 'react-native'
import { Container } from 'native-base'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import CaloriePanel from '../component/caloriePanel.tsx'
import CalorieChangeModal from '../component/calorieChangeModal'
import WeekSelectFooter from '../component/weekSelectFooter'

export default class App extends React.Component {
  state = {
    ...mockState,
    isModalVisible: false,
    selectedPanelStatus: {},
    // 曜日
    selectedDay: 'tuesday'
  }

  onPressPanel = (panelData) => {
    if (!panelData.editable) return;

    const newSelectedPanelStatus = {category: panelData.category, calorie: panelData.calorie}
    
    this.setState({isModalVisible: true, selectedPanelStatus: newSelectedPanelStatus})
  }

  closeModal = () => {
    this.setState({isModalVisible: false})
  }

  setCalorie = (calorie) => {
    const selectedDay = {...this.state[this.state.selectedDay]}
    selectedDay.calorie[0].calorie = calorie
    this.setState({[this.state.selectedDay]: selectedDay})
  }

  onPressDay = (day) => {
    this.setState({selectedDay: day})
  }

  render() {
    return (
      <Container style={S.container}>
        <FlatList
          data={this.state[this.state.selectedDay].calorie}
          renderItem={({item, index}) => 
            <CaloriePanel
              category={item.category}
              calorie={item.calorie}
              onPressPanel={() => this.onPressPanel(item, index)} />
          } 
          extraData={this.state}
          contentContainerStyle={S.listContainer}
        />
        <CalorieChangeModal
          isModalVisible={this.state.isModalVisible}
          category={this.state.selectedPanelStatus.category}
          calorie={this.state.selectedPanelStatus.calorie}
          closeModal={this.closeModal}
          setCalorie={this.setCalorie}
        />
        <WeekSelectFooter onPressDay={this.onPressDay} selectedDay={this.state.selectedDay} />
      </Container>
    )
  }
}

const S = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Platform.OS == 'ios' ? 0 :  StatusBar.currentHeight
  },
  listContainer: {
    width: wp(100),
    alignItems: 'center'
  }
})

const mockState = {
  monday: {
    calorie: [
      {
        category: '1日の目標カロリー',
        calorie: 100,
        touchAble: true, editable: true
      },
      {
        category: '朝食',
        calorie: 100,
        touchAble: true, editable: true
      },
      {
        category: '昼食',
        calorie: 100,
        touchAble: true, editable: true
      },
      {
        category: '夕食',
        calorie: 100,
        touchAble: true, editable: true
      },
      {
        category: '間食',
        calorie: 100,
        touchAble: true, editable: true
      },
      {
        category: '消費カロリー',
        calorie: 100,
        touchAble: true, editable: true
      },
      {
        category: '今日の合計',
        calorie: 100,
        touchAble: true, editable: false
      },
      {
        category: '一週間の平均',
        calorie: 100,
        touchAble: true, editable: false
      }
    ]
  },
  tuesday: {
    calorie: [
      {
        category: '1日の目標カロリー',
        calorie: 200,
        touchAble: true, editable: true
      },
      {
        category: '朝食',
        calorie: 200,
        touchAble: true, editable: true
      },
      {
        category: '昼食',
        calorie: 200,
        touchAble: true, editable: true
      },
      {
        category: '夕食',
        calorie: 200,
        touchAble: true, editable: true
      },
      {
        category: '間食',
        calorie: 200,
        touchAble: true, editable: true
      },
      {
        category: '消費カロリー',
        calorie: 200,
        touchAble: true, editable: true
      },
      {
        category: '今日の合計',
        calorie: 200,
        touchAble: true, editable: false
      },
      {
        category: '一週間の平均',
        calorie: 100,
        touchAble: true, editable: false
      }
    ]
  },
  wednesday: {
    calorie: [
      {
        category: '1日の目標カロリー',
        calorie: 200,
        touchAble: true, editable: true
      },
      {
        category: '朝食',
        calorie: 200,
        touchAble: true, editable: true
      },
      {
        category: '昼食',
        calorie: 200,
        touchAble: true, editable: true
      },
      {
        category: '夕食',
        calorie: 200,
        touchAble: true, editable: true
      },
      {
        category: '間食',
        calorie: 200,
        touchAble: true, editable: true
      },
      {
        category: '消費カロリー',
        calorie: 200,
        touchAble: true, editable: true
      },
      {
        category: '今日の合計',
        calorie: 200,
        touchAble: true, editable: false
      },
      {
        category: '一週間の平均',
        calorie: 100,
        touchAble: true, editable: false
      }
    ]
  },
  thursday: {
    calorie: [
      {
        category: '1日の目標カロリー',
        calorie: 200,
        touchAble: true, editable: true
      },
      {
        category: '朝食',
        calorie: 200,
        touchAble: true, editable: true
      },
      {
        category: '昼食',
        calorie: 200,
        touchAble: true, editable: true
      },
      {
        category: '夕食',
        calorie: 200,
        touchAble: true, editable: true
      },
      {
        category: '間食',
        calorie: 200,
        touchAble: true, editable: true
      },
      {
        category: '消費カロリー',
        calorie: 200,
        touchAble: true, editable: true
      },
      {
        category: '今日の合計',
        calorie: 200,
        touchAble: true, editable: false
      },
      {
        category: '一週間の平均',
        calorie: 100,
        touchAble: true, editable: false
      }
    ]
  },
  friday: {
    calorie: [
      {
        category: '1日の目標カロリー',
        calorie: 200,
        touchAble: true, editable: true
      },
      {
        category: '朝食',
        calorie: 200,
        touchAble: true, editable: true
      },
      {
        category: '昼食',
        calorie: 200,
        touchAble: true, editable: true
      },
      {
        category: '夕食',
        calorie: 200,
        touchAble: true, editable: true
      },
      {
        category: '間食',
        calorie: 200,
        touchAble: true, editable: true
      },
      {
        category: '消費カロリー',
        calorie: 200,
        touchAble: true, editable: true
      },
      {
        category: '今日の合計',
        calorie: 200,
        touchAble: true, editable: false
      },
      {
        category: '一週間の平均',
        calorie: 100,
        touchAble: true, editable: false
      }
    ]
  },
  saturday: {
    calorie: [
      {
        category: '1日の目標カロリー',
        calorie: 200,
        touchAble: true, editable: true
      },
      {
        category: '朝食',
        calorie: 200,
        touchAble: true, editable: true
      },
      {
        category: '昼食',
        calorie: 200,
        touchAble: true, editable: true
      },
      {
        category: '夕食',
        calorie: 200,
        touchAble: true, editable: true
      },
      {
        category: '間食',
        calorie: 200,
        touchAble: true, editable: true
      },
      {
        category: '消費カロリー',
        calorie: 200,
        touchAble: true, editable: true
      },
      {
        category: '今日の合計',
        calorie: 200,
        touchAble: true, editable: false
      },
      {
        category: '一週間の平均',
        calorie: 100,
        touchAble: true, editable: false
      }
    ]
  },
  sunday: {
    calorie: [
      {
        category: '1日の目標カロリー',
        calorie: 200,
        touchAble: true, editable: true
      },
      {
        category: '朝食',
        calorie: 200,
        touchAble: true, editable: true
      },
      {
        category: '昼食',
        calorie: 200,
        touchAble: true, editable: true
      },
      {
        category: '夕食',
        calorie: 200,
        touchAble: true, editable: true
      },
      {
        category: '間食',
        calorie: 200,
        touchAble: true, editable: true
      },
      {
        category: '消費カロリー',
        calorie: 200,
        touchAble: true, editable: true
      },
      {
        category: '今日の合計',
        calorie: 200,
        touchAble: true, editable: false
      },
      {
        category: '一週間の平均',
        calorie: 100,
        touchAble: true, editable: false
      }
    ]
  }
}
