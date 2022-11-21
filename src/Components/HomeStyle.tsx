import { motion } from "framer-motion";
import styled from "styled-components";

export const Wrapper = styled.div`
  background: black;
  padding-bottom: 200px;
`;

export const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Banner = styled.div<{ bgPhoto: string }>`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(props) => props.bgPhoto});
  background-size: cover;
`;

export const Title = styled.h2`
  width: 200px;
  height: 50px;
  position: absolute;
  background-color: transparent;
  top: -50px;
  left: 40px;
  text-transform: uppercase;
  font-weight: 500;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

export const SubTitle = styled.h3`
  font-size: 48px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
`;

export const Overview = styled.p`
  font-size: 20px;
  font-family: "Times New Roman", Times, serif;
  width: 50%;
`;

export const Slider = styled.div`
  position: relative;
  /* margin: 50px 0px 70px 0px;
  display: flex;
  justify-content: space-between;
  align-items: center; */
  top: -100px;
  margin-bottom: 350px;
`;

export const Row = styled(motion.div)`
  display: grid;
  padding: 0 2%;
  gap: 5px;
  grid-template-columns: repeat(6, 1fr);
  position: absolute;
  width: 100%;
`;

export const Box = styled(motion.div)<{ bgPhoto: string }>`
  background-color: white;
  background-image: url(${(props) => props.bgPhoto});
  background-size: cover;
  background-position: center center;
  height: 200px;
  font-size: 64px;
  cursor: pointer;
  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
`;

export const Info = styled(motion.div)`
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

export const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
`;

export const BigMovie = styled(motion.div)`
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

export const BigCover = styled.div`
  width: 100%;
  background-size: cover;
  background-position: center center;
  height: 400px;
`;

export const BigTitle = styled.h3`
  color: ${(props) => props.theme.white.lighter};
  padding: 20px;
  font-size: 46px;
  position: relative;
  top: -80px;
`;

export const BigOverview = styled.p`
  padding: 20px;
  position: relative;
  top: -80px;
  color: ${(props) => props.theme.white.lighter};
`;

export const RArrowSvg = styled(motion.svg)`
  display: flex;
  position: absolute;
  width: 5vw;
  height: 5vh;
  top: 210px;
  right: 0;
  z-index: 100;
  cursor: pointer;
`;

export const LArrowSvg = styled(motion.svg)`
  display: flex;
  position: relative;
  width: 5vw;
  height: 5vh;
  top: 140px;
  right: 0;
  z-index: 100;
  cursor: pointer;
`;

export const Button = styled.div`
  width: 2%;
  height: 200px;
  background-color: transparent;
  z-index: 99;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0.5;
`;

export const offset = 6; //page 갯수(박스 갯수)
