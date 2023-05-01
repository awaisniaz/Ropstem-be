import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './components/Login'
import Signup from './components/Signup'
import RegistrationScreen from './components/RegistrationScreen';
import { useNavigate } from "react-router-dom";
import React, { useEffect } from 'react'
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route
            path='/signup'
            element={<Signup />}
          />
          <Route
            path='/dashboard'
            element={<ValidateUser components={<RegistrationScreen />}></ValidateUser>}
          />
        </Routes>
      </BrowserRouter>
    </>
  )
}

function ValidateUser({ components }: any) {
  const navigate = useNavigate();
  useEffect(() => {
    navigateToUser()
  }, [])
  const navigateToUser = async () => {
    const loggedUser = await JSON.parse(localStorage.getItem('loginuser') || '{}')
    console.log(loggedUser)
    if (loggedUser == undefined || loggedUser == null) {
      navigate('/login')
      return
    }

  }
  return components


}

export default App
