import "./post.css";
import { MoreVert } from "@mui/icons-material";
import { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Comment from "../comments/Comments"; // Import the Comment component

function Post({ post }) {
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

  const { user_id } = useParams();
  const handleProfileImageClick = () => {
    // Navigate to the profile page with the selected user's data as a prop
    window.location.href = `/profile/${post.user_id}`;
    console.log(post.user_id);
  };

  // const [commentCount, setCommentCount] = useState(post.Comment_count || 0);


  return (
    <div className="post">
      {/* Render the post content as usual */}
      {/* ... */}
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft" onClick={handleProfileImageClick}>
            <img
              className="postProfileImg"
              src={post.profile_image}
              alt=""
            />
            <span className="postUsername">{post.username}</span>
            <span className="postDate">{post.created_at}</span>
          </div>
          <div className="postTopRight">
            <MoreVert />
          </div>
        </div>
        <div className="postCenter">
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
            {/* Render the Comment component and pass the post ID */}
            <Comment postId={post.post_id} commentCount={post.comment_count} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post;
