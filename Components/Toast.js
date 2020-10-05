import React from "react";
import { StyleSheet, View, Text, Animated, Easing } from "react-native";

class Toast extends React.Component {
  constructor(props) {
    super();
    this.state = {
      animation: new Animated.Value(1),
      duration: 2000,
      delay: 1000,
    };
  }

  _message = (text) => {
    return <Text>Environ {text} résultat(s)</Text>;
  };

  _fadeOut = () => {
    Animated.timing(this.state.animation, {
      toValue: 0,
      duration: this.state.duration,
      delay: this.state.delay,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();
  };

  componentDidMount() {
    this._fadeOut();
  }

  render() {
    return (
      <Animated.View
        style={[style.toast_box, { opacity: this.state.animation }]}
      >
        <Text>Environ {this.props.total} résultat(s)</Text>
      </Animated.View>
    );
  }
}

const style = StyleSheet.create({
  toast_box: {
    position: "absolute",
    alignSelf: "center",
    bottom: 35,
    backgroundColor: "gray",
    borderRadius: 25,
    padding: 10,
  },
});

export default Toast;
