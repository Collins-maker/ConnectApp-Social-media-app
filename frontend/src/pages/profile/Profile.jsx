import "./profile.css";
import UpdateUser from "../../components/updateProfile/UpdateProfile";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feeds from "../../components/feeds/Feeds";
import Rightbar from "../../components/rightbar/Rightbar";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useParams,  useNavigate  } from "react-router-dom";
import { AuthContext } from "../../components/context/authContext";



export default function Profile() {
  const{ currentUser} =useContext(AuthContext)
  const navigate = useNavigate();
  const [selectedUser, setSelectedUser] = useState(null);
  const { user_id } = useParams(); // Extract user_id from the URL

  useEffect(() => {
    // Fetch the user data based on the user_id
    const fetchUser = async () => {
      console.log(user_id)
      try {
        const response = await axios.get(`http://localhost:4001/user/${user_id}`, {
          withCredentials: true,
        });
        console.log(response)
        setSelectedUser(response.data.result); // Set the selected user data in state
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

  const handleUpdateProfile = () => {
    // Navigate to the UpdateUser page with the user_id as a parameter
    navigate(`/update-user/${user_id}`);
  }; 

  return (
    <>
      <Topbar />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img className="profileCoverImg" src="assets/post/3.jpeg" alt="" />
              <img className="profileUserImg" src={selectedUser.profile_image} alt="" />
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">{selectedUser.username}</h4>
              <span className="profileInfoDesc">{selectedUser.email_address}</span>
            </div>
          </div>
          
          <div className="profileRightBottom">
            <div className="profileFunctinality">
                {/* Step 3: Add onClick event */}
                <button className="updateButton" onClick={handleUpdateProfile}>
              Update
            </button>
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
      {/* Render the UpdateUser component and pass the selectedUser as the user prop */}
    {selectedUser && <UpdateUser user={selectedUser} />}
    </>
  );
}
