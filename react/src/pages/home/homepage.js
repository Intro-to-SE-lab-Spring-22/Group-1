import React from "react";
import Topbar from "../../components/topbar/topbar";
import Leftbar from "../../components/leftsidebar/leftbar"
import Rightbar from "../../components/rightsidebar/rightbar"
import Timeline from "../../components/timeline/timeline"
import "./home.css"

export default function Home() {
    return (
      <>
        
        <Topbar />
        <div className="homeContainer"> 
          <Leftbar />
          <Timeline />
          <Rightbar />
        </div>
      </>
    );
  }
