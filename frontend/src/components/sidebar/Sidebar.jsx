import "./sidebar.css";
import axios from "axios";
import { useEffect, useState } from "react";

import {
  RssFeed,
  Whatshot,
  Groups,
  Event,
  FormatQuote,
} from "@mui/icons-material";
import { Users } from "../../dummyData";
import Friends from "../friends/Friends";

function Sidebar() {
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

          {users.map((u) => (
            <Friends key={u.user_id} user={u} />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
