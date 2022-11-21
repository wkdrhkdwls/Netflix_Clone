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
  BigOverview,
  BigTitle,
  Box,
  Button,
  Info,
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
} from "../Components/HomeStyle";
import { boxVariants, infoVariants } from "../Components/HomeVariant";

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
            bgPhoto={makeImagePath(nowData?.results[0].backdrop_path || "")}
          >
            <Title>{nowData?.results[0].title}</Title>
            <Overview>{nowData?.results[0].overview}</Overview>
          </Banner>
          <Slider>
            <SubTitle>Now Playing Movies</SubTitle>
            <Button onClick={() => decreaseBox(categorys.nowPlaying, nowData)}>
              <span>{`<`}</span>
            </Button>
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
            </AnimatePresence>
            <Button onClick={() => increaseBox(categorys.nowPlaying, nowData)}>
              <span>{`>`}</span>
            </Button>
          </Slider>
          <Slider>
            <SubTitle>Latest Movies</SubTitle>
            <Button onClick={() => decreaseBox(categorys.latest, popularData)}>
              <span>{`<`}</span>
            </Button>
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
            </AnimatePresence>
            <Button onClick={() => increaseBox(categorys.latest, popularData)}>
              <RArrowSvg>{`>`}</RArrowSvg>
            </Button>
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
                      <BigOverview>{clickedMovie.overview}</BigOverview>
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
