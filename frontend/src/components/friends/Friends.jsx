import "./friends.css";
import React from "react";
import axios from "axios";

function Friends({ user }) {
const handleFollow=async()=>{
try {
  const response = await axios.get(
        `http://localhost:4001/follow/`,
        {
          withCredentials: true,
        }
  );

} catch (error) {
  console.log("an error occured while following", error)
}
}

  return (
    <li className="sidebarFriend">
      <div className="friend">
      <img className="sidebarFriendImg" src={user.profilePicture} alt="" />
      <span className="sidebarfriendName">{user.username}</span>
      </div>
      
      <button className= "followButton" onClick={handleFollow}>follow</button>
    </li>
  );
}

export default Friends;
