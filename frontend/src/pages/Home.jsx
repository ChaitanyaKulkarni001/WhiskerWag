import React from "react";
import Navbar from "../components/Navbar";
import Rightbar from "../components/Rightbar";
import Content from "../components/Content";
import { useState,useEffect } from "react";
const Home = () => {
  const [theme, setTheme] = useState("light")
  useEffect(()=>{
     if (theme=== "dark"){
      document.documentElement.classList.add("dark");
     }
     else{
      document.documentElement.classList.remove("dark");
     }
  },[theme])
  const handleSwitch = () => {
    console.log("cliked");
    console.log("theme now",theme);
    
    setTheme(theme === "light"? "dark" : "light");
  }
  return (
 
    <div className=" bg-gray-900 text-white flex relative">
      <button onClick={handleSwitch} className="z-20">Dark Mode</button>
      <Navbar />
      <Rightbar />
      
      <div className="absolute inset-0 flex justify-center  items-start  ml-[20%] mr-[25%]">
        <div className="w-full max-w-4xl bg-gray-900 ">
          <Content method="posts" />
        </div>
      </div>

    </div>
  );
};

export default Home;
