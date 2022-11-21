export const boxVariants = {
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

export const infoVariants = {
  hover: {
    opacity: 1,
    transition: {
      delay: 0.5,
      duaration: 0.1,
      type: "tween",
    },
  },
};

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

export const rowVariants = {
  hidden: (isBack: boolean) => ({
    x: isBack ? -window.innerWidth : window.innerWidth,
  }),
  visible: {
    x: 0,
  },
  exit: (isBack: boolean) => ({
    x: isBack ? window.innerWidth : -window.innerWidth,
  }),
};
