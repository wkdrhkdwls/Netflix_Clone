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

export interface INowplayingMoviesResult {
  dates: {
    maximum: string;
    minimum: string;
  };
  page: number;
  results: IMovie[];
  total_pages: number;
  total_results: number;
}

export interface ITopMoviesResult {
  page: number;
  results: IMovie[];
  total_pages: number;
  total_results: number;
}

export interface IUpComingMoviesResult {
  dates: {
    maximum: string;
    minimum: string;
  };
  page: number;
  results: IMovie[];
  total_pages: number;
  total_results: number;
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
