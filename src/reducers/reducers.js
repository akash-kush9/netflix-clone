import * as actionTypes from "./actionTypes";

export const initialState = {
  // user: null,
  user: true,
  movie: null,
  movieId: null,
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_USER:
      return {
        ...state,
        user: action.user,
      };
    case actionTypes.SET_MOVIEID:
      return {
        ...state,
        movieId: action.movieId,
      };
    case actionTypes.SET_MOVIE:
      return {
        ...state,
        movie: action.movie,
      };
    default:
      return state;
  }
};
