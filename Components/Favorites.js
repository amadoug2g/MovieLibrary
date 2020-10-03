import React from "react";
import { StyleSheet, View, Text } from "react-native";
import FilmList from "../Components/FilmList";
import { connect } from "react-redux";

// Favorites Screen Component
class Favorites extends React.Component {
  // Initializing variables
  constructor(props) {
    super();
    this.page = 0;
    this.totalPages = 0;
    this.state = {
      films: [],
      isLoading: false,
    };
  }

  // Display loading animation
  _displayLoading() {
    if (this.state.isLoading) {
      return (
        <View style={styles.loading_container}>
          <ActivityIndicator animating={true} size="large" />
        </View>
      );
    }
  }

  // Display Elements
  render() {
    return (
      <View style={styles.main_container}>
        <FilmList
          dataList={this.props.favoritesFilm}
          navigation={this.props.navigation}
          loadFilms={this._loadFilms}
          page={this.page}
          totalPage={this.total_pages}
        />
        {this._displayLoading()}
      </View>
    );
  }
}

// Element Styles
const styles = StyleSheet.create({
  main_container: {
    flex: 1,
  },
});

// Connect Component to Redux store
const mapStateToStore = (state) => {
  return {
    // Retrieve favorite list from store (global state)
    favoritesFilm: state.favoritesFilm,
  };
};

export default connect(mapStateToStore)(Favorites);
