import React from "react";
import { StyleSheet, View, Animated, Easing, Dimensions } from "react-native";

class SizeChange extends React.Component {
  constructor(props) {
    super();
    this.state = {
      size: new Animated.Value(40),
    };
  }

  bigBounce() {
    Animated.timing(this.state.size, {
      toValue: 85,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();
  }

  smallBounce() {
    Animated.timing(this.state.size, {
      toValue: 35,
      easing: Easing.bounce,
      useNativeDriver: false,
    }).start();
  }

  componentDidUpdate() {
    this.bigBounce();
  }

  render() {
    return (
      <Animated.View
        style={{ height: this.state.size, width: this.state.size }}
      >
        {this.props.children}
      </Animated.View>
    );
  }
}

export default SizeChange;
