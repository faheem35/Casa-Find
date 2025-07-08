
import { useState, useEffect } from "react"
import View from "../../components/user/View"
import Header from "../../components/user/Header"

const Dashboard = () => {
  const [username, setUsername] = useState("")

  useEffect(() => {
    // Get user data from sessionStorage
    const userData = sessionStorage.getItem("user")
    if (userData) {
      try {
        const user = JSON.parse(userData)
        setUsername(user.username || "User")
      } catch (error) {
        console.log("Error parsing user data:", error)
        setUsername("User")
      }
    }
  }, [])

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        {/* Header Section */}
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <i className="fa-solid fa-user text-white text-xl"></i>
                </div>
                <div>
                  <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Welcome back, {username}! 👋</h1>
                  <p className="text-gray-600">Ready to manage your properties today?</p>
                </div>
              </div>
              
            </div>
          </div>
        </div>

        {/* Content */}
        {/* Main Content Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" >
          {/* Properties Section - Full Width */}
          <div className="space-y-6" >
            <View />
          </div>
        </div>
      </div>
    </>
  )
}

export default Dashboard
