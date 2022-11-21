const API_KEY = "a832220b2dffe49b3236d290bebb942a";
const BASE_PATH = "https://api.themoviedb.org/3";
const LANGUAGE = "ko-KR";

interface IMovie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}
//===== MOVIE_API=======================
export interface IMovieResult {
  page: number;
  results: IMovie[];
  total_pages: number;
  total_results: number;
}

interface IGernes {
  name: string;
}

export interface IMovieDetail {
  adult: boolean;
  genres: IGernes[];
  runtime: number;
  tagline: string;
  overview: string;
  status: string;
  vote_average: string;
}

export function getMovies_popular() {
  return fetch(
    `${BASE_PATH}//movie/popular?api_key=${API_KEY}&language=${LANGUAGE}`
  ).then((response) => response.json());
}

export function getMovies_nowPlaying() {
  return fetch(
    `${BASE_PATH}//movie/now_playing?api_key=${API_KEY}&language=${LANGUAGE}`
  ).then((response) => response.json());
}

export function getMovies_top() {
  return fetch(
    `${BASE_PATH}//movie/top_rated?api_key=${API_KEY}&language=${LANGUAGE}`
  ).then((response) => response.json());
}

export function getMovies_upComing() {
  return fetch(
    `${BASE_PATH}//movie/upcoming?api_key=${API_KEY}&language=${LANGUAGE}`
  ).then((response) => response.json());
}

export function getMovies_detail(movieId: string) {
  return fetch(
    `${BASE_PATH}/movie/${movieId}?api_key=${API_KEY}&language=${LANGUAGE}`
  ).then((response) => response.json());
}
//===========================
interface ITv {
  id: number;
  backdrop_path: string;
  name: string;
  overview: string;
}

export interface ITvResult {
  results: ITv[];
}

export interface IGetTvDetail {
  genres: IGernes[];
  number_of_episodes: boolean;
  number_of_seasons: number;
  tagline: string;
  overview: string;
  status: string;
  vote_average: string;
}

export function getTv_airingToday() {
  return fetch(
    `${BASE_PATH}/tv/airing_today?api_key=${API_KEY}&language=${LANGUAGE}`
  ).then((response) => response.json());
}

export function getTv_onTheAir() {
  return fetch(
    `${BASE_PATH}/tv/on_the_air?api_key=${API_KEY}&language=${LANGUAGE}`
  ).then((response) => response.json());
}
export function getTv_popular() {
  return fetch(
    `${BASE_PATH}/tv/popular?api_key=${API_KEY}&language=${LANGUAGE}`
  ).then((response) => response.json());
}
export function getTv_top() {
  return fetch(
    `${BASE_PATH}/tv/top_rated?api_key=${API_KEY}&language=${LANGUAGE}`
  ).then((response) => response.json());
}

export function getTv_detail(tvId?: string) {
  return fetch(
    `${BASE_PATH}/tv/${tvId}?api_key=${API_KEY}&language=${LANGUAGE}`
  ).then((response) => response.json());
}
