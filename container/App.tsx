import React from 'react';
import { StyleSheet, FlatList } from 'react-native'
import { Container } from 'native-base'
import CaloriePanel from '../component/caloriePanel.tsx'

export default class App extends React.Component {
  state={
    foo: 'foo'
  }

  render() {
    return (
      <Container style={styles.container}>
        <FlatList data={mockState.monday.calorie} renderItem={({item}) => <CaloriePanel category={item.category} calorie={item.calorie} />} />
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})

const mockState = {
  monday: {
    calorie: [
      {
        category: '1日の目標カロリー',
        calorie: 500,
        touchAble: true
      },
      {
        category: '朝食',
        calorie: 500,
        touchAble: true
      },
      {
        category: '昼食',
        calorie: 500,
        touchAble: true
      },
      {
        category: '夕食',
        calorie: 500,
        touchAble: true
      },
      {
        category: '間食',
        calorie: 500,
        touchAble: true
      },
      {
        category: '消費カロリー',
        calorie: 500,
        touchAble: true
      },
      {
        category: '今日の合計',
        calorie: 500,
        touchAble: true
      },
      {
        category: '一週間の平均',
        calorie: 500,
        touchAble: true
      }
    ]
  },
  // tuesday: {
  //   breakfastPanel: {
  //     calorie: 500
  //   },
  //   launchPanel: {
  //     calorie: 500
  //   },
  //   dinnerPanel: {
  //     calorie: 500
  //   },
  //   snackPanel: {
  //     calorie: 500
  //   }
  // },
  // wednesday: {
  //   breakfastPanel: {
  //     calorie: 500
  //   },
  //   launchPanel: {
  //     calorie: 500
  //   },
  //   dinnerPanel: {
  //     calorie: 500
  //   },
  //   snackPanel: {
  //     calorie: 500
  //   }
  // },
  // thursday: {
  //   breakfastPanel: {
  //     calorie: 500
  //   },
  //   launchPanel: {
  //     calorie: 500
  //   },
  //   dinnerPanel: {
  //     calorie: 500
  //   },
  //   snackPanel: {
  //     calorie: 500
  //   }
  // },
  // friday: {
  //   breakfastPanel: {
  //     calorie: 500
  //   },
  //   launchPanel: {
  //     calorie: 500
  //   },
  //   dinnerPanel: {
  //     calorie: 500
  //   },
  //   snackPanel: {
  //     calorie: 500
  //   }
  // },
  // saturday: {
  //   breakfastPanel: {
  //     calorie: 500
  //   },
  //   launchPanel: {
  //     calorie: 500
  //   },
  //   dinnerPanel: {
  //     calorie: 500
  //   },
  //   snackPanel: {
  //     calorie: 500
  //   }
  // },
  // sunday: {
  //   breakfastPanel: {
  //     calorie: 500
  //   },
  //   launchPanel: {
  //     calorie: 500
  //   },
  //   dinnerPanel: {
  //     calorie: 500
  //   },
  //   snackPanel: {
  //     calorie: 500
  //   }
  // }
}
