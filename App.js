import React, { Component } from "react";
import { StyleSheet, Text, View, Animated } from "react-native";

import FactCard from './components/fact-card'

export default class App extends Component {

  constructor(props) {
    super(props);
    this.position = new Animated.ValueXY();
  }

  // componentDidMount() {
  //   const panResponder = panResponder.create({})
  // }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          Fact Swipe
        </Text>
        <Animated.View style={this.position.getLayout()}>
          <FactCard />
        </Animated.View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    marginTop: 50,
  },
  title: {
    fontSize: 30,
    marginBottom: 50
  },
});
