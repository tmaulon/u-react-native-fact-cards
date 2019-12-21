import React, { Component } from "react";
import { StyleSheet, Text, View, Animated, PanResponder } from "react-native";

import FactCard from './components/fact-card'

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = { panResponder: undefined };
    this.position = new Animated.ValueXY();
  }

  componentDidMount() {
    const panResponder = PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gesture) => {
        console.log(gesture);
      }
    });
    this.setState({ panResponder });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          Fact Swipe
        </Text>
        {
          this.state.panResponder &&
          <Animated.View
            {...this.state.panResponder.panHandlers}
            style={this.position.getLayout()}>
            <FactCard />
          </Animated.View>
        }
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
