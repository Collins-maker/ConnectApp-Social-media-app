import "./profile.css";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feeds from "../../components/feeds/Feeds";
import Rightbar from "../../components/rightbar/Rightbar";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Profile() {

  const [users, setUsers] = useState([]);
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:4001/users", {
          withCredentials: true,
        });
        console.log(response.data.results);
        setUsers(response.data.results);
      } catch (error) {
        console.log("Error Fetching users", error);
      }
    };
  
    useEffect(() => {
      fetchUsers();
    }, []);

  return (
    <>
      <Topbar />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
            <img className="profileCoverImg" src="assets/post/3.jpeg" alt="" />
            <img className="profileUserImg" src="assets/person/1.jpeg" alt="" />
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">Melon Kaguri</h4>
              <span className="profileInfoDesc">About Melon Kaguri</span>
            </div>
            
          </div>
          <div className="profileRightBottom">
          <Feeds showShare={false} />
            <Rightbar isProfilePage={true}/>
          </div>
        </div>
      </div>
    </>
  );
}
