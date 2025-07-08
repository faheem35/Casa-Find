
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import {
  allPropertyAPI,
  addBookmarkAPI,
  removeBookmarkAPI,
  getBookmarksAPI,
} from "../../services/allAPI"
import SERVER_URL from "../../services/serverURL"
import Header from "../../components/user/Header"

const Properties = () => {
  const [searchKey, setSearchKey] = useState("")
  const [allProperties, setAllProperties] = useState([])
  const [bookmarkedIds, setBookmarkedIds] = useState([])
  const [loading, setLoading] = useState(true)
  const [bookmarkLoading, setBookmarkLoading] = useState({})
  const navigate = useNavigate()

  useEffect(() => {
    getAllProperties()
    getUserBookmarks()
  }, [searchKey])

  const getAllProperties = async () => {
    setLoading(true)
    const token = sessionStorage.getItem("token")
    if (token) {
      const reqHeader = { Authorization: `Bearer ${token}` }
      try {
        const result = await allPropertyAPI(searchKey, reqHeader)
        if (result.status === 200) {
          setAllProperties(result.data)
        }
      } catch (err) {
        console.log(err)
      }
    }
    setLoading(false)
  }

  const getUserBookmarks = async () => {
    const token = sessionStorage.getItem("token")
    const reqHeader = { Authorization: `Bearer ${token}` }
    if (token) {
      try {
        const result = await getBookmarksAPI(reqHeader)
        if (result.status === 200) {
          setBookmarkedIds(result.data.map((p) => p._id))
        }
      } catch (err) {
        console.log("Failed to fetch bookmarks", err)
      }
    }
  }

  const goToDetails = (propertyId) => {
    navigate(`/property/${propertyId}`)
  }

  const toggleBookmark = async (propertyId) => {
    const token = sessionStorage.getItem("token")
    if (!token) return alert("Please login to bookmark")

    setBookmarkLoading((prev) => ({ ...prev, [propertyId]: true }))
    const reqHeader = { Authorization: `Bearer ${token}` }
    const isBookmarked = bookmarkedIds.includes(propertyId)

    try {
      if (isBookmarked) {
        await removeBookmarkAPI(propertyId, reqHeader)
        setBookmarkedIds((prev) => prev.filter((id) => id !== propertyId))
      } else {
        await addBookmarkAPI(propertyId, reqHeader)
        setBookmarkedIds((prev) => [...prev, propertyId])
      }
    } catch (err) {
      console.log("Bookmark action failed", err)
    }

    setBookmarkLoading((prev) => ({ ...prev, [propertyId]: false }))
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(price)
  }

  const PropertySkeleton = () => (
    <div className="bg-white rounded-xl shadow-md overflow-hidden animate-pulse">
      <div className="h-64 bg-gray-300"></div>
      <div className="p-6">
        <div className="h-4 bg-gray-300 rounded mb-2"></div>
        <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-300 rounded w-1/2"></div>
      </div>
    </div>
  )

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        {/* Header Section */}
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">Discover Properties</h1>
                <p className="text-gray-600 text-lg">
                  Find your perfect home from our collection of {allProperties.length} properties
                </p>
              </div>

              {/* Search Bar */}
              <div className="relative max-w-md w-full">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  onChange={(e) => setSearchKey(e.target.value)}
                  placeholder="Search by city, state or type..."
                  type="text"
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm transition duration-150 ease-in-out"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Properties Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {loading ? (
            <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {[...Array(8)].map((_, index) => (
                <PropertySkeleton key={index} />
              ))}
            </div>
          ) : allProperties.length > 0 ? (
            <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {allProperties.map((property) => (
                // <div
                //   key={property._id}
                //   className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-200 ease-in-out overflow-hidden cursor-pointer transform hover:-translate-y-1 group"
                //   style={{ willChange: "transform" }}
                //   onClick={() => goToDetails(property._id)}
                // >
                <div
  key={property._id}
  className="rounded-xl shadow-md hover:shadow-xl transition-all duration-200 ease-in-out overflow-hidden cursor-pointer transform hover:-translate-y-1 group"
  style={{ willChange: "transform", background: "oklch(93.2% 0.032 255.585)" }}
  onClick={() => goToDetails(property._id)}
>

                  {/* Image */}
                  <div className="relative overflow-hidden">
                    <img
                      loading="lazy"
                      src={`${SERVER_URL}/uploads/${property?.propertyImg}`}
                      alt={property?.title}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-200 ease-in-out"
                    />

                    {/* Status */}
                    <div className="absolute top-4 left-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        property.status === "For Sale" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"
                      }`}>
                        {property.status}
                      </span>
                    </div>

                    {/* Type */}
                    <div className="absolute top-4 right-16">
                      <span className="bg-black bg-opacity-70 text-white px-2 py-1 rounded-md text-xs font-medium">
                        {property.type}
                      </span>
                    </div>

                    {/* Bookmark */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleBookmark(property._id)
                      }}
                      disabled={bookmarkLoading[property._id]}
                      className="absolute top-4 right-4 w-10 h-10 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-md"
                    >
                      {bookmarkLoading[property._id] ? (
                        <div className="animate-spin rounded-full h-3 w-3 border-2 border-t-transparent border-red-500"></div>
                      ) : (
                        <span className="text-xl">{bookmarkedIds.includes(property._id) ? "❤️" : "🤍"}</span>
                      )}
                    </button>
                  </div>

                  {/* Details */}
                  <div className="p-6">
                    <div className="mb-3">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                        {property.title}
                      </h3>
                      <div className="flex items-center text-gray-600 mb-2">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span className="text-sm">{property.city}, {property.state}</span>
                      </div>
                    </div>

                    {/* Features */}
                    {(property.bedroom || property.bathroom || property.squareFeet) && (
                      <div className="flex items-center justify-between text-sm text-gray-600 mb-4 bg-gray-50 rounded-lg p-3">
                        {property.bedroom && <div className="flex items-center"><span className="mr-1">🛏️</span><span>{property.bedroom} Bed</span></div>}
                        {property.bathroom && <div className="flex items-center"><span className="mr-1">🚿</span><span>{property.bathroom} Bath</span></div>}
                        {property.squareFeet && <div className="flex items-center"><span className="mr-1">📐</span><span>{property.squareFeet} sq ft</span></div>}
                      </div>
                    )}

                    {/* Price */}
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-2xl font-bold text-blue-600">
                          {formatPrice(property.price)}
                          {property.status === "For Rent" && <span className="text-sm text-gray-500">/month</span>}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600">{property.contactName}</p>
                        <p className="text-xs text-gray-500">{property.contactNumber}</p>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium">
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="max-w-md mx-auto">
                <svg className="mx-auto h-24 w-24 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H9m0 0H5m0 0h4M9 7h6m-6 4h6m-6 4h6" />
                </svg>
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">No Properties Found</h3>
                <p className="text-gray-600 mb-6">
                  {searchKey
                    ? `No properties match your search "${searchKey}". Try adjusting your search terms.`
                    : "No properties are currently available. Please check back later."}
                </p>
                {searchKey && (
                  <button
                    onClick={() => setSearchKey("")}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
                  >
                    Clear Search
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Back to Top Button */}
        <div className="fixed bottom-8 right-8">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-all duration-200 hover:scale-110"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </button>
        </div>
      </div>
    </>
  )
}

export default Properties
