import Online from "../online/Online";
import "./rightbar.css";
import { Users } from "../../dummyData";

function Rightbar({ isProfilePage }) {
  const HomeRightbar = () => {
    return (
      <>
        <div className="birthdayContainer">
          <img className="birthdayImg" src="assets/gift.png" alt="" />
          <span className="birthdayText">
            {" "}
            <b>melon</b> share to with <b>your friends </b> who have their
            birthdays today also
          </span>
        </div>
        <h4 className="rightbarTitle">Online Friends</h4>
        <ul className="rightbarFriendsList">
          {Users.map((u) => (
            <Online key={u.id} user={u} />
          ))}
        </ul>
      </>
    );
  };

  const ProfileRightbar = () => {
    return (
      <>
        <h4 className="rightbartitle">User information</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Country :</span>
            <span className="rightbarInfovalue">Kenya</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Phone Number :</span>
            <span className="rightbarInfovalue">+254798893521</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">DoB :</span>
            <span className="rightbarInfovalue">2001/06/06</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Gender :</span>
            <span className="rightbarInfovalue">Male</span>
          </div>
        </div>

        <h4 className="rightbartitle">Mutual Friends</h4>
        <div className="rightbarFollowings">
          <div className="rightbarFollowing">
            <img src="assets/person/2.jpeg" alt="" className="rightbarFollowingImg" />
            <span className="rightbarFollowingName">Chris Sumba</span>
          </div>
          <div className="rightbarFollowing">
            <img src="assets/person/3.jpeg" alt="" className="rightbarFollowingImg" />
            <span className="rightbarFollowingName">Chris Sumba</span>
          </div>
          <div className="rightbarFollowing">
            <img src="assets/person/4.jpeg" alt="" className="rightbarFollowingImg" />
            <span className="rightbarFollowingName">Chris Sumba</span>
          </div>
          <div className="rightbarFollowing">
            <img src="assets/person/5.jpeg" alt="" className="rightbarFollowingImg" />
            <span className="rightbarFollowingName">Chris Sumba</span>
          </div>
          <div className="rightbarFollowing">
            <img src="assets/person/6.jpeg" alt="" className="rightbarFollowingImg" />
            <span className="rightbarFollowingName">Chris Sumba</span>
          </div>
          <div className="rightbarFollowing">
            <img src="assets/person/7.jpeg" alt="" className="rightbarFollowingImg" />
            <span className="rightbarFollowingName">Chris Sumba</span>
          </div>
        </div>
      </>
    );
  };

  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {isProfilePage? <ProfileRightbar/> : <HomeRightbar/>}
      </div>
    </div>
  );
}

export default Rightbar;
