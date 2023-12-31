import Post from "../posts/Post";
import Share from "../share/Share";
import "./feeds.css";
import axios from "axios";
import { useState, useEffect } from "react";

function Feeds({ showShare }) {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);

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

  const handlePostClick = (post) => {
    setSelectedPost(post);
  };

  return (
    <div className="feeds">
      <div className="feedsWrapper">
        {showShare && <Share />}

        {posts.map((p) => (
          <Post key={p.post_id} post={p} onClick={() => handlePostClick(p)} />
        ))}
      </div>
      {selectedPost && (
        <div className="postDetails">
          {/* Render the details of the selected post */}
          <h2>{selectedPost.title}</h2>
          <p>{selectedPost.body}</p>
          {/* Add comment functionality here */}
        </div>
      )}
    </div>
  );
}

Feeds.defaultProps = {
  showShare: true,
};

export default Feeds;
