import React, { useState } from 'react';
import authImg from "../../assets/loginRegisterImg.jpg";
import { adminLoginAPI } from '../../services/allAPI';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate();
  const [inputData, setInputData] = useState({
    email: '',
    password: ''
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    if (inputData.email && inputData.password) {
      try {
        const result = await adminLoginAPI(inputData);
        if (result.status === 200) {
          sessionStorage.setItem("user", JSON.stringify(result.data.user));
          sessionStorage.setItem("token", result.data.token);
          setIsLogin(true);
          setTimeout(() => {
            setInputData({ email: '', password: '' });
            navigate('/'); 
            setIsLogin(false);
          }, 2000);
        } else if(result.status==404) {
          alert("Invalid Email or Password");
        }else if(result.status==400){
          alert("Admin not found")
        }
      } catch (err) {
        console.log(err);
        alert("Login failed. Please try again.");
      }
    } else {
      alert("Please fill in all fields!");
    }
  };

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
                <i className="fa-solid fa-user-shield"></i> Admin Panel
              </h1>
              <h6 className="mt-2 text-lg text-gray-700">Admin Login</h6>

              <form className="mt-6 space-y-6">
                <div>
                  <label htmlFor="email" className="block mb-1 text-sm font-medium text-gray-700">Email</label>
                  <input
                    id="email"
                    type="email"
                    placeholder="admin@example.com"
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
                    placeholder="••••••••"
                    value={inputData.password}
                    onChange={e => setInputData({ ...inputData, password: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

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
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
