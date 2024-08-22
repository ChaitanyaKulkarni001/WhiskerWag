import React, { useEffect } from 'react'
import Navbar from '../components/Navbar'
import Rightbar from '../components/Rightbar'
import Content from '../components/Content'
const PetPalHome = () => {
    // useEffect(() => {
    //     return () => {
    //         getPetPals();
    //     };
    // }, [])
    // const getPetPals = async () => {
    //     try {
    //       const res = await api.get('/api/petpal/blogs/');
    //       setPosts(res.data);
    //     } catch (err) {
    //       console.error(err);
    //     }
    //   };
  return (
    <div className='min-h-screen bg-gray-900 text-white flex'>
      <Navbar/>
        <Content method='PetPalBlogs'/>
        <Rightbar/>
    </div>
  )
}

export default PetPalHome
