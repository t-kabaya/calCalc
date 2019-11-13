import React from 'react';
import { StyleSheet, FlatList, Platform, Modal, View, Text, TouchableHighlight, StatusBar, SafeAreaView } from 'react-native'
import { Container } from 'native-base'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import CaloriePanel from '../component/caloriePanel.tsx'
import CalorieChangeModal from '../component/calorieChangeModal'
import WeekSelectFooter from '../component/weekSelectFooter'
import getTodayName from '../utils/getDayUtils'
import TodayCalorieGoal from '../component/TodayCalorieGoal'
import { db } from '../utils/storageUtils.ts'
import { startOfWeek, isBefore } from 'date-fns'

const calcTotalCalorie = (state) => (
  state[state.selectedDay]
    .calorie
    .reduce((acc, cur) => acc + cur.calorie, 0)
)

export default class App extends React.Component {
  state = {
    ...calorieState,
    isModalVisible: false,
    selectedPanelStatus: {},
    // 曜日
    selectedDay: getTodayName(),
    todaysCalorieGoal: 2000,
    selectedPanelIndex: 0,
    // 一週間で最初の起動か？　もし最初の起動ならstateをリセットする。
    lastLaunchTime: null
  }

  // this.constructor.displayNameで、自身のクラス名を取得
  className = this.constructor.displayName

  componentDidMount = () => {
    this.maybeResetState()
    // this.setInitialState()
  }

  setInitialState = async () => {
    // react-native-storageは、読み込みがとても速い
    db
      .load({ key: this.className })
      .then(res => this.setState(res))
      .catch(err => console.warn(err))
  }

  componentDidUpdate({ }, prevState) {
    if (this.state !== prevState) {
      // stateに変化があったら、this.stateを丸ごと保存する。
      // react-native-storageは速いので、丸ごと保存しても大丈夫
      db.save({
        key: this.className,
        data: this.state
      })
    }
  }

  onPressPanel = (panelData, index) => {
    if (!panelData.editable) return;

    const newSelectedPanelStatus = { category: panelData.category, calorie: panelData.calorie }

    this.setState({ isModalVisible: true, selectedPanelStatus: newSelectedPanelStatus, selectedPanelIndex: index })
  }

  closeModal = () => {
    this.setState({ isModalVisible: false })
  }

  setCalorie = (calorie) => {
    const selectedDay = { ...this.state[this.state.selectedDay] }
    selectedDay.calorie[this.state.selectedPanelIndex].calorie = calorie
    this.setState({ [this.state.selectedDay]: selectedDay })
  }

  onPressDay = (day) => {
    this.setState({ selectedDay: day })
  }

  maybeResetState = async () => {
    // 月曜日になると、stateをリセット
    const lastMonday = startOfWeek(new Date, { weekStartsOn: 1 })
    await this.setInitialState()

    const shouldReset = this.state.lastLaunchTime && isBefore(this.state.lastLaunchTime, lastMonday)

    if (shouldReset) {
      this.setState({ lastLaunchTime: new Date() })
      alert('reset')
    } else {
      const newState = { ...this.state, ...calorieState }
      this.setState(newState)
      alert('not reset')
    }
  }

  render() {
    return (
      <SafeAreaView style={S.container}>
        <FlatList
          data={this.state[this.state.selectedDay].calorie}
          renderItem={({ item, index }) =>
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

        <TodayCalorieGoal
          todaysCalorieGoal={this.state.todaysCalorieGoal}
          totalCalorie={calcTotalCalorie(this.state)}
          restCalorie={this.state.todaysCalorieGoal - calcTotalCalorie(this.state)}
        />

        <WeekSelectFooter onPressDay={this.onPressDay} selectedDay={this.state.selectedDay} />
      </SafeAreaView>
    )
  }
}

const S = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Platform.OS == 'ios' ? 0 : StatusBar.currentHeight
  },
  listContainer: {
    width: wp(100),
    alignItems: 'center'
  }
})

const calorieState = {
  monday: {
    calorie: [
      {
        category: '朝食',
        calorie: 0,
        touchAble: true, editable: true
      },
      {
        category: '昼食',
        calorie: 0,
        touchAble: true, editable: true
      },
      {
        category: '夕食',
        calorie: 0,
        touchAble: true, editable: true
      },
      {
        category: '間食',
        calorie: 0,
        touchAble: true, editable: true
      }
    ]
  },
  tuesday: {
    calorie: [
      {
        category: '朝食',
        calorie: 0,
        touchAble: true, editable: true
      },
      {
        category: '昼食',
        calorie: 0,
        touchAble: true, editable: true
      },
      {
        category: '夕食',
        calorie: 0,
        touchAble: true, editable: true
      },
      {
        category: '間食',
        calorie: 0,
        touchAble: true, editable: true
      }
    ]
  },
  wednesday: {
    calorie: [
      {
        category: '朝食',
        calorie: 0,
        touchAble: true, editable: true
      },
      {
        category: '昼食',
        calorie: 0,
        touchAble: true, editable: true
      },
      {
        category: '夕食',
        calorie: 0,
        touchAble: true, editable: true
      },
      {
        category: '間食',
        calorie: 0,
        touchAble: true, editable: true
      }
    ]
  },
  thursday: {
    calorie: [
      {
        category: '朝食',
        calorie: 0,
        touchAble: true, editable: true
      },
      {
        category: '昼食',
        calorie: 0,
        touchAble: true, editable: true
      },
      {
        category: '夕食',
        calorie: 0,
        touchAble: true, editable: true
      },
      {
        category: '間食',
        calorie: 0,
        touchAble: true, editable: true
      }
    ]
  },
  friday: {
    calorie: [
      {
        category: '朝食',
        calorie: 0,
        touchAble: true, editable: true
      },
      {
        category: '昼食',
        calorie: 0,
        touchAble: true, editable: true
      },
      {
        category: '夕食',
        calorie: 0,
        touchAble: true, editable: true
      },
      {
        category: '間食',
        calorie: 0,
        touchAble: true, editable: true
      }
    ]
  },
  saturday: {
    calorie: [
      {
        category: '朝食',
        calorie: 0,
        touchAble: true, editable: true
      },
      {
        category: '昼食',
        calorie: 0,
        touchAble: true, editable: true
      },
      {
        category: '夕食',
        calorie: 0,
        touchAble: true, editable: true
      },
      {
        category: '間食',
        calorie: 0,
        touchAble: true, editable: true
      }
    ]
  },
  sunday: {
    calorie: [
      {
        category: '朝食',
        calorie: 0,
        touchAble: true, editable: true
      },
      {
        category: '昼食',
        calorie: 0,
        touchAble: true, editable: true
      },
      {
        category: '夕食',
        calorie: 0,
        touchAble: true, editable: true
      },
      {
        category: '間食',
        calorie: 0,
        touchAble: true, editable: true
      }
    ]
  }
}
