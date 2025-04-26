import React, { useState } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import {googleAuth} from '../api/googleoauth'
import { useNavigate } from 'react-router-dom'
import {toast} from 'react-toastify'

const Login = () => {
  const navigate = useNavigate();
  const responseGoogle = async (authResult) => {
    try {
        if (authResult['code']) {
            const result = await googleAuth(authResult.code);
            // const result = await axios.get(`https://blogorbit.onrender.com/auth/google?code=${authResult.code}`)
            const { email, name, image } = result.data.user;
            const token = result.data.token;
            const obj = {
                email,
                name,
                image,
                token
            };
            localStorage.setItem("user-info", JSON.stringify(obj));
            console.log(email, name, image);
            navigate("/admin/panel");
            const notify = () => { toast.success("Login successfully !") }
            notify();
        }
        console.log(authResult);
    } catch (error) {
        console.error("Error while requesting google code: ", error);
    }
}
const googleLogin = useGoogleLogin({
    onSuccess: responseGoogle,
    onError: responseGoogle,
    flow: 'auth-code'
});
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
          <button
            type="submit"
            onClick={googleLogin}
            className="w-32 cursor-pointer bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Login
          </button>
      </div>
  );
};

export default Login;