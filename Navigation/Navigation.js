import React from "react";
import { StyleSheet, Image } from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import Search from "../Components/Search";
import Favorites from "../Components/Favorites";
import FilmDetail from "../Components/FilmDetails";
import Test from "../Components/Test";
import { createBottomTabNavigator } from "react-navigation-tabs";

// Search page and every screens related
const SearchStackNavigator = createStackNavigator({
  Search: {
    screen: Search,
    navigationOptions: {
      title: "Rechercher",
    },
  },
  FilmDetail: {
    screen: FilmDetail,
    navigationOptions: {
      title: "",
    },
  },
});

// Favorites page
const FavStackNavigator = createStackNavigator({
  Favorites: {
    screen: Favorites,
    navigationOptions: {
      title: "Favoris",
    },
  },
  FilmDetail: {
    screen: FilmDetail,
    navigationOptions: {
      title: "",
    },
  },
});

// Test page
const TestStackNavigator = createStackNavigator({
  Test: {
    screen: Test,
    navigationOptions: {
      title: "Testing",
    },
  },
});

const MoviesTabNavigator = createBottomTabNavigator(
  // Tabs to display
  {
    // Test: {
    //   screen: TestStackNavigator,
    //   navigationOptions: {
    //     tabBarIcon: () => {},
    //   },
    //   title: "Test",
    // },
    Search: {
      screen: SearchStackNavigator,
      navigationOptions: {
        tabBarIcon: () => {
          return (
            <Image
              source={require("../Images/ic_search.png")}
              style={style.tab_icon}
            />
          );
        },
      },
    },
    Favorites: {
      screen: FavStackNavigator,
      navigationOptions: {
        tabBarIcon: () => {
          return (
            <Image
              source={require("../Images/ic_favorite.png")}
              style={style.tab_icon}
            />
          );
        },
      },
    },
  },
  // Styling tabs
  {
    tabBarOptions: {
      activeBackgroundColor: "#EEE",
      inactiveBackgroundColor: "#FFF",
      // showLabel: false,
      showIcon: true,
      keyboardHidesTabBar: true,
    },
  }
);

export default createAppContainer(MoviesTabNavigator);

// Display Elements
const style = StyleSheet.create({
  tab_icon: {
    height: 25,
    width: 25,
  },
});
