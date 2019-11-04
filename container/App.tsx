import React from 'react';
import { StyleSheet, Text } from 'react-native'
import { Container } from 'native-base'
import CaloriePanel from '../component/caloriePanel.tsx'

export default function App() {
  return (
    <Container style={styles.container}>
      <CaloriePanel></CaloriePanel>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
