import "./post.css";
import { MoreVert } from "@mui/icons-material";
import { useState } from "react";
import axios from "axios";
import PostPopup from "../popups/PostPopUp";


function Post({ post, onClick}) {
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);

  const [showPostPopup, setShowPostPopup] = useState(false);
  const commentHandler = async (post_id) => {
    try {
      // Fetch comments for the post from the backend
      const response = await axios.get(
        `http://localhost:4001/comments/${post_id}`,
        {
          withCredentials: true,
        }
      );
      console.log(response.data);
      setComments(response.data.comments);
      setShowComments(!showComments);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const [like, setLike] = useState(post.like);
  const [isLiked, setIsLiked] = useState(false);

  const likeHandler = async (post_id) => {
    try {
      const response = await axios.post(
        "http://localhost:4001/like",
        {
          post_id: post_id,
        },
        {
          withCredentials: true,
        }
      );
      console.log(response.data);
      setLike(isLiked ? like - 1 : like + 1);
      setIsLiked(!isLiked);
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  const isImage = post.media_type && post.media_type.startsWith("image");
  const media_url = isImage ? post.media_url : post.media_url; // Use media_type as image URL if it's not a valid Cloudinary UR



  return (
    <div className="post"    >


    {/* Render the post content as usual */}
    {/* ... */}
      <div className="postWrapper" >
        <div className="postTop">
          <div className="postTopLeft">
            <img className="postProfileImg" src={post.profile_image}  alt="" />
            <span className="postUsername">{post.username}</span>
            <span className="postDate">{post.created_at}</span>
          </div>
          <div className="postTopRight">
            <MoreVert />
          </div>
        </div>
        <div className="postCenter" onClick={()=>setShowPostPopup(true) }>
          <span className="postText">{post.written_text}</span>
          <img className="postImg" src={media_url} alt="" />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img
              className="likeIcon"
              src="assets/like.png "
              onClick={() => likeHandler(post.post_id)}
              alt=""
            />
            <img
              className="likeIcon"
              src="assets/heart.png "
              onClick={() => likeHandler(post.post_id)}
              alt=""
            />
            <span className="postLikeCounter">
              {post.like_count} people reacted
            </span>
          </div>
          <div className="postBottomRight">
            <span
              className="postCommentText"
              onClick={() => commentHandler(post.post_id)}
            >
              {post.Comment_count} Comments
            </span>
          </div>
        </div>
        {/* Display the comments if showComments is true */}
        {showComments && (
          <div>
            <h3>Comments:</h3>
            <ul>
              {comments.map((comment) => (
                <li key={comment.comment_id}>{comment.text}</li>
              ))}
            </ul>
          </div>
        )}

      </div>
      {showPostPopup && (
        <PostPopup
          post={post}
          onClose={() => setShowPostPopup(false)}
        /> // Conditionally render the PostPopup component
      )}

    </div>
  );
}

export default Post;
