import React, { userEffect } from 'react'
import { useSelector } from 'react-redux'
import './App.css'
import Dashboard from './views/Dashboard'

function App() {
  const gaiaSignin = useSelector((state) => state.botSignin)
  const { gaiaInfo } = gaiaSignin;
  const userSignin = useSelector((state) => state.userSignin)
  const { userInfo } = userSignin;

  const isAuthenticated = gaiaSignin?.accessToken || userSignin?.username;
  
  // userEffect(() => {
  //   console.log("App compoenent rendered! ");
  // }, [gaiaSignin, userSignin]);
  console.log("User is signed in:", !!isAuthenticated);
  
  return (
    <>
      {isAuthenticated ? (
        <main className="flex">
          < Dashboard />
        </main>  
      ) : (
        <p>Please sign in.</p>  
      )}
    </>
  )
}

export default App;
