import React, { useState, useEffect } from "react";
import "./Row.css";
import axios, { BASE_URL } from "./../axios";
import YouTube from "react-youtube";
import MovieTrailer from "movie-trailer";
const default_background =
  "https://image.shutterstock.com/image-vector/coming-soon-red-square-grunge-260nw-325508384.jpg";
// "https://i1.wp.com/itsfoss.com/wp-content/uploads/2015/03/desktop-wallpaper-ubuntu-vivid.jpg?ssl=1";
const opts = {
  height: "350px",
  width: "100%",
  playerVars: {
    autoplay: 1,
  },
};
const Row = ({ title, fetchUrl, isLargeRow }) => {
  const [movies, setMovies] = useState([]);
  const [fetchStatus, setFetchStatus] = useState();
  const [trailerId, setTrailerId] = useState(null);

  const findTrailerId = (originalTitle, title) => {
    if (originalTitle || title) {
      // Alternate method with search URL
      // MovieTrailer(originalTitle || title)
      //   .then((url) => {
      //     const urlParams = new URLSearchParams(new URL(url).search);
      //     setTrailerId(urlParams.get("v"));
      //   }).catch();
      MovieTrailer(originalTitle || title, { id: true, multi: false })
        .then((result) => {
          trailerId === result ? setTrailerId(null) : setTrailerId(result);
        })
        .catch((error) => {
          // Do nothing
          console.error(error);
        });
    }
  };

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      // console.table(request.data.results);
      setMovies(request.data.results);
      setFetchStatus(request.status);
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
              findTrailerId(movie?.original_title, movie?.title);
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
      {trailerId && (
        <YouTube
          onEnd={() => setTimeout(setTrailerId(""), 2000)}
          videoId={trailerId}
          opts={opts}
        />
      )}
    </div>
  );
};

export default Row;

// adult: false
// backdrop_path: "/uN4BEmphubHVBSFibqiOwi7wq28.jpg"
// genre_ids: (4) [28, 12, 35, 14]
// id: 621870
// overview: "Sam is a teenage royal rebel, second in line to the throne of the kingdom of Illyria. Just as her disinterest in the royal way of life is at an all-time high, she discovers she has super-human abilities and is invited to join a secret society of similar extraordinary second-born royals charged with keeping the world safe."
// popularity: 1258.996
// poster_path: "/x0fojycYFbT0eqXXbEO6aDqkalX.jpg"
// release_date: "2020-09-25"
// video: false
// vote_average: 7.2
// vote_count: 100
{
  /* <div id={movie.id}>
              <h1> {movie.original_title || movie.title}</h1>
              <p> {movie.overview}</p>
              <p>{movie.vote}</p>
              <p>{movie.adult ? "adult" : "ok"}</p>
              <p>{movie.release_date}</p>
              <p>{movie.vote_average}</p>
              <p>{movie.vote_count}</p>
            </div> */
}
