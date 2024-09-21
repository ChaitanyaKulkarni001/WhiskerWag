import React, { useEffect ,useState} from 'react'
import Navbar from '../components/Navbar'
import Rightbar from '../components/Rightbar'
import Content from '../components/Content'
import Home from '../pages/Home'



const PetPalHome = () => {
  const [theme, setTheme] = useState("light");
const [showForm, setShowForm] = useState(false);
useEffect(() => {
  if (theme === "light") {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
}, [theme]);
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
    <div className="flex flex-col lg:flex-row w-full">
  {/* Navbar for mobile and large screens */}
  
  <Home from="PetPalBlogs"/>
</div>
  )
}

export default PetPalHome
