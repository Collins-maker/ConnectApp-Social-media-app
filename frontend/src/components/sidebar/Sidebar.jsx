import "./sidebar.css";
import {
  RssFeed,
  Whatshot,
  Groups,
  Event,
  FormatQuote,
} from "@mui/icons-material";
import{Users} from "../../dummyData"
import Friends from "../friends/Friends";

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <ul className="sidebarList">
          <li className="sidebarListItem">
            <RssFeed className="sidebarListItemIcon" />
            <span className="sidebarListItemText">Feeds</span>
          </li>
          <li className="sidebarListItem">
            <Event className="sidebarListItemIcon" />
            <span className="sidebarListItemText">Events</span>
          </li>
          <li className="sidebarListItem">
            <Groups className="sidebarListItemIcon" />
            <span className="sidebarListItemText">Groups</span>
          </li>
          <li className="sidebarListItem">
            <Whatshot className="sidebarListItemIcon" />
            <span className="sidebarListItemText">Trending</span>
          </li>
          <li className="sidebarListItem">
            <FormatQuote className="sidebarListItemIcon" />
            <span className="sidebarListItemText">Today's Quote</span>
          </li>
        </ul>
        <button className="sidebarButton">Show More</button>
        <hr className="sidebarHr" />
        <ul className="sidebarFriendList">
         {Users.map((u)=>(
          <Friends key={u.id} user={u}/>
         ))}
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
