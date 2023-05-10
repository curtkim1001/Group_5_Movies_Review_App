import React, { useEffect, useState } from "react";

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
      <p>{user.username}</p>
      <p>{user.email}</p>
      <div className="callout review-show">{reviewsArray}</div>
    </div>
  );
};

export default UserProfile;
