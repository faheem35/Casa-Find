


import React, { useState, useEffect } from 'react';
import authImg from "../../assets/loginRegisterImg.jpg"
import { loginAPI, registerAPI } from '../../services/allAPI';
import { useNavigate } from 'react-router-dom';

const Auth = ({ insideRegister }) => {
  const [isLogin, setIsLogin] = useState(false)
  const navigate = useNavigate()
  const [inputData, setInputData] = useState({
    username: '', email: '', password: ''
  })
  console.log(inputData);

  const handleRegister = async (e) => {
    e.preventDefault()
    console.log("inside handleRegister");

    if (inputData.username && inputData.email && inputData.password) {
      try {
        const result = await registerAPI(inputData)
        console.log(result);
        if (result.status === 200) {
          alert(`Welcome ${result.data.username}, please login to explore our website!!!`)
          navigate('/login')
          setInputData({ username: '', email: '', password: '' })
        } else {
          if (result.response.status == 406) {
            alert(result.response.data)
            setInputData({ username: '', email: '', password: '' })
            navigate('/login')
          }
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      alert("Please fill the form!!!")
    }
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    if (inputData.email && inputData.password)
      try {
        const result = await loginAPI(inputData)
        if (result.status == 200) {
          sessionStorage.setItem("user", JSON.stringify(result.data.user))
          sessionStorage.setItem("token", result.data.token)
          
          setIsLogin(true)
          setTimeout(() => {
            setInputData({ username: '', email: '', password: '' })
            navigate('/')
            setIsLogin(false)
          }, 2000)
        } 
        // else {
        //   alert("Invalid Email/Password")
        // }

         else if (result.status === 400) {
          alert("User not found");
        } else if (result.status === 403) {
          alert("Admins are not allowed to log in from this portal");
        } else if (result.status === 401 || result.status === 404) {
          alert("Incorrect email or password");
        } else {
          alert(message);
        }
      } catch (err) {
        console.log(err);
      }
  }


 



  return (
    <div className="min-h-screen w-full flex justify-center items-center bg-gray-50 px-4">
  <div className="container mx-auto">
    <div className="bg-white rounded-lg shadow-lg p-6 md:p-10">
      <div className="flex flex-col md:flex-row items-center md:items-start">
        {/* Left Image */}
        <div className="w-full md:w-1/2 mb-6 md:mb-0">
          <img src={authImg} alt="Auth Illustration" className="w-full h-auto object-cover rounded-md" />
        </div>

        {/* Right Form */}
        <div className="w-full md:w-1/2 md:pl-10">
          <h1 className="mt-2 text-3xl font-bold flex items-center gap-2 text-blue-700">
            <i className="fa-brands fa-docker"></i> CasaFind
          </h1>
          <h6 className="mt-2 text-lg text-gray-700">
            Sign {insideRegister ? 'up' : 'in'} to your Account
          </h6>

          <form className="mt-6 space-y-6">
            {insideRegister && (
              <div>
                <label htmlFor="username" className="block mb-1 text-sm font-medium text-gray-700">Username</label>
                <input
                  id="username"
                  type="text"
                  placeholder="Username"
                  value={inputData.username}
                  onChange={e => setInputData({ ...inputData, username: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            )}

            <div>
              <label htmlFor="email" className="block mb-1 text-sm font-medium text-gray-700">Email address</label>
              <input
                id="email"
                type="email"
                placeholder="name@example.com"
                value={inputData.email}
                onChange={e => setInputData({ ...inputData, email: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="password" className="block mb-1 text-sm font-medium text-gray-700">Password</label>
              <input
                id="password"
                type="password"
                placeholder="Password"
                value={inputData.password}
                onChange={e => setInputData({ ...inputData, password: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {insideRegister ? (
              <div className="mt-3">
                <button
                  type="button"
                  onClick={handleRegister}
                  className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
                >
                  Register
                </button>
                <p className="mt-2 text-center text-gray-600">
                  Already a User? Please Click here to{' '}
                  <a href="/login" className="text-blue-600 hover:underline">Login</a>
                </p>
              </div>
            ) : (
              <div className="mt-3">
                <button
                  type="button"
                  onClick={handleLogin}
                  className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200 flex justify-center items-center gap-2"
                >
                  Login
                  {isLogin && (
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z"
                      />
                    </svg>
                  )}
                </button>
                <p className="mt-2 text-center text-gray-600">
                  New User? Please Click here to{' '}
                  <a href="/register" className="text-blue-600 hover:underline">Register</a>
                </p>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  </div>
</div>

  );
};

export default Auth;
