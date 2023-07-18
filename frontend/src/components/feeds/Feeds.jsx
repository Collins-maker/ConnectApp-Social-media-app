import Post from "../posts/Post"
import Share from "../share/Share"
import "./feeds.css"
import{Posts} from '../../dummyData'

function Feeds() {
  return (
    <div className="feeds">
      <div className="feedsWrapper">
       <Share/>
       {Posts.map((p)=>(
        <Post key={p.id} post={p} />
       ))}

      </div>
      </div>
  )
}

export default Feeds