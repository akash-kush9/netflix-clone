import React, { useState, useEffect } from "react";
import "./Banner.css";
import axios, { BASE_URL } from "./../../axios";
import requests from "./../../requests";
import { useHistory } from "react-router-dom";

const Banner = () => {
  const [movie, setMovie] = useState({});
  const history = useHistory();
  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.fetch_Trending);

      setMovie(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length - 1)
        ]
      );
      return request;
    }
    fetchData();
  }, []);

  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }
  return (
    <header
      className="banner"
      style={{
        backgroundPosition: "center center",
        backgroundSize: "cover",
        backgroundImage: `url("${BASE_URL}${movie?.backdrop_path}")`,
      }}
    >
      <div className="banner__contents">
        <h1 className="banner__title">
          {movie?.title || movie?.name || movie?.original_name}{" "}
        </h1>

        <div className="banner__buttons">
          <button
            className="banner__button"
            onClick={() => {
              history.push(`movieDetail/${movie?.id}`);
            }}
          >
            Play{" "}
          </button>
          <button className="banner__button">My List</button>
        </div>
        <h1 className="banner__description">
          {truncate(movie?.overview, 200)}
        </h1>
      </div>
      <div className="banner--fadeBottom"></div>
    </header>
  );
};

export default Banner;
