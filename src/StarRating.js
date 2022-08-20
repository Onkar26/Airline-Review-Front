import React from "react";

const StarRating = ({ rating }) => {
  const arr = [1, 2, 3, 4, 5];
  return (
    <div className="star-rating">
      {arr.map((star) => {
        return (
          <button
            type="button"
            key={star}
            className={rating >= star ? "on" : "off"}
          >
            <span className="star">&#9733;</span>
          </button>
        );
      })}
    </div>
  );
};

export default StarRating;
