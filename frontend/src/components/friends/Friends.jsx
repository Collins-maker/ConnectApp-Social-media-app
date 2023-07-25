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

  return (
    <li className="sidebarFriend">
      <div className="friend">
      <img className="sidebarFriendImg" src={user.profilePicture} alt="" />
      <span className="sidebarfriendName">{user.username}</span>
      </div>
      
      <button className= "followButton" onClick={() => handleFollow(user.user_id)}>follow</button>
    </li>
  );
}

export default Friends;
