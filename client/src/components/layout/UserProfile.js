import React from "react";

const UserProfile = ({ user }) => {
  return (
    <div>
      {user.username}
      {user.email}
    </div>
  );
};

export default UserProfile;
