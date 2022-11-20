import { useQuery } from "react-query";
import styled from "styled-components";
import { motion, AnimatePresence, useScroll } from "framer-motion";
import { getMovies_nowPlaying, INowplayingMoviesResult } from "../api";
import { makeImagePath } from "../utils";
import { useState } from "react";
import useWindowDimensions from "../useWindowDimensions";
import { useHistory, useRouteMatch } from "react-router-dom";

const Wrapper = styled.div`
  background: black;
  padding-bottom: 200px;
`;

const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Banner = styled.div<{ bgPhoto: string }>`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(props) => props.bgPhoto});
  background-size: cover;
`;

const Title = styled.h2`
  font-size: 75px;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  margin-bottom: 20px; ;
`;

const Overview = styled.p`
  font-size: 20px;
  font-family: "Times New Roman", Times, serif;
  width: 50%;
`;

const Slider = styled.div`
  position: relative;
  top: -100px;
`;

const Row = styled(motion.div)`
  display: grid;
  gap: 5px;
  grid-template-columns: repeat(6, 1fr);
  position: absolute;
  width: 100%;
`;

const Box = styled(motion.div)<{ bgPhoto: string }>`
  background-color: white;
  background-image: url(${(props) => props.bgPhoto});
  background-size: cover;
  background-position: center center;
  height: 200px;
  font-size: 66px;
  cursor: pointer;
  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
`;

const Info = styled(motion.div)`
  padding: 10px;
  background-color: ${(props) => props.theme.black.lighter};
  opacity: 0;
  position: absolute;
  width: 100%;
  bottom: 0;
  h4 {
    text-align: center;
    font-size: 18px;
  }
`;

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
`;

const BigMovie = styled(motion.div)`
  position: absolute;
  width: 40vw;
  height: 80vh;
  left: 0;
  right: 0;
  margin: 0 auto;
  border-radius: 15px;
  overflow: hidden;
  background-color: ${(props) => props.theme.black.lighter};
`;

const BigCover = styled.div`
  width: 100%;
  background-size: cover;
  background-position: center center;
  height: 400px;
`;

const BigTitle = styled.h3`
  color: ${(props) => props.theme.white.lighter};
  padding: 20px;
  font-size: 46px;
  position: relative;
  top: -80px;
`;

const BigOverview = styled.p`
  padding: 20px;
  position: relative;
  top: -80px;
  color: ${(props) => props.theme.white.lighter};
`;

const boxVariants = {
  normal: {
    scale: 1,
  },
  hover: {
    scale: 1.3,
    y: -80,
    transition: {
      delay: 0.5,
      duaration: 0.1,
      type: "tween",
    },
  },
};

const infoVariants = {
  hover: {
    opacity: 1,
    transition: {
      delay: 0.5,
      duaration: 0.1,
      type: "tween",
    },
  },
};

const RArrowSvg = styled(motion.svg)`
  display: flex;
  position: absolute;
  width: 5vw;
  height: 5vh;
  top: 210px;
  right: 0;
  z-index: 100;
  cursor: pointer;
`;

const LArrowSvg = styled(motion.svg)`
  display: flex;
  position: relative;
  width: 5vw;
  height: 5vh;
  top: 210px;
  right: 0;
  z-index: 100;
  cursor: pointer;
`;

const sliderBtnVariant = {
  left: {
    x: 0,
  },
  leftAction: {
    x: -10,
    transition: {
      duration: 0.7,
      repeat: Infinity,
    },
  },
  right: {
    x: 0,
  },
  rightAction: {
    x: 10,
    transition: {
      duration: 0.7,
      repeat: Infinity,
    },
  },
};

const offset = 6; //page 갯수(박스 갯수)

function Home() {
  const history = useHistory();
  const bigMovieMatch = useRouteMatch<{ movieId: string }>("/movies/:movieId");
  const { scrollY } = useScroll();
  const width = useWindowDimensions();
  const { data: nowData, isLoading: nowIsLoading } =
    useQuery<INowplayingMoviesResult>(
      ["movies", "nowPlaying"],
      getMovies_nowPlaying
    );
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const increaseBox = () => {
    if (nowData) {
      if (leaving) return;
      toggleLeaving();
      const totalMovies = nowData.results.length - 1;
      const maxIndex = Math.floor(totalMovies / offset) - 1;
      setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
    }
  };
  const decreaseBox = () => {
    if (nowData) {
      if (leaving) return;
      toggleLeaving();
      const totalMovies = nowData.results.length - 1;
      const maxIndex = Math.floor(totalMovies / offset) - 1;
      setIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
    }
  };
  const toggleLeaving = () => setLeaving((prev) => !prev);
  const onBoxClicked = (movieId: number) => {
    history.push(`./movies/${movieId}`);
  };
  const onOverlayClick = () => history.push("/");
  const clickedMovie =
    bigMovieMatch?.params.movieId &&
    nowData?.results.find(
      (movie) => movie.id === +bigMovieMatch.params.movieId
    );

  return (
    <Wrapper>
      {nowIsLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner
            onClick={increaseBox}
            bgPhoto={makeImagePath(nowData?.results[0].backdrop_path || "")}
          >
            <Title>{nowData?.results[0].title}</Title>
            <Overview>{nowData?.results[0].overview}</Overview>
          </Banner>
          <Slider>
            <RArrowSvg
              variants={sliderBtnVariant}
              initial="right"
              whileHover="rightAction"
              onClick={increaseBox}
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
            <LArrowSvg
              onClick={decreaseBox}
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

            <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
              <Row
                initial={{ x: width + 10 }}
                animate={{ x: 0 }}
                exit={{ x: -width - 10 }}
                transition={{ type: "tween", duration: 1 }}
                key={index}
              >
                {nowData?.results
                  .slice(1)
                  .slice(offset * index, offset * index + offset)
                  .map((movie) => (
                    <Box
                      layoutId={movie.id + ""}
                      key={movie.id}
                      whileHover="hover"
                      initial="normal"
                      variants={boxVariants}
                      onClick={() => onBoxClicked(movie.id)}
                      transition={{ type: "tween" }}
                      bgPhoto={makeImagePath(movie.backdrop_path, "w500")}
                    >
                      <Info variants={infoVariants}>
                        <h4>{movie.title}</h4>
                      </Info>
                    </Box>
                  ))}
              </Row>
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
                  layoutId={bigMovieMatch.params.movieId}
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
