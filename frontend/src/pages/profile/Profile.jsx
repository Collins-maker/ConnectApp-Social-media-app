import "./profile.css";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feeds from "../../components/feeds/Feeds";
import Rightbar from "../../components/rightbar/Rightbar";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Profile() {
  const [selectedUser, setSelectedUser] = useState(null);
  const { user_id } = useParams(); // Extract user_id from the URL

  useEffect(() => {
    // Fetch the user data based on the user_id
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:4001/user/${user_id}`, {
          withCredentials: true,
        });
        setSelectedUser(response.data); // Set the selected user data in state
      } catch (error) {
        console.log("Error Fetching user", error);
      }
    };

    fetchUser();
  }, [user_id]);

  if (!selectedUser) {
    // Render loading or user not found message while fetching user data
    return <div>Loading...</div>;
  }

  return (
    <>
      <Topbar />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img className="profileCoverImg" src="assets/post/3.jpeg" alt="" />
              <img className="profileUserImg" src={"assets/person/1.jpeg"} alt="" />
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">{selectedUser.name}</h4>
              <span className="profileInfoDesc">{selectedUser.bio}</span>
            </div>
          </div>
          
          <div className="profileRightBottom">
            <div className="profileFunctinality">
              <button className="updateButton">Updadate</button>
              <button className="followersButton">Followers</button>
              <button className="updateButton">Following</button>
            </div>
            <div className="profileComponents">
            <Rightbar isProfilePage={true} />
            <Feeds showShare={false} />
            
            </div>
            
          </div>
        </div>
      </div>
    </>
  );
}
