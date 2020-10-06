import React from "react";
import "./App.css";
import Row from "./Row/Row";
import requests from "./requests";
import Banner from "./Banner/Banner";
import Nav from "./Nav/Nav";
function App() {
  const showLarge = ["fetch_Trending", "fetch_Comedy_Movies"];
  return (
    <div className="app">
      <Nav />
      <Banner />
      {Object.keys(requests).map((type) => (
        <Row
          title={type.split("_").splice(1).join(" ")}
          fetchUrl={requests[type]}
          isLargeRow={showLarge.includes(type)}
        />
      ))}
    </div>
  );
}

export default App;
