import "./share.css";
import { PermMedia, Label, Room, EmojiEmotions } from "@mui/icons-material";
import { useState } from "react";

function Share({ handleSharePost}) {

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
            <div className="shareOption">
              {/* I will add an input method here to handle file selection */}
              <PermMedia htmlColor="tomato" className="shareIcon" />
              <span className="shareOptionText">Photo or video</span>
              <input
                style={{ display: "none" }}
                type="file"
                id="file"
                accept=".png,.jpeg,.jpg,.gif,.mp4"
                onChange={handleFileChange}
              />
            </div>
            <div className="shareOption">
              <Label htmlColor="tomato" className="shareIcon" />
              <span className="shareOptionText">Tag </span>
            </div>
            <div className="shareOption">
              <Room htmlColor="tomato" className="shareIcon" />
              <span className="shareOptionText">Location</span>
            </div>
            <div className="shareOption">
              <EmojiEmotions htmlColor="tomato" className="shareIcon" />
              <span className="shareOptionText">Reactions</span>
            </div>
          </div>
          <button className="shareButton" onClick={handleShare}>Share</button>
        </div>
      </div>
    </div>
  );
}

export default Share;
