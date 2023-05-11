import React, { useEffect, useState } from "react";
import ProfileImage from "./ProfileImage.js";
import Dropzone from "react-dropzone"

const UserProfile = ({ user }) => {
  const [userReviews, setUserReviews] = useState([]);

  const getReviews = async () => {
    try {
      const response = await fetch(`/api/v1/reviews`);
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`;
        const error = new Error(errorMessage);
        throw error;
      }
      const reviewBody = await response.json();
      setUserReviews(reviewBody.reviews);
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`);
    }
  };

  useEffect(() => {
    getReviews();
  }, []);

  const reviewsArray = userReviews.map((review) => {
    return (
        <p key={review.id}>{review.content}</p>
    );
  });
  return (
    <div>
      <h2>Account Information:</h2>
      <p>Username: {user.username}</p>
      <p>Email: {user.email}</p>
      <ProfileImage />
      <div className="callout review-show">
        <h3>User's Reviews</h3>
        {reviewsArray}</div>
    </div>
  );
};

export default UserProfile;
