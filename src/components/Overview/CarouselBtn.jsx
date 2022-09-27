import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

import styles from "./Overview.module.scss";

const ButtonCarousel = ({ onClick, side }) => {
  if (side === "left") {
    return (
      <button onClick={onClick} className={styles.btn_left}>
        <BsChevronLeft />
      </button>
    );
  } else if (side === "right") {
    return (
      <button onClick={onClick} className={styles.btn_right}>
        <BsChevronRight />
      </button>
    );
  }
};

const CustomRightArrow = ({ onClick, ...rest }) => {
  const {
    onMove,
    carouselState: { currentSlide, deviceType },
  } = rest;
  // onMove means if dragging or swiping in progress.
  return <ButtonCarousel onClick={() => onClick()} side="right" />;
};
const CustomLeftArrow = ({ onClick, ...rest }) => {
  const {
    onMove,
    carouselState: { currentSlide, deviceType },
  } = rest;
  // onMove means if dragging or swiping in progress.
  return <ButtonCarousel onClick={() => onClick()} side="left" />;
};

export { CustomRightArrow, CustomLeftArrow };
