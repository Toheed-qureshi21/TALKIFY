import React, { useEffect } from 'react'
import AuthForm from '../Ui/AuthForm'
import { useDispatch, useSelector } from 'react-redux'
import { clearFormData } from '../../slices/formSlice'
import { useNavigate } from 'react-router-dom'
import { login } from '../../API/api'

const Login = () => {
  const dispatch = useDispatch()
  const loading = useSelector((state) => state.auth.loading);
  const {user} = useSelector((state) => state.auth);
  useEffect(() => {
    dispatch(clearFormData({clearName: false}))
  }, [])
  const navigate = useNavigate();
  const handleLogin = async(formData) => {
     await login(formData,dispatch);
     navigate('/');
  }

  useEffect(() => {
    if(user){
      navigate('/');
    }
  }, [user,navigate]);
  return (
    <AuthForm 
    showNameField={false} 
    submitText="Login" 
    redirectText="Don't have an account?" 
    redirectLink="/signup" 
    redirectLinkText="Sign up here" 
    onSubmit={handleLogin}
    authText="Welcome back! Please enter your details to login."
    image="/login.png"
    loading={loading}
    isGuest={true}
  />
  
  
  )
}

export default Login
