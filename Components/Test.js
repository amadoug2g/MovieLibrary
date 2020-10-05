import React from "react";
import { View, StyleSheet, Text, PanResponder, Dimensions } from "react-native";

class Test extends React.Component {
  constructor(props) {
    super();
    this.state = {
      topPos: 0,
      leftPos: 0,
    };

    var { height, width } = Dimensions.get("screen");
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onPanResponderMove: (evt, gestureState) => {
        let touches = evt.nativeEvent.touches;
        if (touches.length == 1) {
          this.setState({
            topPos: touches[0].pageX - height / 2,
            leftPos: touches[0].pageY - width / 2,
          });
        }
      },
    });
  }

  render() {
    return (
      <View style={styles.test}>
        <View
          {...this.panResponder.panHandlers}
          style={[
            styles.animation,
            { top: this.state.topPos, left: this.state.leftPos },
          ]}
        ></View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  test: {
    flex: 1,
  },
  animation: {
    height: 50,
    width: 50,
    backgroundColor: "red",
    alignSelf: "center",
  },
});

export default Test;
