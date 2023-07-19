import { useState } from "react";
import "./share.css";
import { PermMedia, Label, Room, EmojiEmotions } from "@mui/icons-material";

function Share({ handleSharePost }) {
  const [file, setFile] = useState(null);
  const [content, setContent] = useState("");

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleShare = () => {
    // Create a new FormData object to send the post data with the selected file
    const postData = new FormData();
    postData.append("content", content);
    if (file) {
      postData.append("file", file);
    }

    // Call the handleSharePost function from the parent component to handle the post share
    handleSharePost(postData);

    // Clear the input fields after sharing
    setFile(null);
    setContent("");
  };

  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img className="shareProfileImg" src="/assets/person/1.jpeg" alt="" />
          <input
            placeholder="What are you thinking about now?"
            className="shareInput"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <hr className="shareHr" />
        <div className="shareBottom">
          <div className="shareOptions">
            {/* Add an input element to handle file selection */}
            <div className="shareOption">
              <label htmlFor="file" className="shareIcon">
                <PermMedia htmlColor="tomato" />
              </label>
              <span className="shareOptionText">Photo or video</span>
              <input
                style={{ display: "none" }}
                type="file"
                id="file"
                accept=".png,.jpeg,.jpg,.gif,.mp4"
                onChange={handleFileChange}
              />
            </div>
            {/* Add your other icons here */}
            {/* ... */}
          </div>
          <button className="shareButton" onClick={handleShare}>
            Share
          </button>
        </div>
      </div>
    </div>
  );
}

export default Share;


///more code here: on feeds:

// ... other imports and code ...


import Post from "../posts/Post";
import Share from "../share/Share";
import "./feeds.css";
import { Posts } from "../../dummyData";
import axios from "axios";
import { useEffect, useState } from "react";

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
      setPosts(response.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const handleSharePost = async (postData) => {
    try {
      // Perform your API call to share the post using the postData object
      // Example API call using axios:
      await axios.post("http://localhost:4001/sharePost", postData, {
        withCredentials: true,
      });

      // Optionally, you can fetch the posts again to get the updated list
      // of posts after sharing a new one
      fetchPosts();
    } catch (error) {
      console.error("Error sharing post:", error);
    }
  };

  return (
    <div className="feeds">
      <div className="feedsWrapper">
        <Share handleSharePost={handleSharePost} />
        {posts.map((p) => (
          <Post key={p.id} post={p} />
        ))}
      </div>
    </div>
  );
}

export default Feeds;


