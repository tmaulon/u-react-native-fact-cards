import React, { Component } from "react";
import { StyleSheet, Text, View, Animated, PanResponder } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import axios from "axios";

import FactCard from './components/fact-card';

// a quoi ca doit ressembler ? https://giphy.com/gifs/animation-illustration-motion-26mkhMYkitO7DoJuU/fullscreen
const RANDOM_FACT_URL =
  "http://randomuselessfact.appspot.com/random.json?language=en";
const PICTURE_LIST_URL = `https://picsum.photos/${hp("30%")}/${hp("90%")}?image=`;
const MAX_LEFT_ROTATION_DISTANCE = wp("-150%");
const MAX_RIGHT_ROTATION_DISTANCE = wp("150%");
const LEFT_TRESHOLD_BEFORE_SWIPE = wp("-50%");
const RIGHT_TRESHOLD_BEFORE_SWIPE = wp("50%");
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
        this.position.setValue({
          x: gesture.dx,
          y: parseFloat(JSON.stringify(this.position.y))
        });
      },
      onPanResponderRelease: (event, gesture) => {
        if (gesture.dx < LEFT_TRESHOLD_BEFORE_SWIPE) {
          this.forceLeftExit();
        } else if (gesture.dx > RIGHT_TRESHOLD_BEFORE_SWIPE) {
          this.forceRightExit();
        } else {
          this.resetPositionSoft();
        }
      }
    });
    this.setState({ panResponder });
  }

  forceLeftExit() {
    Animated.timing(this.position, {
      toValue: { x: wp("-100%"), y: 0 }
    }).start();
  }
  forceRightExit() {
    Animated.timing(this.position, {
      toValue: { x: wp("100%"), y: 0 }
    }).start();
  }
  resetPositionSoft() {
    Animated.spring(this.position, {
      toValue: { x: 0, y: 0 }
    }).start();
  }


  getCardStyle() {
    const rotation = this.position.x.interpolate({
      inputRange: [MAX_LEFT_ROTATION_DISTANCE, 0, MAX_RIGHT_ROTATION_DISTANCE
      ],
      outputRange: ["-120deg", "0deg", "120deg"]
    })
    return {
      transform: [{ rotate: rotation }],
      ...this.position.getLayout()
    }
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
            style={this.getCardStyle()}>
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
