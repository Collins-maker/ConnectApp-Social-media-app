import "./home.css"
import Topbar from '../../components/topbar/Topbar'
import Sidebar from '../../components/sidebar/Sidebar'
import Feeds from '../../components/feeds/Feeds'
import Rightbar from '../../components/rightbar/Rightbar'





function Home() {

  return (
    <>
   <Topbar/>
   <div className="homeContainer">
    <Sidebar/>
    <Feeds/>
    <Rightbar isProfilePage={false}/>
   </div>
   
      
   </>
  );
}


export default Home;
