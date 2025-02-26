import React, { useEffect } from 'react'
import AuthForm from '../Ui/AuthForm';
import { signup } from '../../API/api';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);
  const user = useSelector((state) => state.auth.user); 

  const handleSignup = async(formData) => {
     await signup(formData,dispatch);
     navigate('/');
  }

  useEffect(() => {
    if(user){
      navigate('/');
    }
  }, [user,navigate]);

  return (
    <AuthForm 
    showNameField={true} 
    submitText="Sign Up" 
    redirectText="Already have an account?" 
    redirectLink="/login" 
    redirectLinkText="Login " 
    onSubmit={handleSignup}
    image="/signingup.png"
    authText="Join the best platform for chatting with your friends"
    loading={loading}
  />
  )
}

export default SignUp
