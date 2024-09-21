import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Rightbar from "../components/Rightbar";
import Content from "../components/Content";
import { FaBars } from "react-icons/fa"; // Hamburger menu icon

const Home = ({ from }) => {
  const [theme, setTheme] = useState("light");
  const [showForm, setShowForm] = useState(false);
  const [mobileMenu, setMobileMenu] = useState("content"); // Track which component to show on mobile
  const [isMobile, setIsMobile] = useState(false);

  // Toggle theme between light and dark
  useEffect(() => {
    if (theme === "light") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  // Check if the screen size is mobile
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Adjust based on your breakpoint for mobile
    };
    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Render based on whether it's mobile or desktop
  return (
    <div className="flex flex-col lg:flex-row w-full">
      {isMobile ? (
        <div className="w-full relative">
          {/* Hamburger Menu */}
          <button
            onClick={() => setMobileMenu((prev) => (prev ? null : "menu"))}
            className="p-4 absolute top-0 left-0 z-10"
          >
            <FaBars className="text-3xl" />
          </button>

          {/* Mobile menu */}
          {mobileMenu === "menu" && (
            <div className="absolute w-full h-screen bg-gradient-to-r from-pink-500 to-orange-400 z-20 p-6 flex flex-col items-center justify-center">
              <ul className="space-y-6">
                <li>
                  <button 
                    className="text-white text-lg font-semibold transition-transform transform hover:scale-105 hover:shadow-lg py-2 px-4 rounded-lg focus:outline-none"
                    onClick={() => setMobileMenu("navbar")}
                  >
                    Navbar
                  </button>
                </li>
                <li>
                  <button 
                    className="text-white text-lg font-semibold transition-transform transform hover:scale-105 hover:shadow-lg py-2 px-4 rounded-lg focus:outline-none"
                    onClick={() => setMobileMenu("content")}
                  >
                    Content
                  </button>
                </li>
                <li>
                  <button 
                    className="text-white text-lg font-semibold transition-transform transform hover:scale-105 hover:shadow-lg py-2 px-4 rounded-lg focus:outline-none"
                    onClick={() => setMobileMenu("rightbar")}
                  >
                    Today's Selection
                  </button>
                </li>
              </ul>
            </div>
          )}

          {/* Conditionally render the selected component */}
          {mobileMenu === "navbar" && (
            <div className="h-screen">
              <Navbar setShowForm={setShowForm} showForm={showForm} />
            </div>
          )}
          {mobileMenu === "content" && (
            <Content 
              method={from === "PetPalBlogs" ? "PetPalBlogs" : "posts"} 
              showForm={showForm} 
              setShowForm={setShowForm} 
            />
          )}
          {mobileMenu === "rightbar" && <Rightbar />}
        </div>
      ) : (
        <>
          {/* Desktop layout */}
          {/* Navbar */}
          <Navbar setShowForm={setShowForm} showForm={showForm} />

          {/* Main content and Rightbar */}
          <div className="flex flex-grow">
            <Content 
              method={from === "PetPalBlogs" ? "PetPalBlogs" : "posts"} 
              showForm={showForm} 
              setShowForm={setShowForm} 
            />
            <Rightbar />
          </div>
        </>
      )}
    </div>
  );
}; 

export default Home;
