import {
  GET_GAMES,
  POST_GAMES,
  GET_GENRES,
  SEARCH_BY_ID,
  ORDER_BY_NAME,
  FILTER_CREATED,
  SEARCH_BY_NAME,
  FILTER_BY_GENRE,
  FILTER_BY_RATING,
} from "../Actions";

const initialState = {
  fullGames: [],
  Games: [],
};

const rootReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_GAMES:
      return {
        ...state,
        games: payload,
        fullGames: payload,
      };

    default:
      return state;
  }
};

export default rootReducer;
