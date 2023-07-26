import React, { useState, useEffect } from "react";
import axios from "axios";
import './friends.css'

function Friends({ user }) {
  const [isFollowing, setIsFollowing] = useState(false); // State to track follow/unfollow status

  useEffect(() => {
    // Check if the user is being followed on initial render
    // You can add logic here to check if the user is being followed and update the state accordingly
    // For simplicity, we'll assume the user is not being followed initially.
    setIsFollowing(false);
  }, []);

  const handleFollow = async (user_id) => {
    try {
      const response = await axios.post(
        `http://localhost:4001/follow/${user_id}`,
        {},
        {
          withCredentials: true,
        }
      );
      console.log(user_id);
      setIsFollowing(true); // Set the state to true when the user is followed
    } catch (error) {
      console.log("An error occurred while following", error);
    }
  };

  const handleUnfollow = async (user_id) => {
    try {
      const response = await axios.post(
        `http://localhost:4001/unfollow/${user_id}`,
        {},
        {
          withCredentials: true,
        }
      );
      console.log(user_id);
      setIsFollowing(false); // Set the state to false when the user is unfollowed
    } catch (error) {
      console.log("An error occurred while unfollowing", error);
    }
  };

  const handleProfileImageClick = () => {
    // Navigate to the profile page with the selected user's data as a prop
    window.location.href = `/profile/${user.user_id}`;
    console.log(user.user_id);
  };

  return (
    <li className="sidebarFriend">
      <div className="friend" onClick={handleProfileImageClick}>
        <img className="sidebarFriendImg" src={user.profilePicture} alt="" />
        <span className="sidebarfriendName">{user.username}</span>
      </div>

      {isFollowing ? (
        <button className="unfollowButton" onClick={() => handleUnfollow(user.user_id)}>
          Unfollow
        </button>
      ) : (
        <button className="followButton" onClick={() => handleFollow(user.user_id)}>
          Follow
        </button>
      )}
    </li>
  );
}

export default Friends;
