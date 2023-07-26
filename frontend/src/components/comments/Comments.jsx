import { useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/authContext";

function Comment({ postId, commentCount}) {
  const { currentUser }= useContext(AuthContext);
  const [comments, setComments] = useState([]);
  const [showComments, setShowComments] = useState(false);
  const [showTextArea, setShowTextArea] = useState(false); // State to track whether to show the text area
  const [commentText, setCommentText] = useState(""); // State to store the user's comment text

  // Define the commentHandler function
  const commentHandler = async (post_id) => {
    try {
      // Fetch comments for the post from the backend
      const response = await axios.get(`http://localhost:4001/comments/${post_id}`, {
        withCredentials: true,
      });
      console.log(response);

      // Update the comments state with the fetched comments
      setComments(response.data.results);
      // Toggle the showComments state to display or hide the comments
      setShowComments((prevShowComments) => !prevShowComments);
      // Show the text area when the user clicks on "view Comments"
      setShowTextArea(true);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  // Function to handle comment submission
  const handleCommentSubmit = async () => {
    try {
      // Send the comment to the backend
      const response = await axios.post(
        "http://localhost:4001/comment",
        {
          post_id: postId,
          comment_text: commentText,
        },
        {
          withCredentials: true,
        }
      );

      // Clear the comment text area
      setCommentText("");

      // If the comment was successfully added to the backend, update the comments state
      if (response.data.success) {
        // Fetch the updated comments for the post from the backend
        const updatedResponse = await axios.get(`http://localhost:4001/comments/${postId}`, {
          withCredentials: true,
        });
        // Update the comments state with the updated comments
        setComments(updatedResponse.data.results);
      }
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const handleCloseComments = () => {
    setShowComments(false);
    setShowTextArea(false);
  };

  // Function to handle updating a comment
  const handleUpdateComment = async (commentId, updatedText) => {
    try {
      // Send the updated comment to the backend
      const response = await axios.put(
        `http://localhost:4001/comments/${commentId}`,
        {
          comment_text: updatedText,
        },
        {
          withCredentials: true,
        }
      );

      // If the comment was successfully updated in the backend, update the comments state
      if (response.data.success) {
        // Fetch the updated comments for the post from the backend
        const updatedResponse = await axios.get(`http://localhost:4001/comments/${postId}`, {
          withCredentials: true,
        });
        // Update the comments state with the updated comments
        setComments(updatedResponse.data.results);
      }
    } catch (error) {
      console.error("Error updating comment:", error);
    }
  };

  // Function to handle deleting a comment
  const handleDeleteComment = async (commentId) => {
    try {
      // Send the request to delete the comment to the backend
      const response = await axios.delete(`http://localhost:4001/comments/${commentId}`, {
        withCredentials: true,
      });

      // If the comment was successfully deleted in the backend, update the comments state
      if (response.data.success) {
        // Fetch the updated comments for the post from the backend
        const updatedResponse = await axios.get(`http://localhost:4001/comments/${postId}`, {
          withCredentials: true,
        });
        // Update the comments state with the updated comments
        setComments(updatedResponse.data.results);
      }
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };


  return (
    <div>
      {/* Display the comments if showComments is true */}
      {showComments && comments?.length && (
        <div>
          <h3>Comments:</h3>
          <ul>
            {comments?.map((comment) => (
              <li key={comment.comment_id}>
                <strong>{comment.username}: </strong>
                {comment.comment_text}
                 {/* Add buttons to update and delete the comment */}
                 {currentUser && currentUser.id === comment.user_id && (
                  <>
                    <button onClick={() => handleUpdateComment(comment.comment_id, "Updated Comment Text")}>
                      Update
                    </button>
                    <button onClick={() => handleDeleteComment(comment.comment_id)}>
                      Delete
                    </button>
                  </>
                )}
                </li>
            ))}
          </ul>
        </div>
      )}
      {/* Comment section trigger */}
      {!showComments && (
        <span className="postCommentText" onClick={() => commentHandler(postId)}>
          {commentCount} Comments
        </span>
      )}
      {/* Comment text area and submit button */}
      {showTextArea && (
        <div>
          <textarea
            rows="3"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Enter your comment..."
          />
          <button onClick={handleCommentSubmit}>Submit Comment</button>
          <button onClick={handleCloseComments}>Close</button>
        </div>
      )}
    </div>
  );
}

export default Comment;
