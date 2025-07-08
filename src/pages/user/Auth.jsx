
import { useContext, useState } from "react"
import authImg from "../../assets/loginRegisterImg.jpg"
import { loginAPI, registerAPI } from "../../services/allAPI"
import { useNavigate } from "react-router-dom"
import { tokenAuthContext } from "../../contexts/AuthContextAPI"

const Auth = ({ insideRegister }) => {
  const { isAuthorised, setIsAuthorised } = useContext(tokenAuthContext)
  const [isLogin, setIsLogin] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()
  const [inputData, setInputData] = useState({
    username: "",
    email: "",
    password: "",
  })

  // Validation states
  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
  })

  const [touched, setTouched] = useState({
    username: false,
    email: false,
    password: false,
  })

  // Validation functions
  const validateUsername = (username) => {
    if (!username) return "Username is required"
    if (username.length < 3) return "Username must be at least 3 characters"
    if (username.length > 20) return "Username must be less than 20 characters"
    if (!/^[a-zA-Z0-9_]+$/.test(username)) return "Username can only contain letters, numbers, and underscores"
    return ""
  }

  const validateEmail = (email) => {
    if (!email) return "Email is required"
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) return "Please enter a valid email address"
    return ""
  }

  const validatePassword = (password) => {
    if (!password) return "Password is required"
    if (password.length < 8) return "Password must be at least 8 characters"
    if (password.length > 50) return "Password must be less than 50 characters"
    if (!/(?=.*[a-z])/.test(password)) return "Password must contain at least one lowercase letter"
    if (!/(?=.*[A-Z])/.test(password)) return "Password must contain at least one uppercase letter"
    if (!/(?=.*\d)/.test(password)) return "Password must contain at least one number"
    if (!/(?=.*[@$!%*?&])/.test(password)) return "Password must contain at least one special character (@$!%*?&)"
    return ""
  }

  // Get password strength
  const getPasswordStrength = (password) => {
    let score = 0
    if (password.length >= 8) score++
    if (/(?=.*[a-z])/.test(password)) score++
    if (/(?=.*[A-Z])/.test(password)) score++
    if (/(?=.*\d)/.test(password)) score++
    if (/(?=.*[@$!%*?&])/.test(password)) score++

    if (score <= 2) return { strength: "Weak", color: "bg-red-500", width: "33%" }
    if (score <= 3) return { strength: "Medium", color: "bg-yellow-500", width: "66%" }
    return { strength: "Strong", color: "bg-green-500", width: "100%" }
  }

  // Handle input changes with validation
  const handleInputChange = (field, value) => {
    setInputData({ ...inputData, [field]: value })

    // Validate on change if field has been touched
    if (touched[field]) {
      let error = ""
      switch (field) {
        case "username":
          error = validateUsername(value)
          break
        case "email":
          error = validateEmail(value)
          break
        case "password":
          error = validatePassword(value)
          break
        default:
          break
      }
      setErrors({ ...errors, [field]: error })
    }
  }

  // Handle field blur
  const handleBlur = (field) => {
    setTouched({ ...touched, [field]: true })
    let error = ""
    switch (field) {
      case "username":
        error = validateUsername(inputData[field])
        break
      case "email":
        error = validateEmail(inputData[field])
        break
      case "password":
        error = validatePassword(inputData[field])
        break
      default:
        break
    }
    setErrors({ ...errors, [field]: error })
  }

  // Check if form is valid
  const isFormValid = () => {
    if (insideRegister) {
      return (
        inputData.username &&
        inputData.email &&
        inputData.password &&
        !errors.username &&
        !errors.email &&
        !errors.password
      )
    } else {
      return inputData.email && inputData.password && !errors.email && !errors.password
    }
  }

  const handleRegister = async (e) => {
    e.preventDefault()
    console.log("inside handleRegister")

    // Validate all fields
    const usernameError = validateUsername(inputData.username)
    const emailError = validateEmail(inputData.email)
    const passwordError = validatePassword(inputData.password)

    setErrors({
      username: usernameError,
      email: emailError,
      password: passwordError,
    })

    setTouched({
      username: true,
      email: true,
      password: true,
    })

    if (usernameError || emailError || passwordError) {
      return
    }

    try {
      const result = await registerAPI(inputData)
      console.log(result)
      if (result.status === 200) {
        alert(`Welcome ${result.data.username}, please login to explore our website!!!`)
        navigate("/login")
        setInputData({ username: "", email: "", password: "" })
        setErrors({ username: "", email: "", password: "" })
        setTouched({ username: false, email: false, password: false })
      } else {
        if (result.response.status == 406) {
          alert(result.response.data)
          setInputData({ username: "", email: "", password: "" })
          navigate("/login")
        }
      }
    } catch (err) {
      console.log(err)
      alert("Registration failed. Please try again.")
    }
  }

  const handleLogin = async (e) => {
    e.preventDefault()

    // Basic validation for login
    const emailError = validateEmail(inputData.email)
    const passwordError = inputData.password ? "" : "Password is required"

    setErrors({
      ...errors,
      email: emailError,
      password: passwordError,
    })

    if (emailError || passwordError) {
      setTouched({ ...touched, email: true, password: true })
      return
    }

    try {
      const result = await loginAPI(inputData)
      // if (result.status == 200) {
      //   sessionStorage.setItem("user", JSON.stringify(result.data.user))
      //   sessionStorage.setItem("token", result.data.token)
      //   setIsAuthorised(true)
      //   setIsLogin(true)
      //   setTimeout(() => {
      //     setInputData({ username: "", email: "", password: "" })
      //     navigate("/")
      //     setIsLogin(false)
      //   }, 2000)
      // } else if (result.status === 400) {
      //   alert("User not found")
      // } else if (result.status === 403) {
      //   alert("Admins are not allowed to log in from this portal")
      // } else if (result.status === 401 || result.status === 404) {
      //   alert("Incorrect email or password")
      // }
      if (result.status === 200) {
  sessionStorage.setItem("user", JSON.stringify(result.data.user));
  sessionStorage.setItem("token", result.data.token);
  setIsAuthorised(true);
  setIsLogin(true);
  setTimeout(() => {
    setInputData({ username: "", email: "", password: "" });
    navigate("/");
    setIsLogin(false);
  }, 2000);
} else if (result.status === 403) {
  const message = result?.data?.message || "Access denied.";
  alert(message);
} else if (result.status === 401) {
  alert("Incorrect email or password");
} else {
  alert("Login failed. Please try again.");
}

    } catch (err) {
      console.log(err)
      alert("Login failed. Please try again.")
    }
  }

  const passwordStrength = getPasswordStrength(inputData.password)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-200/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-pink-200/30 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className="relative w-full max-w-6xl mx-auto">
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
          <div className="flex flex-col lg:flex-row min-h-[600px]">
            {/* Left Side - Image & Branding */}
            <div className="lg:w-1/2 relative bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 p-8 lg:p-12 flex flex-col justify-center">
              {/* Decorative Elements */}
              <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
                <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
                <div className="absolute bottom-10 right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
                <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-white/5 rounded-full blur-xl"></div>
              </div>

              <div className="relative z-10 text-center lg:text-left">
                {/* Logo & Brand */}
                <div className="mb-8">
                  <div className="flex items-center justify-center lg:justify-start mb-4">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center mr-3">
                      <i className="fa-solid fa-home text-white text-xl"></i>
                    </div>
                    <h1 className="text-3xl font-black text-white">CasaFind</h1>
                  </div>
                  <p className="text-blue-100 text-lg leading-relaxed">
                    Gateway to premium real estate opportunities worldwide
                  </p>
                </div>

                {/* Feature Image */}
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
                  <img
                    src={authImg || "/placeholder.svg"}
                    alt="Real Estate"
                    className="w-full h-64 lg:h-80 object-cover rounded-2xl shadow-2xl group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="bg-white/90 backdrop-blur-md rounded-xl p-4">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center text-gray-700">
                            <i className="fa-solid fa-users mr-2 text-blue-600"></i>
                            <span className="font-semibold">10K+ Users</span>
                          </div>
                          <div className="flex items-center text-gray-700">
                            <i className="fa-solid fa-home mr-2 text-green-600"></i>
                            <span className="font-semibold">5K+ Properties</span>
                          </div>
                        </div>
                        <div className="flex space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <i key={i} className="fa-solid fa-star text-yellow-400 text-xs"></i>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Trust Indicators */}
                <div className="mt-8 grid grid-cols-3 gap-4 text-center">
                  <div className="bg-white/10 backdrop-blur-md rounded-xl p-4">
                    <div className="text-2xl font-bold text-white mb-1">99%</div>
                    <div className="text-blue-100 text-xs">Satisfaction</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-md rounded-xl p-4">
                    <div className="text-2xl font-bold text-white mb-1">24/7</div>
                    <div className="text-blue-100 text-xs">Support</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-md rounded-xl p-4">
                    <div className="text-2xl font-bold text-white mb-1">100%</div>
                    <div className="text-blue-100 text-xs">Secure</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Form */}
            <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
              <div className="max-w-md mx-auto w-full">
                {/* Header */}
                <div className="text-center mb-8">
                  <h2 className="text-3xl lg:text-4xl font-black text-gray-900 mb-3">
                    {insideRegister ? "Create Account" : "Welcome Back"}
                  </h2>
                  <p className="text-gray-600 text-lg">
                    {insideRegister
                      ? "Join thousands of property seekers and sellers"
                      : "Sign in to list or find properties now"}
                  </p>
                </div>

                {/* Form */}
                <form className="space-y-6">
                  {insideRegister && (
                    <div className="group">
                      <label htmlFor="username" className="block text-sm font-semibold text-gray-700 mb-2">
                        <i className="fa-solid fa-user mr-2 text-blue-600"></i>
                        Username *
                      </label>
                      <div className="relative">
                        <input
                          id="username"
                          type="text"
                          placeholder="Enter your username"
                          value={inputData.username}
                          onChange={(e) => handleInputChange("username", e.target.value)}
                          onBlur={() => handleBlur("username")}
                          className={`w-full px-4 py-4 bg-gray-50 border rounded-xl focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200 group-hover:border-gray-300 ${
                            errors.username && touched.username
                              ? "border-red-300 focus:ring-red-500"
                              : "border-gray-200 focus:ring-blue-500"
                          }`}
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                          <i
                            className={`fa-solid fa-user transition-colors ${
                              errors.username && touched.username
                                ? "text-red-400"
                                : "text-gray-400 group-focus-within:text-blue-500"
                            }`}
                          ></i>
                        </div>
                      </div>
                      {errors.username && touched.username && (
                        <p className="mt-2 text-sm text-red-600 flex items-center">
                          <i className="fa-solid fa-exclamation-circle mr-2"></i>
                          {errors.username}
                        </p>
                      )}
                    </div>
                  )}

                  <div className="group">
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                      <i className="fa-solid fa-envelope mr-2 text-blue-600"></i>
                      Email Address *
                    </label>
                    <div className="relative">
                      <input
                        id="email"
                        type="email"
                        placeholder="name@example.com"
                        value={inputData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        onBlur={() => handleBlur("email")}
                        className={`w-full px-4 py-4 bg-gray-50 border rounded-xl focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200 group-hover:border-gray-300 ${
                          errors.email && touched.email
                            ? "border-red-300 focus:ring-red-500"
                            : "border-gray-200 focus:ring-blue-500"
                        }`}
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                        <i
                          className={`fa-solid fa-envelope transition-colors ${
                            errors.email && touched.email
                              ? "text-red-400"
                              : "text-gray-400 group-focus-within:text-blue-500"
                          }`}
                        ></i>
                      </div>
                    </div>
                    {errors.email && touched.email && (
                      <p className="mt-2 text-sm text-red-600 flex items-center">
                        <i className="fa-solid fa-exclamation-circle mr-2"></i>
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div className="group">
                    <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                      <i className="fa-solid fa-lock mr-2 text-blue-600"></i>
                      Password *
                    </label>
                    <div className="relative">
                      <input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        value={inputData.password}
                        onChange={(e) => handleInputChange("password", e.target.value)}
                        onBlur={() => handleBlur("password")}
                        className={`w-full px-4 py-4 bg-gray-50 border rounded-xl focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200 group-hover:border-gray-300 pr-12 ${
                          errors.password && touched.password
                            ? "border-red-300 focus:ring-red-500"
                            : "border-gray-200 focus:ring-blue-500"
                        }`}
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="text-gray-400 hover:text-gray-600 focus:outline-none mr-2"
                        >
                          <i className={`fa-solid ${showPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
                        </button>
                        <i
                          className={`fa-solid fa-lock transition-colors ${
                            errors.password && touched.password
                              ? "text-red-400"
                              : "text-gray-400 group-focus-within:text-blue-500"
                          }`}
                        ></i>
                      </div>
                    </div>

                    {/* Password Strength Indicator */}
                    {insideRegister && inputData.password && (
                      <div className="mt-2">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs text-gray-600">Password Strength:</span>
                          <span className={`text-xs font-semibold ${passwordStrength.color.replace("bg-", "text-")}`}>
                            {passwordStrength.strength}
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full transition-all duration-300 ${passwordStrength.color}`}
                            style={{ width: passwordStrength.width }}
                          ></div>
                        </div>
                      </div>
                    )}

                    {errors.password && touched.password && (
                      <p className="mt-2 text-sm text-red-600 flex items-center">
                        <i className="fa-solid fa-exclamation-circle mr-2"></i>
                        {errors.password}
                      </p>
                    )}

                    {/* Password Requirements */}
                    {insideRegister && touched.password && (
                      <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                        <p className="text-xs font-semibold text-gray-700 mb-2">Password Requirements:</p>
                        <div className="space-y-1">
                          <div className="flex items-center text-xs">
                            <i
                              className={`fa-solid mr-2 ${
                                inputData.password.length >= 8 ? "fa-check text-green-500" : "fa-times text-red-500"
                              }`}
                            ></i>
                            <span className={inputData.password.length >= 8 ? "text-green-600" : "text-gray-600"}>
                              At least 8 characters
                            </span>
                          </div>
                          <div className="flex items-center text-xs">
                            <i
                              className={`fa-solid mr-2 ${
                                /(?=.*[a-z])/.test(inputData.password)
                                  ? "fa-check text-green-500"
                                  : "fa-times text-red-500"
                              }`}
                            ></i>
                            <span
                              className={/(?=.*[a-z])/.test(inputData.password) ? "text-green-600" : "text-gray-600"}
                            >
                              One lowercase letter
                            </span>
                          </div>
                          <div className="flex items-center text-xs">
                            <i
                              className={`fa-solid mr-2 ${
                                /(?=.*[A-Z])/.test(inputData.password)
                                  ? "fa-check text-green-500"
                                  : "fa-times text-red-500"
                              }`}
                            ></i>
                            <span
                              className={/(?=.*[A-Z])/.test(inputData.password) ? "text-green-600" : "text-gray-600"}
                            >
                              One uppercase letter
                            </span>
                          </div>
                          <div className="flex items-center text-xs">
                            <i
                              className={`fa-solid mr-2 ${
                                /(?=.*\d)/.test(inputData.password)
                                  ? "fa-check text-green-500"
                                  : "fa-times text-red-500"
                              }`}
                            ></i>
                            <span className={/(?=.*\d)/.test(inputData.password) ? "text-green-600" : "text-gray-600"}>
                              One number
                            </span>
                          </div>
                          <div className="flex items-center text-xs">
                            <i
                              className={`fa-solid mr-2 ${
                                /(?=.*[@$!%*?&])/.test(inputData.password)
                                  ? "fa-check text-green-500"
                                  : "fa-times text-red-500"
                              }`}
                            ></i>
                            <span
                              className={
                                /(?=.*[@$!%*?&])/.test(inputData.password) ? "text-green-600" : "text-gray-600"
                              }
                            >
                              One special character (@$!%*?&)
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div className="pt-6">
                    <button
                      type="button"
                      onClick={insideRegister ? handleRegister : handleLogin}
                      disabled={isLogin || !isFormValid()}
                      className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-3"
                    >
                      {isLogin ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                          <span>Signing In...</span>
                        </>
                      ) : (
                        <>
                          <i className={`fa-solid ${insideRegister ? "fa-user-plus" : "fa-sign-in-alt"}`}></i>
                          <span>{insideRegister ? "Create Account" : "Sign In"}</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Switch Form */}
                  <div className="text-center pt-8">
                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-200"></div>
                      </div>
                      <div className="relative flex justify-center text-sm">
                        <span className="px-4 bg-white text-gray-500">
                          {insideRegister ? "Already have an account?" : "New to CasaFind?"}
                        </span>
                      </div>
                    </div>
                    <div className="mt-6">
                      <a
                        href={insideRegister ? "/login" : "/register"}
                        className="inline-flex items-center justify-center w-full px-6 py-3 border-2 border-blue-600 text-blue-600 font-bold rounded-xl hover:bg-blue-600 hover:text-white transition-all duration-300 transform hover:scale-105"
                      >
                        <i className={`fa-solid ${insideRegister ? "fa-sign-in-alt" : "fa-user-plus"} mr-2`}></i>
                        {insideRegister ? "Sign In Instead" : "Create Account"}
                      </a>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Auth
