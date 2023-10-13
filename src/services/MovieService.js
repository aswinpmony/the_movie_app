const axios = require("axios").default;
import LANGUAGES from "../constants/Languages";

import {
  ENDPOINTS,
  TMDB_API_KEY,
  TMDB_BASE_URL,
  TMDB_IMAGE_BASE_URL,
  YOUTUBE_BASE_URL
} from "../constants/Urls";

const TMDB_HTTP_REQUEST = axios.create({
  baseURL: TMDB_BASE_URL,
  params: {
    api_key: TMDB_API_KEY,
  },
});
const getNewPlayingMovies = () =>
  TMDB_HTTP_REQUEST.get(ENDPOINTS.UPCOMING_MOVIES);

const getUpcomingMovies = () =>
  TMDB_HTTP_REQUEST.get(ENDPOINTS.NOW_PLAYING_MOVIES);

const getMovieById = (movieId,append_to_response="") =>
  TMDB_HTTP_REQUEST.get(`${ENDPOINTS.MOVIE}/${movieId}`,append_to_response?{params:{append_to_response}}:null
  );

const getAllGenres = () => TMDB_HTTP_REQUEST.get(ENDPOINTS.GENRES);

const getPoster = (path) => `${TMDB_IMAGE_BASE_URL}/original${path}`;

const getVideo = (key) => `${YOUTUBE_BASE_URL}?v=${key}`;

const getLanguage = (language_iso) =>
  LANGUAGES.find((language) => language.iso_639_1 === language_iso);

export {
  getNewPlayingMovies,
  getPoster,
  getLanguage,
  getAllGenres,
  getUpcomingMovies,
  getMovieById,
  getVideo
};
