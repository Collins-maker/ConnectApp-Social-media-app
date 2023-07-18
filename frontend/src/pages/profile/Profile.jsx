import "./profile.css";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feeds from "../../components/feeds/Feeds";
import Rightbar from "../../components/rightbar/Rightbar";

export default function Profile() {
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
              <span className="profileInfoDesc">Abot Melon Kaguri</span>
            </div>
            
          </div>
          <div className="profileRightBottom">
            <Feeds />
            <Rightbar profile/>
          </div>
        </div>
      </div>
    </>
  );
}
