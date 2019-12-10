import React, { useState, Fragment } from "react";

const Carousel = ({ photos }) => {
  let [leftArrow] = useState("");
  let [rightArrow] = useState("");

  rightArrow = () => {
    document.getElementById("move").scrollLeft += 250;
  };

  leftArrow = () => {
    document.getElementById("move").scrollLeft -= 150;
  };

  return (
    <Fragment>
      {photos.length < 1 ? (
        ""
      ) : (
        <div className="carousel-holder">
          <div className="carousel-gallery" id="move">
            {photos.map((photo, i) => (
              <a
                key={i}
                href={`${window.location.origin}/${photo}`}
                data-toggle="lightbox"
                data-gallery="img-gallery"
                data-height="564"
                data-width="564"
              >
                <img
                  src={`${window.location.origin}/${photo}`}
                  alt=""
                  className="img-fluid"
                />
              </a>
            ))}
          </div>
          <div className="leftArrow arrow" onClick={leftArrow}>
            <i className="fas fa-arrow-left"></i>
          </div>
          <div className="rightArrow arrow" onClick={rightArrow}>
            <i className="fas fa-arrow-right"></i>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default Carousel;
