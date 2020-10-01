import { exp } from "react-native-reanimated";

const API_TOKEN = "1d8bd258f1534d9eb8d1692df819af90";

// export function getFilmsFromApiWithSearchedTextPage(text, page) {
//   const url =
//     "https://api.themoviedb.org/3/search/movie?api_key=" +
//     API_TOKEN +
//     "&language=fr&query=" +
//     text +
//     "&page=" +
//     page;

//   return fetch(url)
//     .then((Response) => Response.json())
//     .catch((error) => console.error(error));
// }

export function getFilmsFromApiWithSearchedText(text, page) {
  const url =
    "https://api.themoviedb.org/3/search/movie?api_key=" +
    API_TOKEN +
    "&language=fr&query=" +
    text +
    "&page=" +
    page;

  return fetch(url)
    .then((Response) => Response.json())
    .catch((error) => console.error(error));
}

export function getImageFromApi(name) {
  return "https://image.tmdb.org/t/p/w342" + name;
}

export function getFilmDetailFromApi(id) {
  return fetch(
    "https://api.themoviedb.org/3/movie/" +
      id +
      "?api_key=" +
      API_TOKEN +
      "&language=fr"
  )
    .then((Response) => Response.json())
    .catch((error) =>
      console.error(
        "An error occured while fetching Film Detail from id",
        error
      )
    );
}
