import React, { useState, useEffect } from "react";
import "./Row.css";
import axios, { BASE_URL } from "./../../axios";
import { useStateValue } from "./../../reducers/StateProvider";
import * as actionTypes from "./../../reducers/actionTypes";
import { Link, useHistory } from "react-router-dom";
const default_background =
  "https://image.shutterstock.com/image-vector/coming-soon-red-square-grunge-260nw-325508384.jpg";
// "https://i1.wp.com/itsfoss.com/wp-content/uploads/2015/03/desktop-wallpaper-ubuntu-vivid.jpg?ssl=1";

const Row = ({ title, fetchUrl, isLargeRow }) => {
  const [movies, setMovies] = useState([]);
  const history = useHistory();
  const [{}, dispatch] = useStateValue();
  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      
      return request;
    }
    fetchData();
    return () => {};
  }, [fetchUrl]);

  return (
    <div className="row">
      <h2>{title}</h2>

      <div className="row__posters">
        {movies?.map((movie) => (
          <img
            onClick={() => {
              dispatch({
                type: actionTypes.SET_MOVIEID,
                movieId: movie.id,
              });
              dispatch({
                type: actionTypes.SET_MOVIE,
                movie: movie,
              });
              history.push(`/movieDetail/${movie.id}`);
            }}
            key={`${title}__${movie.id}`}
            className={`row__poster ${isLargeRow && "row__posterLarge"} `}
            alt={movie.original_title || movie.title}
            src={
              isLargeRow
                ? movie?.poster_path
                  ? `${BASE_URL}${movie?.poster_path}`
                  : `${default_background}`
                : movie?.backdrop_path
                ? `${BASE_URL}${movie?.backdrop_path}`
                : `${default_background}`
            }
          />
        ))}
      </div>
    </div>
  );
};

export default Row;
