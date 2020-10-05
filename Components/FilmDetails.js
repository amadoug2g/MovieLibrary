import React from "react";
import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  Platform,
  Share,
  Animated,
  Easing,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { ProgressBar, Colors } from "react-native-paper";
import { getFilmDetailFromApi, getImageFromApi } from "../API/TMDBApi";
import { connect } from "react-redux";
import moment from "moment";
import "moment/locale/fr";
moment.locale("fr");
import numeral from "numeral";
import SizeChange from "../Animation/SizeChange";

class FilmDetail extends React.Component {
  constructor(props) {
    super();
    this.state = {
      film: undefined,
      isLoading: true,
      size: new Animated.Value(50),
    };
  }

  // Display Loading Animation
  _displayLoading() {
    if (this.state.isLoading) {
      console.log("showingProgress");
      return (
        <View style={styles.loading_container}>
          {/* <ActivityIndicator size="large" /> */}
          {/* <Progress.Circle size={30} indeterminate={true} /> */}
          <ProgressBar
            progress={0.8}
            color={Colors.red800}
            indeterminate={true}
            visible={true}
          />
          <Text>Chargement...</Text>
        </View>
      );
    }
  }

  bigBounce() {
    Animated.timing(this.state.size, {
      toValue: 65,
      easing: Easing.bounce,
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

  _changeSize() {
    this.state.size ? this.smallBounce() : this.bigBounce();
  }

  // Change Favorite Icon Status
  _toggleFavorite() {
    const action = { type: "TOGGLE_FAVORITE", value: this.state.film };
    this.props.dispatch(action);
    this._displayFavoriteImage();
  }

  // Display Favorite Icon
  _displayFavoriteImage() {
    // Default image is hollow
    var sourceImage = require("../Images/ic_favorite_border.png");
    // If the film id is not in the favorite list
    let isInFavorite = false;
    if (
      this.props.favoritesFilm.findIndex(
        (item) => item.id === this.state.film.id
      ) !== -1
    ) {
      // Change the image to update the film status and add it
      console.log("Adding to Favorites");
      sourceImage = require("../Images/ic_favorite.png");
      isInFavorite = true;
    }
    return <Image style={styles.favorite_image} source={sourceImage} />;
  }

  // Display Film Details
  _displayFilm() {
    if (this.state.film != undefined) {
      console.log("displayFilm");
      const dateFormated = moment(this.state.film.release_date).format("LL");
      const budgetFormated = numeral(this.state.film.budget).format(
        "0,0[.]00 $"
      );
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

  // Display Share Button on Android
  _displayFAB() {
    const { film } = this.state;
    if (film != undefined && Platform.OS === "android") {
      var sourceImage = require("../Images/ic_share.png");
      return (
        <TouchableOpacity
          style={styles.fab_container}
          onPress={() => this._share()}
        >
          <Image style={styles.fab_image_android} source={sourceImage} />
        </TouchableOpacity>
      );
    }
  }

  // Display Share Button on iOS
  // static navigationOptions = ({ navigation }) => {
  //   const { params } = navigate.state;
  //   if (params.film != undefined && Platform.OS === "ios") {
  //     var sourceImage = require("../Images/ic_share.png");
  //     return {
  //       headerRight: (
  //         <TouchableOpacity
  //           style={styles.share_touchable_headerrightbutton}
  //           onPress={() => params.share()}
  //         >
  //           <Image style={styles.fab_image_ios} source={sourceImage} />
  //         </TouchableOpacity>
  //       ),
  //     };
  //   }
  // };

  // Send method through navigation parameters
  // _updateNavigationParams() {
  //   this.props.navigation.setParams({
  //     shareFilm: this._share,
  //     film: this.state.film,
  //   });
  // }

  // Share Film Informations
  _share = () => {
    const { film } = this.state;
    Share.share({ title: film.title, message: film.overview });
  };

  // Interacting after component render
  componentDidMount() {
    console.log("componentDidMount");
    // const favoriteFilmIndex = this.props.favoritesFilm.findIndex(
    //   (item) => item.id === this.props.navigation.state.params.idFilm
    // );
    // if (favoriteFilmIndex !== -1) {
    //   this.setState(
    //     {
    //       film: this.props.favoritesFilm[favoriteFilmIndex],
    //     },
    //     () => {
    //       this._updateNavigationParams();
    //     }
    //   );
    // }

    // this.setState({ isLoading: true });

    // Get Film details from API
    getFilmDetailFromApi(this.props.navigation.state.params.idFilm).then(
      (data) => {
        this.setState({
          film: data,
          isLoading: false,
        });
      }
    );
  }

  // Updating component
  componentDidUpdate() {
    console.log("componentDidUpdate:");
    // console.log(this.props.favoritesFilm);
  }

  // Display Elements
  render() {
    // console.log(this.props);
    return (
      <View style={styles.main_container}>
        {/* <Text>Détail du film {this.props.navigation.state.params.idFilm}</Text> */}
        {/* <Text>Détail du film {this.props.navigation.getParam("idFilm")}</Text> */}
        {this._displayLoading()}
        {this._displayFilm()}
        {this._displayFAB()}
      </View>
    );
  }
}

// Element Styles
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
    flex: 1,
    width: 40,
    height: 40,
  },
  fab_image_android: {
    height: 40,
    width: 40,
  },
  fab_image_ios: {
    height: 25,
    width: 25,
  },
  fab_container: {
    height: 60,
    width: 60,
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#E91E42",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    margin: 15,
    marginBottom: 45,
  },
  share_touchable_headerrightbutton: {
    marginRight: 8,
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
    // Retrieve favorite list from store (global state)
    favoritesFilm: state.favoritesFilm,
  };
};

export default connect(mapStateToProps)(FilmDetail);
