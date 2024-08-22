import { useState } from 'react'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import Protectedroute from './components/Protectedroute'
import './App.css'
import { Route,BrowserRouter,Routes , Navigate} from 'react-router-dom'
import PetPalHome from './PetPalsPages/PetPalHome'
import DoctorDashboard from './DoctorsPages/DoctorDashboard'
import TakeAppointment from './DoctorsPages/TakeAppointment'
import Profile from './components/Profile'
function Logout(){
  localStorage.clear();
  return <Navigate to="/login" />
}
function RegisterLogout(){
  localStorage.clear();
  return <Register/>
}

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <Protectedroute>
            <Home/>
          </Protectedroute>
        } />

        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<RegisterLogout/>} />
        <Route path='/logout' element={<Logout/>} />
        <Route path='/petpal/home' element={<PetPalHome/>} />
        <Route path='/takeappointment' element={<TakeAppointment/>} />
        <Route path='/myprofile' element={<Profile/>}/>
        <Route path='/doc' element={
        
          // <Protectedroute>
            <DoctorDashboard/>
          // </Protectedroute>} />}
        }/>
        <Route path='*' element={<NotFound/>} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
