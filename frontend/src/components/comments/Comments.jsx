import React, { useState, useEffect } from "react";
import axios from "axios";

function Comments({ post }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    fetchComments(post.post_id);
  }, [post.post_id]);

  const fetchComments = async (post_id) => {
    try {
      const response = await axios.get(`http://localhost:4001/comments/${post_id}`, {
        withCredentials: true,
      });
      setComments(response.data.comments);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const handleCommentSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:4001/comments",
        {
          post_id: post.post_id,
          text: newComment,
        },
        {
          withCredentials: true,
        }
      );
      setComments([...comments, response.data.comment]);
      setNewComment("");
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const handleCommentDelete = async (comment_id) => {
    try {
      await axios.delete(`http://localhost:4001/comments/${comment_id}`, {
        withCredentials: true,
      });
      const updatedComments = comments.filter((comment) => comment.comment_id !== comment_id);
      setComments(updatedComments);
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  return (
    <div>
      <h3>Comments:</h3>
      <ul>
        {comments.map((comment) => (
          <li key={comment.comment_id}>
            {comment.text}
            <button onClick={() => handleCommentDelete(comment.comment_id)}>Delete</button>
          </li>
        ))}
      </ul>
      <form onSubmit={handleCommentSubmit}>
        <input
          type="text"
          placeholder="Add a comment"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Comments;
