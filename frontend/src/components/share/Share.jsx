import "./share.css";
import { PermMedia, Label, Room, EmojiEmotions } from "@mui/icons-material";
import { useState,useRef } from "react";
import axios from "axios";
import { UilTimes } from "@iconscout/react-unicons";
import {Cloudinary} from "@cloudinary/url-gen";
import { AuthContext } from "../context/authContext";
import { useContext } from "react";

function Share({ fetchPosts}) {
  const { currentUser }= useContext(AuthContext);

  const [media_type, setmedia_type] = useState(null);
  const [previewMedia, setPreviewMedia] = useState(null);
  const mediaRef = useRef();
  const [media_url, setMedia_url] = useState(null);
  const [user_id, setUser_id] = useState("");
  const [written_text, setWritten_text] = useState("");

  const cloud_name ="dkifguyks"

  const onMediaChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let mediaFile = event.target.files[0];
      setmedia_type(mediaFile.type);
      setPreviewMedia(URL.createObjectURL(mediaFile));
    }
  };

  const handleShare = async () => {
    try {
      // If an image is selected, upload it to Cloudinary
      if (
        previewMedia &&
        (media_type.includes("image") || media_type.includes("video"))
      ) {
        const formData = new FormData();
        formData.append("file", mediaRef.current.files[0]);
        formData.append("upload_preset", "qvarpolu"); // Replace with your Cloudinary upload preset

        const response1 = await axios.post(
          `https://api.cloudinary.com/v1_1/${cloud_name}/${
            media_type.includes("image") ? "image" : "video"
          }/upload`,
          formData
        );

        // Get the public URL of the uploaded image/video from Cloudinary's response
        const media_url = response1.data.secure_url;
        console.log("Media uploaded to Cloudinary:", media_url);

        // Continue with sharing the post, using imageUrl as the media_url
        const postData = {
          written_text,
          media_type,
          media_url,
          user_id,
        };

        // Make the API call to share the post
        const response = await axios.post(
          "http://localhost:4001/post",
          postData,
          {
            withCredentials: true,
          }
        );
        if (response.data) {
          console.log("Post shared successfully:", response.data);
          fetchPosts();
        }
      } else {
        // If no image is selected, continue with sharing the post without media_url
        const postData = {
          written_text,
          user_id,
        };

        // Make the API call to share the post
        const response = await axios.post(
          "http://localhost:4001/post",
          postData,
          {
            withCredentials: true,
          }
        );
        if (response.data) {
          console.log("Post shared successfully:", response.data);
          fetchPosts();
        }
      }
    } catch (error) {
      console.error("Error sharing post:", error)
    }
  };



  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img className="shareProfileImg" src="/assets/person/1.jpeg" alt="" />
          <input
            placeholder="What are you thinking about now?"
            className="shareInput"
            value={written_text}
            onChange={(e) => setWritten_text(e.target.value)}
          />
        </div>
        <hr className="shareHr" />
        <div className="shareBottom">
          <div className="shareOptions">
            <div className="shareOption" onClick={() => mediaRef.current.click()} >
            
              {/* I will add an input method here to handle file selection */}
              <PermMedia htmlColor="tomato" className="shareIcon" />
              <span className="shareOptionText">Photo or video</span>
              <input
                style={{ display: "none" }}
                type="file"
                id="file"
                accept=".png,.jpeg,.jpg,.gif,.mp4"
                ref={mediaRef}
                onChange={onMediaChange}
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
          <input
            type="file"
            className="hidden"
            ref={mediaRef}
            onChange={onMediaChange}
            accept="image/*, video/*"
          />
        </div>
        {previewMedia && (
          <div className="previewAttachments">
            <UilTimes
              className="cursor-pointer"
              onClick={() => setPreviewMedia(null)}
            />
            {media_type.includes("image") ? (
              <img
                className="previewImage"
                src={previewMedia}
                alt=""
              />
            ) : (
              <video
                className="previewVideo"
                src={previewMedia}
                controls
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Share;
