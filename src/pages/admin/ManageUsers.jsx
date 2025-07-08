
import { useEffect, useState } from "react"
import { userlistAPI, usereditAPI } from "../../services/allAPI"
import { PersonFillGear, CheckCircleFill, XCircleFill, ArrowClockwise, PersonSlash } from "react-bootstrap-icons"

const ManageUsers = () => {
  const [users, setUsers] = useState([])
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(true)
  const [processingUser, setProcessingUser] = useState(null)

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    setLoading(true)
    try {
      const response = await userlistAPI()
      if (response?.data?.allUsers) {
        setUsers(response.data.allUsers)
        setError("")
      } else {
        setError("No users found")
      }
    } catch (err) {
      console.error("Error fetching users:", err)
      setError("Failed to fetch users")
    } finally {
      setLoading(false)
    }
  }

  const handleUserStatusChange = async (userId, currentStatus) => {
    setProcessingUser(userId)
    const newStatus = currentStatus === "inactive" ? "active" : "inactive"
    
    try {
      await usereditAPI(userId, { status: newStatus })
      setUsers((prevUsers) => prevUsers.map((user) => (user._id === userId ? { ...user, status: newStatus } : user)))
    } catch (error) {
      console.error("Error updating user status:", error)
      setError("Failed to update user status")
    } finally {
      setProcessingUser(null)
    }
  }

  const getStatusBadge = (status) => {
    const safeStatus = status || "unknown"
    return (
      <span
        className={`inline-flex items-center px-2 py-1 rounded-full text-xs sm:text-sm font-medium ${
          safeStatus === "active"
            ? "bg-green-100 text-green-700"
            : safeStatus === "inactive"
              ? "bg-red-100 text-red-700"
              : "bg-gray-100 text-gray-700"
        }`}
      >
        {safeStatus === "active" ? (
          <CheckCircleFill className="mr-1" size={12} />
        ) : safeStatus === "inactive" ? (
          <XCircleFill className="mr-1" size={12} />
        ) : (
          <XCircleFill className="mr-1" size={12} />
        )}
        <span className="hidden sm:inline">{safeStatus.charAt(0).toUpperCase() + safeStatus.slice(1)}</span>
        <span className="sm:hidden">{safeStatus === "active" ? "A" : safeStatus === "inactive" ? "I" : "U"}</span>
      </span>
    )
  }

  return (
    <div className="px-2 sm:px-4 py-4 sm:py-6 max-w-7xl mx-auto">
      <div className="bg-white shadow-sm sm:shadow rounded-lg overflow-hidden">
        {/* Header */}
        <div className="bg-[#2c3e50] text-white px-3 sm:px-6 py-3 sm:py-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0">
            <h2 className="flex items-center text-base sm:text-lg font-semibold">
              <PersonFillGear className="mr-2" size={20} />
              <span className="hidden sm:inline">User Management</span>
              <span className="sm:hidden">Users</span>
            </h2>
            <button
              onClick={fetchUsers}
              disabled={loading}
              className="bg-white text-[#2c3e50] hover:bg-gray-100 disabled:opacity-50 px-3 py-1.5 text-xs sm:text-sm rounded flex items-center transition-colors"
            >
              <ArrowClockwise className="mr-1" size={14} />
              Refresh
            </button>
          </div>
        </div>

        {/* Error Message */}
        {error && <div className="bg-red-100 text-red-700 px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm">{error}</div>}

        {/* Loading State */}
        {loading ? (
          <div className="text-center py-8 sm:py-10">
            <div className="w-6 h-6 border-4 border-blue-500 border-dashed rounded-full animate-spin mx-auto mb-2"></div>
            <p className="text-gray-500 text-sm">Loading users...</p>
          </div>
        ) : users.length > 0 ? (
          <>
            {/* Desktop Table View */}
            <div className="hidden lg:block overflow-x-auto">
              <table className="min-w-full text-sm text-left">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-6 py-3 font-semibold">#</th>
                    <th className="px-6 py-3 font-semibold">User Name</th>
                    <th className="px-6 py-3 font-semibold">Email</th>
                    <th className="px-6 py-3 font-semibold">Status</th>
                    <th className="px-6 py-3 font-semibold text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {users.map((user, index) => {
                    const status = user.status || "unknown"
                    return (
                      <tr key={user._id} className="hover:bg-gray-50">
                        <td className="px-6 py-3">{index + 1}</td>
                        <td className="px-6 py-3 font-medium">{user.username}</td>
                        <td className="px-6 py-3 text-blue-600">{user.email}</td>
                        <td className="px-6 py-3">{getStatusBadge(status)}</td>
                        <td className="px-6 py-3 text-center">
                          <button
                            onClick={() => handleUserStatusChange(user._id, status)}
                            disabled={processingUser === user._id}
                            className={`px-3 py-1.5 rounded text-sm flex items-center justify-center gap-1 w-[110px] mx-auto transition-colors ${
                              status === "inactive"
                                ? "border border-green-500 text-green-700 hover:bg-green-50"
                                : "border border-red-500 text-red-700 hover:bg-red-50"
                            } ${processingUser === user._id ? "opacity-50 cursor-not-allowed" : ""}`}
                          >
                            {processingUser === user._id ? (
                              <>
                                <div className="w-4 h-4 border-2 border-gray-500 border-dashed rounded-full animate-spin"></div>
                                <span className="ml-1">Processing...</span>
                              </>
                            ) : status === "inactive" ? (
                              <>
                                <CheckCircleFill size={14} /> Unblock
                              </>
                            ) : (
                              <>
                                <PersonSlash size={14} /> Block
                              </>
                            )}
                          </button>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>

            {/* Mobile/Tablet Card View */}
            <div className="lg:hidden">
              <div className="divide-y">
                {users.map((user, index) => {
                  const status = user.status || "unknown"
                  return (
                    <div key={user._id} className="p-4 hover:bg-gray-50">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs text-gray-500 font-medium">#{index + 1}</span>
                            <h3 className="text-sm font-semibold text-gray-900 truncate">{user.username}</h3>
                          </div>
                          <p className="text-xs sm:text-sm text-blue-600 truncate mb-2">{user.email}</p>
                          <div className="flex items-center justify-between">
                            <div>{getStatusBadge(status)}</div>
                            <button
                              onClick={() => handleUserStatusChange(user._id, status)}
                              disabled={processingUser === user._id}
                              className={`px-3 py-1.5 rounded text-xs sm:text-sm flex items-center gap-1 transition-colors ${
                                status === "inactive"
                                  ? "border border-green-500 text-green-700 hover:bg-green-50"
                                  : "border border-red-500 text-red-700 hover:bg-red-50"
                              } ${processingUser === user._id ? "opacity-50 cursor-not-allowed" : ""}`}
                            >
                              {processingUser === user._id ? (
                                <>
                                  <div className="w-3 h-3 border-2 border-gray-500 border-dashed rounded-full animate-spin"></div>
                                  <span className="hidden sm:inline">Processing...</span>
                                </>
                              ) : status === "inactive" ? (
                                <>
                                  <CheckCircleFill size={12} />
                                  <span className="hidden sm:inline">Unblock</span>
                                </>
                              ) : (
                                <>
                                  <PersonSlash size={12} />
                                  <span className="hidden sm:inline">Block</span>
                                </>
                              )}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </>
        ) : (
          <div className="px-3 sm:px-4 py-3 text-blue-700 bg-blue-100 text-xs sm:text-sm">
            No users found. Try refreshing the page.
          </div>
        )}

        {/* Footer Stats */}
        <div className="bg-gray-50 text-xs sm:text-sm text-gray-600 px-3 sm:px-6 py-3 sm:py-4">
          <div className="flex flex-col sm:flex-row justify-between gap-2 sm:gap-0">
            <div>
              Total Users: <span className="font-semibold">{users.length}</span>
            </div>
            <div className="flex gap-4">
              <span>
                Active:{" "}
                <span className="font-semibold text-green-600">
                  {users.filter((user) => user.status === "active").length}
                </span>
              </span>
              <span>
                Inactive:{" "}
                <span className="font-semibold text-red-600">
                  {users.filter((user) => user.status === "inactive").length}
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ManageUsers
