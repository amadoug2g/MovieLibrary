import React from "react";
import { FlatList, StyleSheet } from "react-native";
import { connect } from "react-redux";
import FilmItem from "./FilmItem";

// Movie List Screen Component
class FilmList extends React.Component {
  // Initializing variables
  constructor(props) {
    super();
    this.state = {
      films: [],
    };
  }

  // Displaying Film details by passing the movie ID
  _displayDetailForFilm = (idFilm) => {
    this.props.navigation.navigate("FilmDetail", { idFilm: idFilm });
  };

  // Display Elements
  render() {
    return (
      <FlatList
        // Importing & sorting the movie list
        style={styles.list}
        data={this.props.dataList}
        keyExtractor={(item) => item.id.toString()}
        extraData={this.props.favoritesFilm}
        // Handling Film Details
        renderItem={({ item }) => (
          <FilmItem
            film={item}
            isFilmFavorite={
              this.props.favoritesFilm.findIndex(
                (film) => film.id === item.id
              ) !== -1
                ? true
                : false
            }
            displayDetailForFilm={this._displayDetailForFilm}
          />
        )}
        onEndReachedThreshold={0.5}
        onEndReached={() => {
          if (this.props.page < this.props.totalPage) {
            this.props.loadFilms();
          }
        }}
      />
    );
  }
}

// Element Styles
const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
});

// Connect Component to Redux store
const mapStateToProps = (state) => {
  return {
    // Retrieve favorite list from store (global state)
    favoritesFilm: state.favoritesFilm,
  };
};

export default connect(mapStateToProps)(FilmList);
