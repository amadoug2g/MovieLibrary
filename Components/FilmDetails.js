import React from "react";
import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  Image,
  TouchableOpacity,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { exp } from "react-native-reanimated";
import { getFilmDetailFromApi, getImageFromApi } from "../API/TMDBApi";
import { connect } from "react-redux";
import moment from "moment";
import "moment/locale/fr";
moment.locale("fr");
import numeral from "numeral";

class FilmDetail extends React.Component {
  constructor(props) {
    super();
    this.state = {
      film: undefined,
      isLoading: true,
    };
  }

  _displayLoading() {
    if (this.state.isLoading) {
      return (
        <View style={styles.loading_container}>
          <ActivityIndicator size="large" />
        </View>
      );
    }
  }

  _toggleFavorite() {
    const action = { type: "TOGGLE_FAVORITE", value: this.state.film };
    this.props.dispatch(action);
    this._displayFavoriteImage();
  }

  _displayFavoriteImage() {
    // Default image is hollow
    var sourceImage = require("../Images/ic_favorite_border.png");
    // If the film id is not in the favorite list
    if (
      this.props.favoritesFilm.findIndex(
        (item) => item.id === this.state.film.id
      ) !== -1
    ) {
      // Change the image to update the film status
      console.log("Adding to Favorites");
      sourceImage = require("../Images/ic_favorite.png");
    }
    return <Image style={styles.favorite_image} source={sourceImage} />;
  }

  _displayFilm() {
    if (this.state.film != undefined) {
      console.log("displayFilm");
      const dateFormated = moment(this.state.film.release_date).format("LL");
      const budgetFormated = numeral(this.state.film.budget).format(
        "0,0[.]00 $"
      );
      const genreList = this.state.film.genre;
      const companieList = this.state.film.production_companies;
      return (
        <ScrollView style={styles.scrollview_container}>
          {/* Image du film */}
          <Image
            style={styles.filmImage_container}
            source={{ uri: getImageFromApi(this.state.film.backdrop_path) }}
          />
          {/* Fiche du film */}
          <View style={styles.filmDesc_container}>
            {/* Titre du film */}
            <Text style={styles.title}>{this.state.film.title}</Text>
            <TouchableOpacity
              style={styles.favorite_container}
              onPress={() => this._toggleFavorite()}
            >
              {this._displayFavoriteImage()}
            </TouchableOpacity>
            {/* Description du film */}
            <Text style={styles.description}>{this.state.film.overview}</Text>
          </View>
          {/* Détails */}
          <View style={styles.filmDetails_container}>
            {/* Date de sortie */}
            <Text style={styles.details}>Date de sortie : {dateFormated}</Text>
            {/* Note */}
            <Text>Note : {this.state.film.vote_average}</Text>
            {/* Nombre de votes */}
            <Text>Nombre de votes : {this.state.film.vote_count}</Text>
            {/* Budget */}
            <Text>Budget : {budgetFormated}</Text>
            {/* Genre(s) */}
            <Text>
              Genre(s) :{" "}
              {this.state.film.genres
                .map(function (genre) {
                  return genre.name;
                })
                .join(" / ")}
            </Text>
            {/* Companie(s) */}
            <Text>
              Companie(s) :{" "}
              {this.state.film.production_companies
                .map(function (company) {
                  return company.name;
                })
                .join(" / ")}
            </Text>
          </View>
        </ScrollView>
      );
    } else {
      console.log("UNDEFINED");
    }
  }

  componentDidMount() {
    console.log("componentDidMount");
    getFilmDetailFromApi(this.props.navigation.state.params.idFilm).then(
      (data) => {
        this.setState({
          film: data,
          isLoading: false,
        });
      }
    );
  }

  componentDidUpdate() {
    console.log("componentDidUpdate:");
    // console.log(this.props.favoritesFilm);
  }

  render() {
    // console.log(this.props);
    return (
      <View style={styles.main_container}>
        {/* <Text>Détail du film {this.props.navigation.state.params.idFilm}</Text> */}
        {/* <Text>Détail du film {this.props.navigation.getParam("idFilm")}</Text> */}
        {this._displayLoading()}
        {this._displayFilm()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
  },
  loading_container: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  scrollview_container: {
    flex: 1,
  },
  favorite_container: {
    alignItems: "center",
  },
  favorite_image: {
    height: 40,
    width: 40,
  },

  filmImage_container: {
    flex: 1,
    height: 200,
  },
  filmDesc_container: {
    flex: 1,
  },
  filmDetails_container: {
    flex: 1,
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 10,
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    fontStyle: "italic",
    color: "#666666",
    margin: 5,
    paddingBottom: 10,
    textAlign: "justify",
  },
  details: {
    fontWeight: "800",
  },
});

// Connecting and updating Redux Store
const mapStateToProps = (state) => {
  return {
    favoritesFilm: state.favoritesFilm,
  };
};

export default connect(mapStateToProps)(FilmDetail);
