
import { useEffect, useState } from "react"
import { getUserBookmarksAPI, removeBookmarkAPI } from "../../services/allAPI"
import SERVER_URL from "../../services/serverURL"
import { useNavigate } from "react-router-dom"
import Header from "../../components/user/Header"

const BookmarkedProperties = () => {
  const [bookmarks, setBookmarks] = useState([])
  const [loading, setLoading] = useState(true)
  const [removingId, setRemovingId] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    fetchBookmarks()
  }, [])

  const fetchBookmarks = async () => {
    setLoading(true)
    const token = sessionStorage.getItem("token")
    if (token) {
      const reqHeader = { Authorization: `Bearer ${token}` }
      try {
        const res = await getUserBookmarksAPI(reqHeader)
        if (res.status === 200) {
          setBookmarks(res.data)
        }
      } catch (err) {
        console.log("Failed to fetch bookmarks", err)
      }
    }
    setLoading(false)
  }

  const handleRemoveBookmark = async (propertyId, e) => {
    e.stopPropagation()
    const token = sessionStorage.getItem("token")
    if (!token) return

    setRemovingId(propertyId)
    const reqHeader = { Authorization: `Bearer ${token}` }

    try {
      await removeBookmarkAPI(propertyId, reqHeader)
      setBookmarks((prev) => prev.filter((property) => property._id !== propertyId))
    } catch (err) {
      console.log("Failed to remove bookmark", err)
    }
    setRemovingId(null)
  }

 const formatPrice = (price) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(price)
}


  const LoadingSkeleton = () => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden animate-pulse">
      <div className="h-48 bg-gray-300"></div>
      <div className="p-4">
        <div className="h-4 bg-gray-300 rounded mb-2"></div>
        <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-300 rounded w-1/2"></div>
      </div>
    </div>
  )

  return (
    <>
    <Header/>
      <div className="min-h-screen bg-gray-50">
        {/* Header Section */}
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">My Bookmarks</h1>
                <p className="text-gray-600 text-lg">
                  {bookmarks.length > 0
                    ? `You have ${bookmarks.length} bookmarked ${bookmarks.length === 1 ? "property" : "properties"}`
                    : "Your saved properties will appear here"}
                </p>
              </div>
              <div className="hidden sm:block">
                <button
                  onClick={() => navigate("/properties")}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Browse Properties
                </button>
              </div>
            </div>
          </div>
        </div>
  
        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" >
              {[...Array(8)].map((_, index) => (
                <LoadingSkeleton key={index} />
              ))}
            </div>
          ) : bookmarks.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" >
              {bookmarks.map((property) => (
                <div
                  key={property._id}
                  className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-300 cursor-pointer group "
                  style={{ willChange: "transform", background: "oklch(93.2% 0.032 255.585)" }}
                  onClick={() => navigate(`/property/${property._id}`)}
                >
                  {/* Property Image */}
                  <div className="relative overflow-hidden">
                    <img
                      src={`${SERVER_URL}/uploads/${property?.propertyImg}`}
                      alt={property?.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
  
                    {/* Status Badge */}
                    <div className="absolute top-3 left-3">
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded ${
                          property.status === "For Sale" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {property.status}
                      </span>
                    </div>
  
                    {/* Remove Bookmark Button */}
                    <button
                      onClick={(e) => handleRemoveBookmark(property._id, e)}
                      disabled={removingId === property._id}
                      className="absolute top-3 right-3 w-8 h-8 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-sm"
                    >
                      {removingId === property._id ? (
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-500"></div>
                      ) : (
                        <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </button>
  
                    {/* Property Type Badge */}
                    {property.type && (
                      <div className="absolute bottom-3 left-3">
                        <span className="bg-black bg-opacity-70 text-white px-2 py-1 rounded text-xs font-medium">
                          {property.type}
                        </span>
                      </div>
                    )}
                  </div>
  
                  {/* Property Details */}
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                      {property.title}
                    </h3>
  
                    <div className="flex items-center text-gray-600 mb-3">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      <span className="text-sm">
                        {property.city}, {property.state}
                      </span>
                    </div>
  
                    {/* Property Features */}
                    {(property.bedroom || property.bathroom || property.squareFeet) && (
                      <div className="flex items-center justify-between text-xs text-gray-600 mb-3 bg-gray-50 rounded p-2">
                        {property.bedroom && (
                          <div className="flex items-center">
                            <span className="mr-1">🛏️</span>
                            <span>{property.bedroom}</span>
                          </div>
                        )}
                        {property.bathroom && (
                          <div className="flex items-center">
                            <span className="mr-1">🚿</span>
                            <span>{property.bathroom}</span>
                          </div>
                        )}
                        {property.squareFeet && (
                          <div className="flex items-center">
                            <span className="mr-1">📐</span>
                            <span>{property.squareFeet} sq ft</span>
                          </div>
                        )}
                      </div>
                    )}
  
                    {/* Price and Contact */}
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xl font-bold text-blue-600">
                          {formatPrice(property.price)}
                          {property.status === "For Rent" && <span className="text-sm text-gray-500">/month</span>}
                        </p>
                      </div>
                      {property.contactName && (
                        <div className="text-right">
                          <p className="text-xs text-gray-600">{property.contactName}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="max-w-md mx-auto">
                <div className="text-gray-400 mb-6">
                  <svg className="w-24 h-24 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">No Bookmarked Properties</h3>
                <p className="text-gray-600 mb-8">
                  You haven't bookmarked any properties yet. Start exploring and save your favorite properties to see them
                  here.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={() => navigate("/properties")}
                    className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    Browse Properties
                  </button>
                  <button
                    onClick={() => navigate("/")}
                    className="bg-gray-100 text-gray-700 px-8 py-3 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                  >
                    Go to Home
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
  
        {/* Mobile Browse Button */}
        <div className="sm:hidden fixed bottom-6 right-6">
          <button
            onClick={() => navigate("/properties")}
            className="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-all duration-200 hover:scale-110"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </button>
        </div>
      </div>
    </>
  )
}

export default BookmarkedProperties
