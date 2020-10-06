const API_KEY = "72b804adff5d612f3f85e8b1e9ea93a4";

const requests = {
  fetch_Trending: `/trending/all/week?api_key=${API_KEY}&language=en-US`,
  fetch_Netflix_Originals: `/discover/tv?api_key=${API_KEY}&with_network=213`,
  fetch_Top_Rated: `/movie/top_rated?api_key=${API_KEY}&language=en-US`,
  fetch_Action_Movies: `/discover/movie?api_key=${API_KEY}&with_genres=28`,
  fetch_Comedy_Movies: `/discover/movie?api_key=${API_KEY}&with_genres=35`,
  fetch_Horror_Movies: `/discover/movie?api_key=${API_KEY}&with_genres=27`,
  fetch_Romance_Movies: `/discover/movie?api_key=${API_KEY}&with_genres=10749`,
  fetch_Documentaries: `/discover/movie?api_key=${API_KEY}&with_genres=99`,
};

export default requests;
