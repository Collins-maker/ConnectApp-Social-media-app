import "./friends.css";
import React from "react";
import axios from "axios";

function Friends({ user}) {
const handleFollow=async(user_id)=>{
try {
  const response = await axios.post(
        `http://localhost:4001/follow/${user_id}`, {},
        {
          withCredentials: true,
        }
  );
  console.log(user_id);

} catch (error) {
  console.log("an error occured while following", error)
}
}

const handleProfileImageClick = () => {
  // Navigate to the profile page with the selected user's data as a prop
  window.location.href = `/profile/${user.user_id}`;

  console.log(user.user_id)
};

  return (
    <li className="sidebarFriend">
      <div className="friend" onClick={handleProfileImageClick}>
      <img className="sidebarFriendImg" src={user.profilePicture} alt="" />
      <span className="sidebarfriendName">{user.username}</span>
      </div>
      
      <button className= "followButton" onClick={() => handleFollow(user.user_id)}>follow</button>
    </li>
  );
}

export default Friends;
