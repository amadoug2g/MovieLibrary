import React from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import { getImageFromApi } from "../API/TMDBApi";
import FadeIn from "../Animation/FadeIn";

class FilmItem extends React.Component {
  // Display Favorite Image in title
  _displayFavoriteImage(bool) {
    var sourceImage = require("../Images/ic_favorite.png");
    if (bool) {
      return <Image style={styles.favorite_image} source={sourceImage} />;
    }
  }

  // Display Elements
  render() {
    const { film, displayDetailForFilm } = this.props;
    return (
      <FadeIn>
        <TouchableOpacity
          style={styles.main_container}
          // Displaying Film details on press
          onPress={() => displayDetailForFilm(film.id)}
        >
          <Image
            style={styles.image}
            // Querying Film Poster
            source={{ uri: getImageFromApi(film.poster_path) }}
          />
          <View style={styles.content_container}>
            <View style={styles.header_container}>
              <View style={styles.title_image}>
                <Text style={styles.title_text}>
                  {this._displayFavoriteImage(this.props.isFilmFavorite)}&nbsp;
                  {film.title}
                </Text>
              </View>

              <View style={styles.vote_style}>
                <Text style={styles.vote_text}>{film.vote_average}</Text>
              </View>
            </View>
            <View style={styles.description_container}>
              <Text style={styles.description_text} numberOfLines={6}>
                {film.overview}
              </Text>
            </View>
            <View style={styles.date_container}>
              <Text style={styles.date_text}>Sorti le {film.release_date}</Text>
            </View>
          </View>
        </TouchableOpacity>
      </FadeIn>
    );
  }
}

// Display Elements
const styles = StyleSheet.create({
  main_container: {
    height: 190,
    flexDirection: "row",
  },
  image: {
    width: 120,
    height: 180,
    margin: 5,
    backgroundColor: "gray",
  },
  content_container: {
    flex: 1,
    margin: 5,
  },
  header_container: {
    flex: 3,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title_text: {
    fontWeight: "bold",
    fontSize: 18,
    flex: 3,
    flexWrap: "wrap",
    paddingRight: 5,
    width: 220,
  },
  vote_text: {
    flex: 1,
    fontWeight: "bold",
    fontSize: 26,
    color: "#666666",
    flexWrap: "wrap",
  },
  description_container: {
    flex: 7,
  },
  description_text: {
    fontStyle: "italic",
    color: "#666666",
  },
  date_container: {
    flex: 1,
  },
  date_text: {
    textAlign: "right",
    fontSize: 14,
  },
  favorite_image: {
    height: 20,
    width: 20,
  },
  title_image: {
    flex: 3,
    flexDirection: "column",
    flexWrap: "wrap",
  },
  vote_style: {
    flex: 1,
    flexDirection: "column",
    textAlign: "right",
    alignItems: "flex-end",
    alignContent: "flex-end",
  },
});

export default FilmItem;
