import React from 'react';

const Review = () => {
  return (
    <div className="review">
      <div className="opinion">
        <a href="!#">
          <i className="fas fa-star"></i>
          Writing an opinion
        </a>
      </div>
      <div className="favorites">
        <a href="!#">
          <i className="fas fa-heart"></i>
          Add to favorites
        </a>
      </div>
    </div>
  );
};

export default Review;
