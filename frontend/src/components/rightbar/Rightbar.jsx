import Online from "../online/Online"
import "./rightbar.css"
import{Users} from '../../dummyData'

function Rightbar() {
  return (
    <div className="rightbar">
      <div className="rightbar">
        <div className="rightbarWrapper">
          <div className="birthdayContainer">
            <img className="birthdayImg" src="assets/gift.png" alt="" />
            <span className="birthdayText"> <b>melon</b> share to with <b>your friends </b> who have their birthdays today also</span>
          </div>
           <h4 className="rightbarTitle">Online Friends</h4>
           <ul className="rightbarFriendsList">
            {Users.map(u=>(
              <Online key={u.id} user={u}/>
            ))}
           </ul>
        </div>
      </div>
    </div>
  )
}

export default Rightbar