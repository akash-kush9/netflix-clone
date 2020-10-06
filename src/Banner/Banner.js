import React, { useState, useEffect } from "react";
import "./Banner.css";
import axios, { BASE_URL } from "./../axios";
import requests from "./../requests";

const Banner = () => {
  const [movie, setMovie] = useState({});
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
          <button className="banner__button">Play </button>
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
// backdrop_path: "/wXXaPMgrv96NkH8KD1TMdS2d7iq.jpg"
// first_air_date: "2010-10-31"
// genre_ids: (3) [18, 10759, 10765]
// id: 1402
// media_type: "tv"
// name: "The Walking Dead"
// origin_country: ["US"]
// original_language: "en"
// original_name: "The Walking Dead"
// overview: "Sheriff's deputy Rick Grimes awakens from a coma to find a post-apocalyptic world dominated by flesh-eating zombies. He sets out to find his family and encounters many other survivors along the way."
// popularity: 655.857
// poster_path: "/qgjP2OrrX9gc6M270xdPnEmE9tC.jpg"
// vote_average: 7.8
// vote_count: 7880
