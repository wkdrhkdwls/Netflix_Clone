import { useQuery } from "react-query";
import { AnimatePresence, useScroll } from "framer-motion";
import {
  getMovies_nowPlaying,
  getMovies_popular,
  getMovies_top,
  getMovies_upComing,
  IMovieResult,
} from "../api";
import { makeImagePath } from "../utils";
import { useState } from "react";
import useWindowDimensions from "../useWindowDimensions";
import { useHistory, useRouteMatch } from "react-router-dom";
import {
  Banner,
  BigCover,
  BigMovie,
  BigTitle,
  Box,
  Info,
  LArrowSvg,
  Loader,
  offset,
  Overlay,
  Overview,
  RArrowSvg,
  Row,
  Slider,
  SubTitle,
  Title,
  Wrapper,
} from "../Components/Style/MainStyle";
import { boxVariants, infoVariants } from "../Components/Style/MainVariant";
import { sliderBtnVariant } from "../Components/RightArrow";
import MovieDetail from "../Components/Detail/MovieDetail";

const categorys = {
  nowPlaying: "nowPlaying",
  latest: "latest",
  topRated: "topRated",
  upComing: "upComing",
};

function Home() {
  const history = useHistory();
  const bigMovieMatch = useRouteMatch<{ movieId: string }>("/movies/:movieId");
  const { scrollY } = useScroll();
  const width = useWindowDimensions();
  //============영화 API DATA=========

  // Now Playing
  const { data: nowData, isLoading: nowIsLoading } = useQuery<IMovieResult>(
    ["movies", categorys.nowPlaying],
    getMovies_nowPlaying
  );
  // latest
  const { data: popularData, isLoading: popularIsLoading } =
    useQuery<IMovieResult>(["movies", categorys.latest], getMovies_popular);
  // top_rate
  const { data: topData, isLoading: topIsLoading } = useQuery<IMovieResult>(
    ["movies", categorys.topRated],
    getMovies_top
  );
  // Upcoming
  const { data: upComingData, isLoading: upComingIsLoading } =
    useQuery<IMovieResult>(["movies", categorys.upComing], getMovies_upComing);

  //============증가 , 감소==================

  const [nowIndex, setNowIndex] = useState(0);
  const [latestIndex, setLatestIndex] = useState(0);
  const [topIndex, setTopIndex] = useState(0);
  const [upComingIndex, setUpComingIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const [back, setBack] = useState(false);
  const increaseBox = (category: string, data: any) => {
    if (data) {
      if (leaving) return;
      toggleLeaving();
      setBack(false);
      let totalMovies = data.results.length;
      let maxIndex = Math.floor(totalMovies / offset) - 1;
      if (category === categorys.nowPlaying) {
        totalMovies = totalMovies - 1; // Banner에 보여준 영화를 뺸 나머지 영화의 수
        setNowIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
      } else if (category === categorys.latest) {
        setLatestIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
      } else if (category === categorys.topRated) {
        setTopIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
      } else if (category === categorys.upComing) {
        setUpComingIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
      }
    }
  };

  const decreaseBox = (category: string, data: any) => {
    if (data) {
      if (leaving) return;
      toggleLeaving();
      setBack(false);
      let totalMovies = data.results.length;
      let maxIndex = Math.floor(totalMovies / offset) - 1;
      if (category === categorys.nowPlaying) {
        totalMovies = totalMovies - 1; // Banner에 보여준 영화를 뺸 나머지 영화의 수
        setNowIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
      } else if (category === categorys.latest) {
        setLatestIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
      } else if (category === categorys.topRated) {
        setTopIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
      } else if (category === categorys.upComing) {
        setUpComingIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
      }
    }
  };

  //=========================================
  const [clickMovie, setClickMovie] = useState<IMovieResult>();
  const [clickRow, setClickRow] = useState<string>();

  const toggleLeaving = () => setLeaving((prev) => !prev);
  const onBoxClicked = (category: string, movieId: number) => {
    history.push(`/movies/${movieId}`);
    setClickRow(category);
    if (category === categorys.nowPlaying) {
      setClickMovie(nowData);
    } else if (category === categorys.latest) {
      setClickMovie(popularData);
    } else if (category === categorys.topRated) {
      setClickMovie(topData);
    } else if (category === categorys.upComing) {
      setClickMovie(upComingData);
    }
  };
  const onOverlayClick = () => history.push("/");
  const clickedMovie =
    bigMovieMatch?.params.movieId &&
    clickMovie?.results.find(
      (movie) => movie.id === +bigMovieMatch.params.movieId
    );

  return (
    <Wrapper>
      {nowIsLoading || popularIsLoading || topIsLoading || upComingIsLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner
            bgPhoto={makeImagePath(topData?.results[1].backdrop_path || "")}
          >
            <Title>{topData?.results[1].title}</Title>
            <Overview>{topData?.results[1].overview}</Overview>
          </Banner>
          <Slider>
            <SubTitle>Now Playing Movies</SubTitle>

            <LArrowSvg
              onClick={() => decreaseBox(categorys.nowPlaying, nowData)}
              variants={sliderBtnVariant}
              initial="left"
              exit="leftExit"
              whileHover="leftAction"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 226 226"
            >
              <g
                fill="none"
                fillRule="nonzero"
                stroke="none"
                strokeWidth="1"
                strokeLinecap="butt"
                strokeLinejoin="miter"
                strokeMiterlimit="10"
                strokeDasharray=""
                strokeDashoffset="0"
                fontFamily="none"
                fontWeight="none"
                fontSize="none"
                textAnchor="none"
              >
                <path d="M0,226v-226h226v226z" fill="none"></path>
                <g fill="#ffffff">
                  <path d="M188.15515,86.31788h-76.67006l17.43466,-17.43422c10.40306,-10.4035 10.40306,-27.33099 0,-37.7345c-10.42866,-10.42866 -27.3076,-10.4269 -37.7345,0l-78.72966,78.72966c-1.72369,1.72369 -1.72369,4.51868 0,6.24281l78.72966,78.72966c10.42911,10.42866 27.30671,10.42778 37.7345,0c10.40306,-10.4035 10.40306,-27.33099 0,-37.7345l-17.43466,-17.43422h76.66962c14.71251,0 26.68212,-11.96961 26.68212,-26.68212c0,-14.71251 -11.96917,-26.68257 -26.68168,-26.68257zM188.15515,130.854h-87.32649c-1.78549,0 -3.39486,1.07571 -4.07815,2.7248c-0.6833,1.64954 -0.30545,3.54802 0.95697,4.81045l24.96947,24.96947c3.37234,3.37234 5.22978,7.85571 5.22978,12.6251c0,9.86852 -7.98813,17.854 -17.85444,17.854c-4.76895,0 -9.25276,-1.85744 -12.62466,-5.22978l-75.60848,-75.60804l75.60892,-75.60848c6.97819,-6.97863 18.27245,-6.97687 25.24932,0c6.97819,6.97819 6.97863,18.27113 0,25.24932l-24.96947,24.96947c-1.26242,1.26242 -1.64027,3.16091 -0.95697,4.81045c0.6833,1.64909 2.29266,2.7248 4.07815,2.7248h87.32605c9.84468,0 17.854,8.00932 17.854,17.854c0,9.84468 -8.00976,17.85444 -17.854,17.85444z"></path>
                </g>
              </g>
            </LArrowSvg>
            <AnimatePresence
              initial={false}
              onExitComplete={toggleLeaving}
              custom={back}
            >
              <Row
                initial={{ x: width + 10 }}
                animate={{ x: 0 }}
                exit={{ x: -width - 10 }}
                transition={{ type: "tween", duration: 1 }}
                custom={back}
                key={nowIndex}
              >
                {nowData?.results
                  .slice(1) // 맨처음 1개를 자름 (Banner로 보여준 영화)
                  .slice(offset * nowIndex, offset * nowIndex + offset) // 그다음부터 6개씩 자름
                  .map((movie) => (
                    <Box
                      layoutId={movie.id + categorys.nowPlaying}
                      key={movie.id + categorys.nowPlaying}
                      bgPhoto={makeImagePath(movie.backdrop_path, "w500")}
                      onClick={() =>
                        onBoxClicked(categorys.nowPlaying, movie.id)
                      }
                      variants={boxVariants}
                      initial="normal"
                      transition={{ type: "tween" }}
                      whileHover="hover"
                    >
                      <Info variants={infoVariants}>
                        <h4>{movie.title}</h4>
                      </Info>
                    </Box>
                  ))}
              </Row>
              <RArrowSvg
                variants={sliderBtnVariant}
                initial="right"
                whileHover="rightAction"
                onClick={() => increaseBox(categorys.nowPlaying, nowData)}
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 226 226"
              >
                <g
                  fill="none"
                  fillRule="nonzero"
                  stroke="none"
                  strokeWidth="1"
                  strokeLinecap="butt"
                  strokeLinejoin="miter"
                  strokeMiterlimit="10"
                  strokeDasharray=""
                  strokeDashoffset="0"
                  fontFamily="none"
                  fontWeight="none"
                  fontSize="none"
                  textAnchor="none"
                >
                  <path d="M0,226v-226h226v226z" fill="none"></path>
                  <g fill="#ffffff">
                    <path d="M213.5444,109.87882l-78.72966,-78.7301c-10.42866,-10.42866 -27.3076,-10.42646 -37.7345,0c-10.40306,10.4035 -10.40306,27.33099 0,37.7345l17.43422,17.43422h-76.66962c-14.71251,0 -26.68212,11.96961 -26.68212,26.68213c0,14.71251 11.96961,26.68213 26.68213,26.68213h76.66918l-17.43422,17.43422c-10.40306,10.4035 -10.40306,27.33099 0,37.7345c10.42911,10.42866 27.30671,10.42778 37.7345,0l78.72966,-78.72966c1.72457,-1.72325 1.72457,-4.51823 0.00044,-6.24193zM128.57193,188.60848c-3.37234,3.37234 -7.85571,5.22978 -12.62466,5.22978c-9.8694,0 -17.85444,-7.98813 -17.85444,-17.854c0,-4.76939 1.85744,-9.25276 5.22934,-12.6251l24.96947,-24.96947c1.26198,-1.26242 1.63982,-3.16091 0.95697,-4.81045c-0.6833,-1.64909 -2.29266,-2.7248 -4.07815,-2.7248h-87.32561c-9.84468,0 -17.854,-8.00932 -17.854,-17.854c0,-9.84468 8.00932,-17.854 17.854,-17.854h87.32605c1.78549,0 3.39486,-1.07571 4.07815,-2.7248c0.68286,-1.64954 0.30501,-3.54802 -0.95697,-4.81045l-24.96947,-24.96947c-6.97775,-6.97775 -6.97819,-18.27113 0,-25.24932c6.97819,-6.97819 18.27245,-6.97731 25.24932,0l75.60848,75.60759z"></path>
                  </g>
                </g>
              </RArrowSvg>
            </AnimatePresence>
          </Slider>
          <Slider>
            <SubTitle>Latest Movies</SubTitle>
            <LArrowSvg
              onClick={() => decreaseBox(categorys.latest, popularData)}
              variants={sliderBtnVariant}
              initial="left"
              exit="leftExit"
              whileHover="leftAction"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 226 226"
            >
              <g
                fill="none"
                fillRule="nonzero"
                stroke="none"
                strokeWidth="1"
                strokeLinecap="butt"
                strokeLinejoin="miter"
                strokeMiterlimit="10"
                strokeDasharray=""
                strokeDashoffset="0"
                fontFamily="none"
                fontWeight="none"
                fontSize="none"
                textAnchor="none"
              >
                <path d="M0,226v-226h226v226z" fill="none"></path>
                <g fill="#ffffff">
                  <path d="M188.15515,86.31788h-76.67006l17.43466,-17.43422c10.40306,-10.4035 10.40306,-27.33099 0,-37.7345c-10.42866,-10.42866 -27.3076,-10.4269 -37.7345,0l-78.72966,78.72966c-1.72369,1.72369 -1.72369,4.51868 0,6.24281l78.72966,78.72966c10.42911,10.42866 27.30671,10.42778 37.7345,0c10.40306,-10.4035 10.40306,-27.33099 0,-37.7345l-17.43466,-17.43422h76.66962c14.71251,0 26.68212,-11.96961 26.68212,-26.68212c0,-14.71251 -11.96917,-26.68257 -26.68168,-26.68257zM188.15515,130.854h-87.32649c-1.78549,0 -3.39486,1.07571 -4.07815,2.7248c-0.6833,1.64954 -0.30545,3.54802 0.95697,4.81045l24.96947,24.96947c3.37234,3.37234 5.22978,7.85571 5.22978,12.6251c0,9.86852 -7.98813,17.854 -17.85444,17.854c-4.76895,0 -9.25276,-1.85744 -12.62466,-5.22978l-75.60848,-75.60804l75.60892,-75.60848c6.97819,-6.97863 18.27245,-6.97687 25.24932,0c6.97819,6.97819 6.97863,18.27113 0,25.24932l-24.96947,24.96947c-1.26242,1.26242 -1.64027,3.16091 -0.95697,4.81045c0.6833,1.64909 2.29266,2.7248 4.07815,2.7248h87.32605c9.84468,0 17.854,8.00932 17.854,17.854c0,9.84468 -8.00976,17.85444 -17.854,17.85444z"></path>
                </g>
              </g>
            </LArrowSvg>
            <AnimatePresence
              initial={false}
              onExitComplete={toggleLeaving}
              custom={back}
            >
              <Row
                initial={{ x: width + 10 }}
                animate={{ x: 0 }}
                exit={{ x: -width - 10 }}
                transition={{ type: "tween", duration: 1 }}
                custom={back}
                key={latestIndex}
              >
                {popularData?.results
                  .slice(1) // 맨처음 1개를 자름 (Banner로 보여준 영화)
                  .slice(offset * latestIndex, offset * latestIndex + offset) // 그다음부터 6개씩 자름
                  .map((movie) => (
                    <Box
                      layoutId={movie.id + categorys.latest}
                      key={movie.id + categorys.latest}
                      bgPhoto={makeImagePath(movie.backdrop_path, "w500")}
                      onClick={() => onBoxClicked(categorys.latest, movie.id)}
                      variants={boxVariants}
                      initial="normal"
                      transition={{ type: "tween" }}
                      whileHover="hover"
                    >
                      <Info variants={infoVariants}>
                        <h4>{movie.title}</h4>
                      </Info>
                    </Box>
                  ))}
              </Row>
              <RArrowSvg
                variants={sliderBtnVariant}
                initial="right"
                whileHover="rightAction"
                onClick={() => increaseBox(categorys.latest, popularData)}
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 226 226"
              >
                <g
                  fill="none"
                  fillRule="nonzero"
                  stroke="none"
                  strokeWidth="1"
                  strokeLinecap="butt"
                  strokeLinejoin="miter"
                  strokeMiterlimit="10"
                  strokeDasharray=""
                  strokeDashoffset="0"
                  fontFamily="none"
                  fontWeight="none"
                  fontSize="none"
                  textAnchor="none"
                >
                  <path d="M0,226v-226h226v226z" fill="none"></path>
                  <g fill="#ffffff">
                    <path d="M213.5444,109.87882l-78.72966,-78.7301c-10.42866,-10.42866 -27.3076,-10.42646 -37.7345,0c-10.40306,10.4035 -10.40306,27.33099 0,37.7345l17.43422,17.43422h-76.66962c-14.71251,0 -26.68212,11.96961 -26.68212,26.68213c0,14.71251 11.96961,26.68213 26.68213,26.68213h76.66918l-17.43422,17.43422c-10.40306,10.4035 -10.40306,27.33099 0,37.7345c10.42911,10.42866 27.30671,10.42778 37.7345,0l78.72966,-78.72966c1.72457,-1.72325 1.72457,-4.51823 0.00044,-6.24193zM128.57193,188.60848c-3.37234,3.37234 -7.85571,5.22978 -12.62466,5.22978c-9.8694,0 -17.85444,-7.98813 -17.85444,-17.854c0,-4.76939 1.85744,-9.25276 5.22934,-12.6251l24.96947,-24.96947c1.26198,-1.26242 1.63982,-3.16091 0.95697,-4.81045c-0.6833,-1.64909 -2.29266,-2.7248 -4.07815,-2.7248h-87.32561c-9.84468,0 -17.854,-8.00932 -17.854,-17.854c0,-9.84468 8.00932,-17.854 17.854,-17.854h87.32605c1.78549,0 3.39486,-1.07571 4.07815,-2.7248c0.68286,-1.64954 0.30501,-3.54802 -0.95697,-4.81045l-24.96947,-24.96947c-6.97775,-6.97775 -6.97819,-18.27113 0,-25.24932c6.97819,-6.97819 18.27245,-6.97731 25.24932,0l75.60848,75.60759z"></path>
                  </g>
                </g>
              </RArrowSvg>
            </AnimatePresence>
          </Slider>
          <Slider>
            <SubTitle>Top Rate Movies</SubTitle>
            <LArrowSvg
              onClick={() => decreaseBox(categorys.topRated, topData)}
              variants={sliderBtnVariant}
              initial="left"
              exit="leftExit"
              whileHover="leftAction"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 226 226"
            >
              <g
                fill="none"
                fillRule="nonzero"
                stroke="none"
                strokeWidth="1"
                strokeLinecap="butt"
                strokeLinejoin="miter"
                strokeMiterlimit="10"
                strokeDasharray=""
                strokeDashoffset="0"
                fontFamily="none"
                fontWeight="none"
                fontSize="none"
                textAnchor="none"
              >
                <path d="M0,226v-226h226v226z" fill="none"></path>
                <g fill="#ffffff">
                  <path d="M188.15515,86.31788h-76.67006l17.43466,-17.43422c10.40306,-10.4035 10.40306,-27.33099 0,-37.7345c-10.42866,-10.42866 -27.3076,-10.4269 -37.7345,0l-78.72966,78.72966c-1.72369,1.72369 -1.72369,4.51868 0,6.24281l78.72966,78.72966c10.42911,10.42866 27.30671,10.42778 37.7345,0c10.40306,-10.4035 10.40306,-27.33099 0,-37.7345l-17.43466,-17.43422h76.66962c14.71251,0 26.68212,-11.96961 26.68212,-26.68212c0,-14.71251 -11.96917,-26.68257 -26.68168,-26.68257zM188.15515,130.854h-87.32649c-1.78549,0 -3.39486,1.07571 -4.07815,2.7248c-0.6833,1.64954 -0.30545,3.54802 0.95697,4.81045l24.96947,24.96947c3.37234,3.37234 5.22978,7.85571 5.22978,12.6251c0,9.86852 -7.98813,17.854 -17.85444,17.854c-4.76895,0 -9.25276,-1.85744 -12.62466,-5.22978l-75.60848,-75.60804l75.60892,-75.60848c6.97819,-6.97863 18.27245,-6.97687 25.24932,0c6.97819,6.97819 6.97863,18.27113 0,25.24932l-24.96947,24.96947c-1.26242,1.26242 -1.64027,3.16091 -0.95697,4.81045c0.6833,1.64909 2.29266,2.7248 4.07815,2.7248h87.32605c9.84468,0 17.854,8.00932 17.854,17.854c0,9.84468 -8.00976,17.85444 -17.854,17.85444z"></path>
                </g>
              </g>
            </LArrowSvg>
            <AnimatePresence
              initial={false}
              onExitComplete={toggleLeaving}
              custom={back}
            >
              <Row
                initial={{ x: width + 10 }}
                animate={{ x: 0 }}
                exit={{ x: -width - 10 }}
                transition={{ type: "tween", duration: 1 }}
                custom={back}
                key={topIndex}
              >
                {topData?.results
                  .slice(1) // 맨처음 1개를 자름 (Banner로 보여준 영화)
                  .slice(offset * topIndex, offset * topIndex + offset) // 그다음부터 6개씩 자름
                  .map((movie) => (
                    <Box
                      layoutId={movie.id + categorys.topRated}
                      key={movie.id + categorys.topRated}
                      bgPhoto={makeImagePath(movie.backdrop_path, "w500")}
                      onClick={() => onBoxClicked(categorys.topRated, movie.id)}
                      variants={boxVariants}
                      initial="normal"
                      transition={{ type: "tween" }}
                      whileHover="hover"
                    >
                      <Info variants={infoVariants}>
                        <h4>{movie.title}</h4>
                      </Info>
                    </Box>
                  ))}
              </Row>
              <RArrowSvg
                variants={sliderBtnVariant}
                initial="right"
                whileHover="rightAction"
                onClick={() => increaseBox(categorys.topRated, topData)}
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 226 226"
              >
                <g
                  fill="none"
                  fillRule="nonzero"
                  stroke="none"
                  strokeWidth="1"
                  strokeLinecap="butt"
                  strokeLinejoin="miter"
                  strokeMiterlimit="10"
                  strokeDasharray=""
                  strokeDashoffset="0"
                  fontFamily="none"
                  fontWeight="none"
                  fontSize="none"
                  textAnchor="none"
                >
                  <path d="M0,226v-226h226v226z" fill="none"></path>
                  <g fill="#ffffff">
                    <path d="M213.5444,109.87882l-78.72966,-78.7301c-10.42866,-10.42866 -27.3076,-10.42646 -37.7345,0c-10.40306,10.4035 -10.40306,27.33099 0,37.7345l17.43422,17.43422h-76.66962c-14.71251,0 -26.68212,11.96961 -26.68212,26.68213c0,14.71251 11.96961,26.68213 26.68213,26.68213h76.66918l-17.43422,17.43422c-10.40306,10.4035 -10.40306,27.33099 0,37.7345c10.42911,10.42866 27.30671,10.42778 37.7345,0l78.72966,-78.72966c1.72457,-1.72325 1.72457,-4.51823 0.00044,-6.24193zM128.57193,188.60848c-3.37234,3.37234 -7.85571,5.22978 -12.62466,5.22978c-9.8694,0 -17.85444,-7.98813 -17.85444,-17.854c0,-4.76939 1.85744,-9.25276 5.22934,-12.6251l24.96947,-24.96947c1.26198,-1.26242 1.63982,-3.16091 0.95697,-4.81045c-0.6833,-1.64909 -2.29266,-2.7248 -4.07815,-2.7248h-87.32561c-9.84468,0 -17.854,-8.00932 -17.854,-17.854c0,-9.84468 8.00932,-17.854 17.854,-17.854h87.32605c1.78549,0 3.39486,-1.07571 4.07815,-2.7248c0.68286,-1.64954 0.30501,-3.54802 -0.95697,-4.81045l-24.96947,-24.96947c-6.97775,-6.97775 -6.97819,-18.27113 0,-25.24932c6.97819,-6.97819 18.27245,-6.97731 25.24932,0l75.60848,75.60759z"></path>
                  </g>
                </g>
              </RArrowSvg>
            </AnimatePresence>
          </Slider>
          <Slider>
            <SubTitle>UPCOMING Movies</SubTitle>
            <LArrowSvg
              onClick={() => decreaseBox(categorys.upComing, upComingData)}
              variants={sliderBtnVariant}
              initial="left"
              exit="leftExit"
              whileHover="leftAction"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 226 226"
            >
              <g
                fill="none"
                fillRule="nonzero"
                stroke="none"
                strokeWidth="1"
                strokeLinecap="butt"
                strokeLinejoin="miter"
                strokeMiterlimit="10"
                strokeDasharray=""
                strokeDashoffset="0"
                fontFamily="none"
                fontWeight="none"
                fontSize="none"
                textAnchor="none"
              >
                <path d="M0,226v-226h226v226z" fill="none"></path>
                <g fill="#ffffff">
                  <path d="M188.15515,86.31788h-76.67006l17.43466,-17.43422c10.40306,-10.4035 10.40306,-27.33099 0,-37.7345c-10.42866,-10.42866 -27.3076,-10.4269 -37.7345,0l-78.72966,78.72966c-1.72369,1.72369 -1.72369,4.51868 0,6.24281l78.72966,78.72966c10.42911,10.42866 27.30671,10.42778 37.7345,0c10.40306,-10.4035 10.40306,-27.33099 0,-37.7345l-17.43466,-17.43422h76.66962c14.71251,0 26.68212,-11.96961 26.68212,-26.68212c0,-14.71251 -11.96917,-26.68257 -26.68168,-26.68257zM188.15515,130.854h-87.32649c-1.78549,0 -3.39486,1.07571 -4.07815,2.7248c-0.6833,1.64954 -0.30545,3.54802 0.95697,4.81045l24.96947,24.96947c3.37234,3.37234 5.22978,7.85571 5.22978,12.6251c0,9.86852 -7.98813,17.854 -17.85444,17.854c-4.76895,0 -9.25276,-1.85744 -12.62466,-5.22978l-75.60848,-75.60804l75.60892,-75.60848c6.97819,-6.97863 18.27245,-6.97687 25.24932,0c6.97819,6.97819 6.97863,18.27113 0,25.24932l-24.96947,24.96947c-1.26242,1.26242 -1.64027,3.16091 -0.95697,4.81045c0.6833,1.64909 2.29266,2.7248 4.07815,2.7248h87.32605c9.84468,0 17.854,8.00932 17.854,17.854c0,9.84468 -8.00976,17.85444 -17.854,17.85444z"></path>
                </g>
              </g>
            </LArrowSvg>
            <AnimatePresence
              initial={false}
              onExitComplete={toggleLeaving}
              custom={back}
            >
              <Row
                initial={{ x: width + 10 }}
                animate={{ x: 0 }}
                exit={{ x: -width - 10 }}
                transition={{ type: "tween", duration: 1 }}
                custom={back}
                key={upComingIndex}
              >
                {upComingData?.results
                  .slice(1) // 맨처음 1개를 자름 (Banner로 보여준 영화)
                  .slice(
                    offset * upComingIndex,
                    offset * upComingIndex + offset
                  ) // 그다음부터 6개씩 자름
                  .map((movie) => (
                    <Box
                      layoutId={movie.id + categorys.upComing}
                      key={movie.id + categorys.upComing}
                      bgPhoto={makeImagePath(movie.backdrop_path, "w500")}
                      onClick={() => onBoxClicked(categorys.upComing, movie.id)}
                      variants={boxVariants}
                      initial="normal"
                      transition={{ type: "tween" }}
                      whileHover="hover"
                    >
                      <Info variants={infoVariants}>
                        <h4>{movie.title}</h4>
                      </Info>
                    </Box>
                  ))}
              </Row>
              <RArrowSvg
                variants={sliderBtnVariant}
                initial="right"
                whileHover="rightAction"
                onClick={() => increaseBox(categorys.upComing, upComingData)}
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 226 226"
              >
                <g
                  fill="none"
                  fillRule="nonzero"
                  stroke="none"
                  strokeWidth="1"
                  strokeLinecap="butt"
                  strokeLinejoin="miter"
                  strokeMiterlimit="10"
                  strokeDasharray=""
                  strokeDashoffset="0"
                  fontFamily="none"
                  fontWeight="none"
                  fontSize="none"
                  textAnchor="none"
                >
                  <path d="M0,226v-226h226v226z" fill="none"></path>
                  <g fill="#ffffff">
                    <path d="M213.5444,109.87882l-78.72966,-78.7301c-10.42866,-10.42866 -27.3076,-10.42646 -37.7345,0c-10.40306,10.4035 -10.40306,27.33099 0,37.7345l17.43422,17.43422h-76.66962c-14.71251,0 -26.68212,11.96961 -26.68212,26.68213c0,14.71251 11.96961,26.68213 26.68213,26.68213h76.66918l-17.43422,17.43422c-10.40306,10.4035 -10.40306,27.33099 0,37.7345c10.42911,10.42866 27.30671,10.42778 37.7345,0l78.72966,-78.72966c1.72457,-1.72325 1.72457,-4.51823 0.00044,-6.24193zM128.57193,188.60848c-3.37234,3.37234 -7.85571,5.22978 -12.62466,5.22978c-9.8694,0 -17.85444,-7.98813 -17.85444,-17.854c0,-4.76939 1.85744,-9.25276 5.22934,-12.6251l24.96947,-24.96947c1.26198,-1.26242 1.63982,-3.16091 0.95697,-4.81045c-0.6833,-1.64909 -2.29266,-2.7248 -4.07815,-2.7248h-87.32561c-9.84468,0 -17.854,-8.00932 -17.854,-17.854c0,-9.84468 8.00932,-17.854 17.854,-17.854h87.32605c1.78549,0 3.39486,-1.07571 4.07815,-2.7248c0.68286,-1.64954 0.30501,-3.54802 -0.95697,-4.81045l-24.96947,-24.96947c-6.97775,-6.97775 -6.97819,-18.27113 0,-25.24932c6.97819,-6.97819 18.27245,-6.97731 25.24932,0l75.60848,75.60759z"></path>
                  </g>
                </g>
              </RArrowSvg>
            </AnimatePresence>
          </Slider>
          <AnimatePresence>
            {bigMovieMatch ? (
              <>
                <Overlay
                  onClick={onOverlayClick}
                  exit={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                />
                <BigMovie
                  style={{ top: scrollY.get() + 100 }}
                  layoutId={bigMovieMatch.params.movieId + clickRow}
                >
                  {clickedMovie && (
                    <>
                      <BigCover
                        style={{
                          backgroundImage: `linear-gradient(to top, black, transparent), url(${makeImagePath(
                            clickedMovie.backdrop_path,
                            "w500"
                          )})`,
                        }}
                      />
                      <BigTitle>{clickedMovie.title}</BigTitle>
                      <MovieDetail />
                    </>
                  )}
                </BigMovie>
              </>
            ) : null}
          </AnimatePresence>
        </>
      )}
    </Wrapper>
  );
}
export default Home;
