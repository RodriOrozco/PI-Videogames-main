import axios from "axios";

export const GET_GAMES = "GET_GAMES";
export const POST_GAMES = "POST_GAMES";
export const GET_GENRES = "GET_GENRES";
export const SEARCH_BY_ID = "SEARCH_BY_ID";
export const ORDER_BY_NAME = "ORDER_BY_NAME";
export const FILTER_CREATED = "FILTER_CREATED";
export const SEARCH_BY_NAME = "SEARCH_BY_NAME";
export const FILTER_BY_GENRE = "FILTER_BY_GENRE";
export const FILTER_BY_RATING = "FILTER_BY_RATING";

export function getGames() {
  return async function (dispatch) {
    let response = await axios.get("http://localhost:3001/videogames");
    return dispatch({
      type: GET_GAMES,
      payload: response.data,
    });
  };
}

export function getGenres() {
  return async function (dispatch) {
    let response = await axios.get("http://localhost:3001/genres");
    return dispatch({
      type: GET_GENRES,
      payload: response.data,
    });
  };
}
