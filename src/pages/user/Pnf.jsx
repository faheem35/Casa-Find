
import { Link } from "react-router-dom"

const Pnf = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-200/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-pink-200/30 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto">
        {/* 404 Number */}
        <div className="mb-8">
          <h1 className="text-8xl sm:text-9xl lg:text-[12rem] font-black text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text leading-none">
            404
          </h1>
          <div className="relative -mt-4">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 blur-xl"></div>
          </div>
        </div>

        {/* Error Message */}
        <div className="mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">Oops! Page Not Found</h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            The page you're looking for seems to have vanished into thin air. Don't worry, even the best properties
            sometimes get lost in the market!
          </p>
        </div>

        {/* Illustration */}
        <div className="mb-12">
          <div className="relative inline-block">
            <div className="w-48 h-48 sm:w-64 sm:h-64 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl">
              <div className="text-6xl sm:text-8xl text-gray-400">
                <i className="fa-solid fa-house-chimney-crack"></i>
              </div>
            </div>
            {/* Floating Icons */}
            <div className="absolute -top-4 -right-4 w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white animate-bounce">
              <i className="fa-solid fa-question text-xl"></i>
            </div>
            <div className="absolute -bottom-4 -left-4 w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center text-white animate-bounce delay-500">
              <i className="fa-solid fa-exclamation text-lg"></i>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex justify-center items-center mb-12">
          <Link
            to="/"
            className="group bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center space-x-3"
          >
            <i className="fa-solid fa-home text-xl"></i>
            <span>Back to Home</span>
            <i className="fa-solid fa-arrow-right group-hover:translate-x-1 transition-transform"></i>
          </Link>
        </div>

        {/* Footer Message */}
        <div className="mt-12 text-center">
          <p className="text-gray-500 text-sm">Error Code: 404 | Page Not Found | CasaFind Real Estate</p>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-10 left-10 text-blue-200/50 text-4xl animate-pulse">
        <i className="fa-solid fa-home"></i>
      </div>
      <div className="absolute top-20 right-20 text-purple-200/50 text-3xl animate-pulse delay-1000">
        <i className="fa-solid fa-building"></i>
      </div>
      <div className="absolute bottom-20 left-20 text-pink-200/50 text-5xl animate-pulse delay-2000">
        <i className="fa-solid fa-city"></i>
      </div>
      <div className="absolute bottom-10 right-10 text-indigo-200/50 text-3xl animate-pulse delay-500">
        <i className="fa-solid fa-house-user"></i>
      </div>
    </div>
  )
}

export default Pnf
