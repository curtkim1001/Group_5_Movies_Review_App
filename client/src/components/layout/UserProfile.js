import React, { useEffect, useState } from "react";
import ProfileImage from "./ProfileImage.js";
import Dropzone from "react-dropzone";

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
      console.log(reviewBody);
      setUserReviews(reviewBody.reviews);
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`);
    }
  };

  useEffect(() => {
    getReviews();
  }, []);

  const reviewsArray = userReviews.map((review) => {
    console.log(review);
    return (
      <div key={review.id}>
        <p>{review.content}</p>
      </div>
    );
  });
  return (
    <div>
      <div className="grid-x grid-container">
        <div className="profile-box cell medium-6">
          <div className="cell">
            <h2>Account Information:</h2>
            <p>Username: {user.username}</p>
            <p>Email: {user.email}</p>
          </div>
        </div>
        <div className="profile-box cell medium-6">
          <div className="image-box cell rounded-corner">
            <ProfileImage />
          </div>
        </div>
      </div>
      <div className="callout profile-reviews rounded-corner">
        <h3>User's Reviews</h3>
        {reviewsArray}
      </div>
    </div>
  );
};

export default UserProfile;
