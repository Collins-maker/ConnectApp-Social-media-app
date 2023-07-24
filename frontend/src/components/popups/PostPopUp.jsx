import React from "react";
import axios from "axios";
import { useState } from "react";

function PostPopup({ post, onClose, comments }) {
  const [comment, setComment] = useState("");

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handlePostComment = async () => {
    try {
      // Send the comment to the backend
      await axios.post(
        "http://localhost:4001/comments",
        {
          post_id: post.post_id,
          text: comment,
        },
        {
          withCredentials: true,
        }
      );

      // Reset the comment field after successful posting
      setComment("");
    } catch (error) {
      console.error("Error posting comment:", error);
    }
  };



  return (
    <div className="postPopup">
      <div className="postPopupWrapper">
        <div className="postPopupTop">
          <span className="postPopupUsername">{post.username}</span>
          <span className="postPopupDate">{post.created_at}</span>
        </div>
        <div className="postPopupCenter">
          <span className="postPopupText">{post.written_text}</span>
          {post.media_url && (
            <img className="postPopupImg" src={post.media_url} alt="" />
          )}
        </div>
        <div className="postPopupBottom">
          <div className="postPopupBottomLeft">
            <img className="likeIcon" src="assets/like.png" alt="" />
            <img className="likeIcon" src="assets/heart.png" alt="" />
            <span className="postPopupLikeCounter">{post.like_count} people reacted</span>
          </div>
          <div className="postPopupBottomRight">
            <span className="postPopupCommentText">
              {post.Comment_count} Comments
            </span>
          </div>
        </div>

        {/* Display the comments if available */}
        {comments?.length > 0 && (
          <div>
            <h3>Comments:</h3>
            <ul>
              {comments.map((comment) => (
                <li key={comment.comment_id}>{comment.text}</li>
              ))}
            </ul>
          </div>
        )}

<textarea
        placeholder="Type your comment here..."
        value={comment}
        onChange={handleCommentChange}
      />
      <button onClick={handlePostComment}>Post Comment</button>

        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default PostPopup;
