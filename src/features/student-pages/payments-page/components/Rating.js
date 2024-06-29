import React from 'react';
import colorstar from "../../../../assets/images/icons/filledstar.svg"
import uncolorstar from "../../../../assets/images/icons/emptystar.svg"

const Rating = ({ rating }) => {
  const totalStars = 5;
  const filledStars = rating;
  const emptyStars = totalStars - filledStars;

  const filledStar = colorstar;
  const emptyStar = uncolorstar;

  const starStyle = {
    width: '12.916px',
    height: '12.916px',
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      {[...Array(filledStars)].map((_, index) => (
        <img
          key={`filled-${index}`}
          src={filledStar}
          alt="filled star"
          style={starStyle}
        />
      ))}
      {[...Array(emptyStars)].map((_, index) => (
        <img
          key={`empty-${index}`}
          src={emptyStar}
          alt="empty star"
          style={starStyle}
        />
      ))}
    </div>
  );
};

export default Rating;
