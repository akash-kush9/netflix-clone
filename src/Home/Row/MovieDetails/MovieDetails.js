import React, { useState, useEffect } from "react";
import "./MovieDetails.css";
import YouTube from "react-youtube";
import MovieTrailer from "movie-trailer";
import axios, { BASE_URL } from "./../../../axios";
import requests, { searchMovieById } from "./../../../requests";
import { useHistory, useParams } from "react-router-dom";
import { useStateValue } from "../../../reducers/StateProvider";
import ViewWeekIcon from "@material-ui/icons/ViewWeek";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import PlayCircleFilledWhiteIcon from "@material-ui/icons/PlayCircleFilledWhite";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import KeyboardReturnIcon from "@material-ui/icons/KeyboardReturn";
import PauseCircleFilledIcon from "@material-ui/icons/PauseCircleFilled";
import { IconButton } from "@material-ui/core";
const default_background =
  "https://rvv.tv/wp-content/uploads/2016/04/missing-image-640x360.png";

const MovieDetails = () => {
  const { mid } = useParams();
  const [{ movieId, movie }, dispatch] = useStateValue();
  const [movieDetail, setMovieDetail] = useState(null);
  const [trailerId, setTrailerId] = useState("");
  const history = useHistory();

  const opts = {
    playerVars: {
      autoplay: 1,
    },
  };
  const playTrailer = () => {
    if (!trailerId) {
      //Find trailer id and play on youtube
      MovieTrailer(movieDetail?.originalTitle || movieDetail?.title, {
        id: true,
        multi: false,
      })
        .then((result) => {
          setTrailerId(result);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  const stopTrailer = () => {
    setTrailerId("");
  };

  useEffect(() => {
    if (mid === movieId) setMovieDetail(movie);
    else {
      const searchUrl = searchMovieById.replace("MOVIE_ID", mid);
      axios
        .get(searchUrl)
        .then((result) => {
          setMovieDetail(result.data);
        })
        .catch((error) => console.log(error));
    }
  }, []);

  return (
    <div className="movie">
      <div className="movie__info">
        <div className="movie__infoLeft">
          {trailerId ? (
            <YouTube
              videoId={trailerId}
              opts={opts}
              className="movie__previewItem"
            />
          ) : (
            <img
              src={
                movieDetail?.backdrop_path || movieDetail?.poster_path
                  ? `${BASE_URL}${
                      movieDetail?.backdrop_path || movieDetail?.poster_path
                    }`
                  : default_background
              }
            />
          )}

          <div className="movie__tabIcons">
            <IconButton onClick={() => history.push("/")}>
              <CheckBoxOutlineBlankIcon />
            </IconButton>
            <IconButton onClick={() => playTrailer()}>
              {trailerId ? <PauseCircleFilledIcon /> : <PlayArrowIcon />}
            </IconButton>
            <IconButton onClick={() => stopTrailer()}>
              <KeyboardReturnIcon />
            </IconButton>
          </div>
        </div>
        <div className="movie__infoRight">
          <div className="movie_topContainer">
            <h1 className="movie__title">
              {movieDetail?.original_title || movieDetail?.title}
            </h1>
            <div className="movie__runInfo">
              <p>{movieDetail?.release_date} </p>
              <p> | </p>
              <p>2h 23min</p>
              <p> | </p>
              <p>{movieDetail?.adult ? "18+" : "7+"}</p>
            </div>
          </div>
          <div className="movie_centerContainer">
            <h3>
              {movieDetail?.overview.length > 200
                ? `${movieDetail?.overview.substr(0, 200)}...`
                : movieDetail?.overview}
            </h3>
            <p>
              <span> Starring </span> {" Data not avaiable with API"}
            </p>
            <p>
              <span> Created By </span>
              {" Data not avaiable with API"}
            </p>
            <p>
              <span> Genre </span>{" "}
              {movieDetail?.genres?.length > 0
                ? `${movieDetail?.genres
                    ?.map((genre) => genre.name)
                    .join(", ")}`
                : " Data not avaiable with API"}
            </p>
          </div>
          <div className="movie_bottomContainer">
            <p>
              <strong>Upvotes :</strong>
              <span>
                {" "}
                {movieDetail?.vote_count}
                {"   "}{" "}
              </span>
            </p>
            <p>
              <strong>Rating :</strong>
              <span>
                {"   "} {movieDetail?.vote_average}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;

// const opts = {
//   height: "390",
//   width: "640",
//   playerVars: {
//     https://developers.google.com/youtube/player_parameters
//     autoplay: 1,
//   },
// };
// const findTrailerId = (movieId) => {
//   Alternate method with search URL
//   MovieTrailer(originalTitle || title)
//     .then((url) => {
//       const urlParams = new URLSearchParams(new URL(url).search);
//       setTrailerId(urlParams.get("v"));
//     }).catch();
// };
// (
//   <div className="movieDetails" id={movie?.id}>
//     {/* <YouTube videoId={trailerId} opts={opts} /> */}

//   </div>
// );

// let movie = {
//   adult: false,
//   backdrop_path: "/kMe4TKMDNXTKptQPAdOF0oZHq3V.jpg",
//   genre_ids: (3)[(80, 18, 9648)],
//   id: 497582,
//   media_type: "movie",
//   original_language: "en",
//   original_title: "Enola Holmes",
//   overview:
//     "While searching for her missing mother, intrepid teen Enola Holmes uses her sleuthing skills to outsmart big brother Sherlock and help a runaway lord.",
//   popularity: 1730.974,
//   poster_path: "/riYInlsq2kf1AWoGm80JQW5dLKp.jpg",
//   release_date: "2020-09-23",
//   title: "Enola Holmes",
//   video: false,
//   vote_average: 7.7,
//   vote_count: 1637,
// };
