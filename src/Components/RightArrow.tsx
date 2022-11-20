import { motion } from "framer-motion";
import { SetterOrUpdater } from "recoil";
import styled from "styled-components";
import { INowplayingMoviesResult } from "../api";

export interface IArrowProp {
  setIndex: SetterOrUpdater<number>;
  data?: INowplayingMoviesResult;
  setBack: SetterOrUpdater<boolean>;
  leaving: boolean;
  toggle: () => void;
}
const offset = 6;

const ArrowSvg = styled(motion.svg)`
  position: absolute;
  width: 5vw;
  height: 5vh;
  top: 210px;
  right: 0;
  z-index: 100;
  cursor: pointer;
`;

export const sliderBtnVariant = {
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

function RightArrow({ setIndex, data, setBack, leaving, toggle }: IArrowProp) {
  const increaseIndex = () => {
    if (data) {
      if (leaving) return;
      toggle();
      setBack(false);
      const totalMovies = data?.results.length - 1;
      const maxIndex = Math.floor(totalMovies / offset) - 1;

      setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
    }
  };
  return (
    <ArrowSvg
      variants={sliderBtnVariant}
      initial="right"
      whileHover="rightAction"
      onClick={increaseIndex}
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
    </ArrowSvg>
  );
}

export default RightArrow;
