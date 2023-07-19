import "./post.css";
import { MoreVert } from "@mui/icons-material";
import axios from "axios"
import { useEffect, useState } from "react";



function Post({post}) {   
  const [like,setLike] = useState(post.like)
  const [isLiked,setIsLiked] = useState(false)

  const likeHandler =()=>{
    setLike(isLiked ? like-1 : like+1)
    setIsLiked(!isLiked)
  }

  const [posts, setPosts] = useState([])

  const fetchPosts =  async () => {
   
    try {
      const response = await axios.get('http://localhost:4001/posts', {
        withCredentials: true
      })
      console.log(response.data.results)
      console.log("data recieved")
      setPosts(response.data.results)
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  }

  useEffect(()=>{
    fetchPosts()
  }, [])


  return (
    <div className="post">
      <div className="postWrapper">

      { posts.map((p)=>(
        <div key={p.post_id}>

          <div className="postTop">
          <div className="postTopLeft">
            <img
              className="postProfileImg"
              src={p.profile_image}
              alt=""
            />
            <span className="postUsername">
              {p.username}
            </span>
            <span className="postDate">{p.created_at}</span>
          </div>
          <div className="postTopRight">
            <MoreVert />
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{p.written_text}</span>
          <img className="postImg" src={p.imge_url} alt="" />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img className="likeIcon" src="assets/like.png " onClick={likeHandler} alt="" />
            <img className="likeIcon" src="assets/heart.png " onClick={likeHandler} alt="" />
            <span className="postLikeCounter">{p.like_count} people reacted</span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">{p.Comment_count} Comments</span>
          </div>
        </div>

          </div>

      ))}
        

        
      </div>
    </div>
  );
}

export default Post;
