import Post from "../posts/Post";
import Share from "../share/Share";
import "./feeds.css";
import axios from "axios";
import { useState, useEffect } from "react";

function Feeds() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get("http://localhost:4001/posts", {
        withCredentials: true,
      });
      console.log(response.data.results);
      console.log("data received");
      setPosts(response.data.results);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  return (
    <div className="feeds">
      <div className="feedsWrapper">
        <Share />
        {posts.map((p) => (
          <Post key={p.post_id} post={p} />
        ))}
      </div>
    </div>
  );
}

export default Feeds;
