import React from "react";
import { StyleSheet, View, Animated, Easing, Dimensions } from "react-native";

class FadeIn extends React.Component {
  constructor(props) {
    super();
    this.state = {
      position: new Animated.Value(Dimensions.get("window").width),
      //   opacity: new Animated.Value(1),
      delay: 500,
      duration: 500,
    };
  }

  componentDidMount() {
    Animated.spring(this.state.position, {
      toValue: 0,
      useNativeDriver: false,
    }).start();

    // Animated.timing(this.state.opacity, {
    // //     toValue: 1,
    // //     delay: this.state.delay,
    // //     useNativeDriver: false,
    // //   })

    // Animated.parallel([
    // ,
    //   Animated.spring(this.state.position, {
    //     toValue: 0,
    //     delay: 400,
    //     useNativeDriver: false,
    //   }),
    // ]).start();

    // Animated.spring(this.state.position, {
    //     toValue: 0,
    //     delay: 400,
    //     useNativeDriver: false,
    //   }).start();

    // Animated.timing(this.state.position, {
    //   toValue: 0,
    //   delay: this.state.delay,
    //   duration: this.state.duration,
    //   easing: Easing.bounce,
    //   useNativeDriver: false,
    // });
  }

  render() {
    return (
      <Animated.View
        style={
          { left: this.state.position } /*, { opacity: this.state.opacity }*/
        }
      >
        {this.props.children}
      </Animated.View>
    );
  }
}

export default FadeIn;
