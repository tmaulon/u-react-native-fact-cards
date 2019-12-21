import React, { Component } from "react";
import { StyleSheet, Text, View, Animated, PanResponder } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import axios from "axios";

import FactCard from './components/fact-card';

// a quoi ca doit ressembler ? https://giphy.com/gifs/animation-illustration-motion-26mkhMYkitO7DoJuU/fullscreen
const RANDOM_FACT_URL =
  "http://randomuselessfact.appspot.com/random.json?language=en";
const RANDOM_IMAGE_URL = (id) => `https://picsum.photos/id/${id}/${Math.round(wp("90%"))}/${Math.round(hp("30%"))}`;
const MAX_LEFT_ROTATION_DISTANCE = wp("-150%");
const MAX_RIGHT_ROTATION_DISTANCE = wp("150%");
const LEFT_TRESHOLD_BEFORE_SWIPE = wp("-50%");
const RIGHT_TRESHOLD_BEFORE_SWIPE = wp("50%");
export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = { panResponder: undefined, topFact: undefined, bottomFact: undefined };
    this.position = new Animated.ValueXY();
  }

  componentDidMount() {
    const panResponder = PanResponder.create({
      onMoveShouldSetPanResponder: (event, gesture) => {
        return Math.abs(gesture.dx) > Math.abs(gesture.dy * 3)
      },
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
    this.setState({ panResponder }, () => {
      axios.get(RANDOM_FACT_URL).then(response => {
        this.setState({
          topFact: {
            ...response.data,
            image: this.getRandomImageURL()
          }
        })
      })
      this.loadBottomFact()
    })
  }

  loadBottomFact() {
    axios.get(RANDOM_FACT_URL).then(response => {
      this.setState({
        bottomFact: {
          ...response.data,
          image: this.getRandomImageURL()
        }
      })
    })
  };

  getRandomImageURL() {
    return `${RANDOM_IMAGE_URL(Math.floor(Math.random() * 500 + 1))}`
  }

  onCardExitDone = () => {
    this.setState({ topFact: this.state.bottomFact });
    this.loadBottomFact();
    this.position.setValue({
      x: 0,
      y: 0
    })
  }
  forceLeftExit() {
    Animated.timing(this.position, {
      toValue: { x: wp("-100%"), y: 0 }
    }).start(this.onCardExitDone);
  }
  forceRightExit() {
    Animated.timing(this.position, {
      toValue: { x: wp("100%"), y: 0 }
    }).start(this.onCardExitDone);
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

  renderTopCard() {
    return (
      <Animated.View
        {...this.state.panResponder.panHandlers}
        style={this.getCardStyle()}>
        <FactCard disabled={false} fact={this.state.topFact} />
      </Animated.View>
    )
  }
  renderBottomCard() {
    return (
      <View
        style={{ zIndex: -1, position: "absolute" }}>
        <FactCard disabled={true} fact={this.state.bottomFact} />
      </View>
    )
  }

  render() {
    console.log(this.state.topFact, this.state.bottomFact);
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          Fact Swipe
        </Text>
        <View>
          {
            this.state.topFact && this.renderTopCard()
          }
          {
            this.state.bottomFact && this.renderBottomCard()
          }
        </View>
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

/*
log by onPanResponderMove
"_accountsForMovesUpTo": 9187361.969048,
"dx": 2.6666717529296875, // distance parcouru en un mouvement en x
"dy": -1,// distance parcouru en un mouvement en y
"moveX": 18.333328247070312, // position du doigt actuelle en x
"moveY": 268.6666564941406, // position du doigt actuelle en y
"numberActiveTouches": 1, // nombre de doigts qui touchent
"stateID": 0.8805023799412371, //identificant du geste
"vx": 0, // Rapidité du mouvement en x
"vy": -0.0014172563592235491,// Rapidité du mouvement en y
"x0": 15.666656494140625, // la coordonnée ou le mouvement a commencé en x
"y0": 269.6666564941406, // la coordonnée ou le mouvement a commencé en y
"Un mouvement" est tout ce qui se presse entre une pression et un relachement
*/