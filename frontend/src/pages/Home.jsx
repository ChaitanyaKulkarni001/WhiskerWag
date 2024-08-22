import React, { useEffect, useState } from 'react';
import api from '../api';
import Navbar from '../components/Navbar';
import Rightbar from '../components/Rightbar';
import Content from '../components/Content';

const Home = () => {


  return (
    <div className='min-h-screen bg-gray-900 text-white flex'>
      {/* Navigation (Left Sidebar) */}
      <Navbar/>

      {/* Main Content (Center) */}
      {/* {console.log({method}) */}
      {/* } */}
      <Content method='posts'/>

     <Rightbar/>
    </div>
  );
};

export default Home;
