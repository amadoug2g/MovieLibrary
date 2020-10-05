import React from "react";
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  ActivityIndicator,
  Keyboard,
  Text,
} from "react-native";

import { getFilmsFromApiWithSearchedText } from "../API/TMDBApi";
import { ProgressBar, Colors } from "react-native-paper";
import FilmList from "./FilmList";
import { connect } from "react-redux";

// Search Screen Component
class Search extends React.Component {
  // Initializing variables
  constructor(props) {
    super();
    this.searchedText = "";
    this.page = 0;
    this.totalPages = 0;
    this.state = {
      films: [],
      isLoading: false,
      counter: 1,
    };

    // this._loadFilms() = this._loadFilms.bind(this);
  }

  // Load list of films
  _loadFilms = () => {
    if (this.searchedText.length > 0) {
      this.setState({ isLoading: true });
      getFilmsFromApiWithSearchedText(this.searchedText, this.page + 1).then(
        (data) => {
          this.page = data.page;
          this.totalPages = data.total_pages;
          this.setState({
            films: [...this.state.films, ...data.results],
            // films: this.state.films.concat(data.results),
            isLoading: false,
          });
        }
      );
    }
  };

  _message = (text) => {
    return <Text>Environ {text} résultat(s)</Text>;
  };

  // Retrieve input text
  _searchTextInputChanged(text) {
    this.searchedText = text;
  }

  // Display loading animation
  _displayLoading() {
    if (this.state.isLoading) {
      return (
        <View style={styles.loading_container}>
          {/* <ActivityIndicator animating={true} size="large" /> */}
          <ProgressBar
            progress={0.8}
            color={Colors.red800}
            indeterminate={true}
            visible={true}
          />
          <Text>Chargement des films....</Text>
        </View>
      );
    }
  }

  // Start new search
  _searchFilms() {
    Keyboard.dismiss();
    this.page = 0;
    this.totalPages = 0;
    this.setState(
      {
        films: [],
      },
      () => {
        console.log(
          "Page : " +
            this.page +
            " / TotalPages : " +
            this.totalPages +
            " / Nombre de films : " +
            this.state.films.length
        );
        this._loadFilms();
      }
    );
  }

  // Display Elements
  render() {
    console.log("RENDER");
    return (
      <View style={styles.main_container}>
        <TextInput
          style={styles.textinput}
          placeholder="Titre du film"
          onChangeText={(text) => this._searchTextInputChanged(text)}
          onSubmitEditing={() => this._searchFilms()}
        />
        <Button title="Rechercher" onPress={() => this._searchFilms()} />
        <FilmList
          dataList={this.state.films}
          navigation={this.props.navigation}
          loadFilms={this._loadFilms}
          page={this.page}
          totalPage={this.totalPages}
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
  textinput: {
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
    marginBottom: 5,
    height: 50,
    borderColor: "#000000",
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 5,
  },
  loading_container: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 100,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
  },
});

// Connect Component to Redux store
const mapStateToProps = (state) => {
  return {
    // Retrieve favorite list from store (global state)
    favoritesFilm: state.favoritesFilm,
  };
};

export default connect(mapStateToProps)(Search);
