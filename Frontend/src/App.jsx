import React, { useEffect } from 'react';
import "./index.css";
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
import SignUp from './components/pages/SignUp';
import Profile from './components/pages/Profile';
import Login from './components/pages/Login';
import Navbar from './components/Ui/Navbar';
import { Toaster } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { checkUser } from './API/api';
import { Loading } from './components/Ui/Loading';
import ChatPage from './components/pages/ChatPage';
import ChatContainer from './components/Ui/ChatContainer';


function App() {
  const { user, loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!user) {
      checkUser(dispatch);
    }
  }, [dispatch]);
  if (loading) {
    return <Loading/>
  }
  
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={user ? <ChatPage/> : <Navigate to='/login' />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/login' element={<Login />} />
        <Route path='/profile' element={user?<Profile />:<Navigate to='/login'/>} />
        <Route path='/chat' element={<ChatContainer/>}/>
      </Routes>
      <Toaster />
    </BrowserRouter>

  );
}

export default App;
