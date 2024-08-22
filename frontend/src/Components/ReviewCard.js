import React from "react";
import profilePng from "../images/Profile.jpg";
import Rating from 'react-rating-stars-component';

const ReviewCard = ({ review }) => {
  const options = {
    value: review.rating,
    readOnly: true,
    precision: 0.5,
  };

  return (
    <div className="flex flex-col items-center border border-gray-300 shadow-md p-6 m-2 w-[30vmax] ml-5">
      <img src={profilePng} alt="User" className="w-[5vmax] mb-2" />
      <p className="text-gray-800 font-semibold text-[0.9rem] mb-2">{review.name}</p>
      <Rating {...options} className="mb-2" />
      <span className="text-gray-600 font-light text-[0.8rem]">{review.comment}</span>
    </div>
  );
};

export default ReviewCard;
