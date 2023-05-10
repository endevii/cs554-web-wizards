import React, { useState, useRef, useEffect, useCallback } from "react";
import "../App.css";
import downtown from "../img/downtown.jpeg";
function SlideShow() {
  const images = [
    { name: "NYC", url: downtown },
    {
      name: "Federal Hall",
      url: "https://federalhall.org/wp-content/uploads/2021/06/rentals_06.jpg",
    },
    {
      name: "Fraunces Tavern",
      url: "https://images.squarespace-cdn.com/content/v1/5fb7f0e362de545f21c96c33/1680904436023-VWF54KROMSBWUUNQLXZR/image-asset.jpeg",
    },
  ];

  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const timerRef = useRef();

  const handleLeftArrowClick = () => {
    let newSlideIndex;
    if (currentSlideIndex === 0) {
      newSlideIndex = images.length - 1;
    } else {
      newSlideIndex = currentSlideIndex - 1;
    }
    setCurrentSlideIndex(newSlideIndex);
  };

  const handleRightArrowClick = useCallback(() => {
    let newSlideIndex;
    if (currentSlideIndex === images.length - 1) {
      newSlideIndex = 0;
    } else {
      newSlideIndex = currentSlideIndex + 1;
    }
    setCurrentSlideIndex(newSlideIndex);
  }, [currentSlideIndex, images]);

  /**
   * Followed https://www.youtube.com/watch?v=hUTwhn4BIyM to implement auto sliding feature
   */
  useEffect(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(() => {
      handleRightArrowClick();
    }, 3000);

    return () => clearTimeout(timerRef.current);
  }, [handleRightArrowClick]);

  return (
    <div className="slide-show-div">
      <div className="slide-div">
        <img
          src={images[currentSlideIndex].url}
          alt={images[currentSlideIndex].name}
        ></img>
        <div className="img-title">
          <h2 className="h2-txt" style={{ color: "black" }}>
            {images[currentSlideIndex].name}
          </h2>
        </div>
        <div className="left-arrow">
          <button onClick={handleLeftArrowClick}>&#60;</button>
        </div>

        <div className="right-arrow">
          <button onClick={handleRightArrowClick}>&#62;</button>
        </div>
      </div>
    </div>
  );
}

export default SlideShow;
