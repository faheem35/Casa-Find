
import { useState } from "react"
import authImg from "../../assets/loginRegisterImg.jpg"
import { adminLoginAPI } from "../../services/allAPI"
import { useNavigate } from "react-router-dom"

const AdminLogin = () => {
  const [isLogin, setIsLogin] = useState(false)
  const navigate = useNavigate()
  const [inputData, setInputData] = useState({
    email: "",
    password: "",
  })
  const [errors, setErrors] = useState({})
  const [showPassword, setShowPassword] = useState(false)

  const validateForm = () => {
    const newErrors = {}
    if (!inputData.email) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(inputData.email)) {
      newErrors.email = "Email is invalid"
    }
    if (!inputData.password) {
      newErrors.password = "Password is required"
    } else if (inputData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters"
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    if (!validateForm()) return

    setIsLogin(true)
    // try {
    //   const result = await adminLoginAPI(inputData)
    //   if (result.status === 200) {
    //     sessionStorage.setItem("user", JSON.stringify(result.data.user))
    //     sessionStorage.setItem("token", result.data.token)
    //     setTimeout(() => {
    //       setInputData({ email: "", password: "" })
    //       navigate("/adminDashboard")
    //       setIsLogin(false)
    //     }, 2000)
    //   } else if (result.status === 404) {
    //     setErrors({ general: "Invalid Email or Password" })
    //   } else if (result.status === 400) {
    //     setErrors({ general: "Admin not found" })
    //   }
    // } catch (err) {
    //   console.log(err)
    //   setErrors({ general: "Login failed. Please try again." })
    // } finally {
    //   setIsLogin(false)
    // }
    try {
  const result = await adminLoginAPI(inputData)
  if (result.status === 200) {
    sessionStorage.setItem("user", JSON.stringify(result.data.user))
    sessionStorage.setItem("token", result.data.token)
    setTimeout(() => {
      setInputData({ email: "", password: "" })
      navigate("/adminDashboard")
      setIsLogin(false)
    }, 2000)
  } else {
    setErrors({ general: result.data.message || "Login failed" })
  }
} catch (err) {
  console.log(err)
  const message = err?.response?.data?.message || "Login failed. Please try again."
  setErrors({ general: message })
}
finally{
  setIsLogin(false)
}

  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl mx-auto">
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden border border-white/20">
          <div className="flex flex-col lg:flex-row min-h-[600px]">
            {/* Left Side - Image */}
            <div className="lg:w-1/2 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20 z-10"></div>
              <img
                src={authImg || "/placeholder.svg"}
                alt="Admin Login Illustration"
                className="w-full h-64 lg:h-full object-cover"
              />
              {/* <div className="absolute inset-0 z-20 flex items-center justify-center lg:hidden">
                <div className="text-center text-white">
                  <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 border border-white/30">
                    <h2 className="text-2xl font-bold mb-2">Welcome to CasaFind</h2>
                    <p className="text-sm opacity-90">Access your admin dashboard</p>
                  </div>
                </div>
              </div> */}
            </div>

            {/* Right Side - Form */}
            <div className="lg:w-1/2 p-8 sm:p-12 lg:p-16 flex flex-col justify-center">
              <div className="max-w-md mx-auto w-full">
                {/* Header */}
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl mb-4 shadow-lg">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                      />
                    </svg>
                  </div>
                  <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">
                    <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      CasaFind
                    </span>
                  </h1>
                  <p className="text-lg font-medium text-gray-700 mb-1">Admin Panel</p>
                  <p className="text-gray-600">Sign in to manage your property platform</p>
                </div>

                {/* Error Message */}
                {errors.general && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
                    <div className="flex items-center">
                      <svg className="w-5 h-5 text-red-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-red-700 text-sm font-medium">{errors.general}</span>
                    </div>
                  </div>
                )}

                {/* Form */}
                <form onSubmit={handleLogin} className="space-y-6">
                  {/* Email Field */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                          />
                        </svg>
                      </div>
                      <input
                        id="email"
                        type="email"
                        placeholder="admin@example.com"
                        value={inputData.email}
                        onChange={(e) => {
                          setInputData({ ...inputData, email: e.target.value })
                          if (errors.email) setErrors({ ...errors, email: "" })
                        }}
                        className={`w-full pl-12 pr-4 py-4 bg-gray-50 border-2 rounded-xl focus:outline-none focus:bg-white transition-all duration-200 ${
                          errors.email ? "border-red-300 focus:border-red-500" : "border-gray-200 focus:border-blue-500"
                        }`}
                      />
                    </div>
                    {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email}</p>}
                  </div>

                  {/* Password Field */}
                  <div>
                    <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                          />
                        </svg>
                      </div>
                      <input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={inputData.password}
                        onChange={(e) => {
                          setInputData({ ...inputData, password: e.target.value })
                          if (errors.password) setErrors({ ...errors, password: "" })
                        }}
                        className={`w-full pl-12 pr-12 py-4 bg-gray-50 border-2 rounded-xl focus:outline-none focus:bg-white transition-all duration-200 ${
                          errors.password
                            ? "border-red-300 focus:border-red-500"
                            : "border-gray-200 focus:border-blue-500"
                        }`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-4 flex items-center"
                      >
                        <svg
                          className="h-5 w-5 text-gray-400 hover:text-gray-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          {showPassword ? (
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                            />
                          ) : (
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                            />
                          )}
                        </svg>
                      </button>
                    </div>
                    {errors.password && <p className="mt-2 text-sm text-red-600">{errors.password}</p>}
                  </div>

                  {/* Login Button */}
                  <button
                    type="submit"
                    disabled={isLogin}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-4 focus:ring-blue-500/25 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none shadow-lg"
                  >
                    <div className="flex items-center justify-center space-x-2">
                      {isLogin ? (
                        <>
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
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            />
                          </svg>
                          <span>Signing In...</span>
                        </>
                      ) : (
                        <>
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                            />
                          </svg>
                          <span>Sign In</span>
                        </>
                      )}
                    </div>
                  </button>
                </form>

                {/* Footer */}
                <div className="mt-8 text-center">
                  <p className="text-sm text-gray-500">CasaFind Admin • Secure access • Protected by encryption</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminLogin
