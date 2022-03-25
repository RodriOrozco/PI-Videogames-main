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
  platforms: [],
  games: [],
  genres: [],
  detail: [],
};

const rootReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_GAMES:
      let platformGame = payload;
      platformGame.map((el) => el.platforms); //sino probar con un FILTER
      console.log(`soy platforms bro ${platforms}`);
      return {
        ...state,
        games: payload,
        fullGames: payload,
        platforms: platformGame,
      };

    case SEARCH_BY_NAME:
      return {
        ...state,
        games: payload,
      };

    case GET_GENRES:
      return {
        ...state,
        genres: payload,
      };

    case POST_GAMES:
      return {
        ...state,
      };

    case SEARCH_BY_ID:
      return {
        ...state,
        detail: payload,
      };

    case FILTER_CREATED:
      const allGames = state.fullGames;

      const createdFilter =
        payload === "created"
          ? allGames.filter((el) => el.createdInDb)
          : allGames.filter((el) => !el.createdInDb);
      return {
        ...state,
        games: payload === "All" ? allGames : createdFilter,
      };
    //--------------------------------------------------------------------

    case FILTER_BY_GENRE:
      const todosVideogames = state.fullGames;
      const filteredGen = todosVideogames.filter((e) =>
        e.genres.includes(payload)
      );
      return {
        ...state,
        games: filteredGen,
      };

    //--------------------------------------------------------------------

    case FILTER_BY_RATING:
      let sortedRating =
        payload === "asc"
          ? state.games.sort(function (a, b) {
              if (a.rating > b.rating) {
                return 1;
              }
              if (b.rating > a.rating) {
                return -1;
              }
              return 0;
            })
          : state.games.sort(function (a, b) {
              if (a.rating > b.rating) {
                return -1;
              }
              if (b.rating > a.rating) {
                return 1;
              }
              return 0;
            });

      return {
        ...state,
        games: sortedRating,
      };

    case ORDER_BY_NAME:
      let sortName =
        payload === "asc"
          ? state.games.sort(function (a, b) {
              if (a.name > b.name) {
                return 1;
              }
              if (b.name > a.name) {
                return -1;
              }
              return 0;
            })
          : state.games.sort(function (a, b) {
              if (a.name > b.name) {
                return -1;
              }
              if (b.name > a.name) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        games: sortName,
      };

    default:
      return state;
  }
};

export default rootReducer;
