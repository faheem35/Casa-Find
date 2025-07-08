
import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { allPropertyAPI, adminRemovePropertyAPI } from "../../services/allAPI"
import SERVER_URL from "../../services/serverURL"
import Edit from "../../components/user/Edit"
import { Trash2, Search, MapPin, Bed, Bath, Square, X } from "lucide-react"
import { editPropertyResponseContext } from "../../contexts/ContextAPI"

const ManageProperties = () => {
  const [allProperties, setAllProperties] = useState([])
  const [filteredProperties, setFilteredProperties] = useState([])
  const [searchKey, setSearchKey] = useState("")
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  const { editPropertyResponse } = useContext(editPropertyResponseContext)

  useEffect(() => {
    fetchAllProperties()
  }, [editPropertyResponse])

  useEffect(() => {
    if (searchKey.trim() === "") {
      setFilteredProperties(allProperties)
    } else {
      const key = searchKey.toLowerCase()
      const filtered = allProperties.filter(
        (property) =>
          property.title?.toLowerCase().includes(key) ||
          property.city?.toLowerCase().includes(key) ||
          property.state?.toLowerCase().includes(key),
      )
      setFilteredProperties(filtered)
    }
  }, [searchKey, allProperties])

  const fetchAllProperties = async () => {
    const token = sessionStorage.getItem("token")
    const reqHeader = { Authorization: `Bearer ${token}` }
    try {
      const result = await allPropertyAPI("", reqHeader)
      if (result.status === 200) {
        setAllProperties(result.data)
        setFilteredProperties(result.data)
      }
    } catch (err) {
      console.log("Failed to fetch admin properties", err)
    }
    setLoading(false)
  }

  const deleteProperty = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this property?")
    if (!confirmDelete) return

    const token = sessionStorage.getItem("token")
    const reqHeader = { Authorization: `Bearer ${token}` }
    try {
      const result = await adminRemovePropertyAPI(id, reqHeader)
      if (result.status === 200) {
        fetchAllProperties()
      }
    } catch (error) {
      console.error("Admin delete error:", error)
    }
  }

  const goToDetails = (propertyId) => {
    navigate(`/property/${propertyId}`)
  }

  const formatPrice = (price) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(price)

  const clearSearch = () => {
    setSearchKey("")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header Section */}
      <div className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">Property Management</h1>
              <p className="text-gray-600 text-lg">Manage all user uploaded properties</p>
            </div>

            {/* Enhanced Search Bar */}
            <div className="relative w-full max-w-md">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchKey}
                onChange={(e) => setSearchKey(e.target.value)}
                placeholder="Search by title, city or state..."
                className="w-full pl-12 pr-12 py-3 border border-gray-200 rounded-2xl shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-700 placeholder-gray-400"
              />
              {searchKey && (
                <button
                  onClick={clearSearch}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mb-4"></div>
            <p className="text-gray-600 text-lg font-medium">Loading properties...</p>
          </div>
        ) : filteredProperties.length > 0 ? (
          <>
            {/* Results Count */}
            <div className="mb-6">
              <p className="text-gray-600">
                Showing <span className="font-semibold text-gray-900">{filteredProperties.length}</span>
                {searchKey ? ` result${filteredProperties.length !== 1 ? "s" : ""} for "${searchKey}"` : " properties"}
              </p>
            </div>

            {/* Properties Grid */}
            <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredProperties.map((property) => (
                <div
                  key={property._id}
                  className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-gray-200 relative"
                >
                  {/* Property Image */}
                  <div onClick={() => goToDetails(property._id)} className="cursor-pointer relative overflow-hidden">
                    <img
                      src={`${SERVER_URL}/uploads/${property.propertyImg}`}
                      alt={property.title}
                      className="w-full h-48 sm:h-52 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                    {/* Status Badge */}
                    <div className="absolute top-3 left-3">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          property.status === "For Sale" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {property.status}
                      </span>
                    </div>
                  </div>

                  {/* Property Details */}
                  <div className="p-5">
                    <div onClick={() => goToDetails(property._id)} className="cursor-pointer">
                      <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                        {property.title}
                      </h3>

                      <div className="flex items-center text-gray-600 mb-3">
                        <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
                        <span className="text-sm truncate">
                          {property.city}, {property.state}
                        </span>
                      </div>

                      {/* Property Features */}
                      <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                        {property.bedroom && (
                          <div className="flex items-center">
                            <Bed className="h-4 w-4 mr-1" />
                            <span>{property.bedroom}</span>
                          </div>
                        )}
                        {property.bathroom && (
                          <div className="flex items-center">
                            <Bath className="h-4 w-4 mr-1" />
                            <span>{property.bathroom}</span>
                          </div>
                        )}
                        {property.squareFeet && (
                          <div className="flex items-center">
                            <Square className="h-4 w-4 mr-1" />
                            <span>{property.squareFeet} ft²</span>
                          </div>
                        )}
                      </div>

                      {/* Price */}
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-2xl font-bold text-gray-900">{formatPrice(property.price)}</span>
                          {property.status === "For Rent" && <span className="text-sm text-gray-500 ml-1">/month</span>}
                        </div>
                      </div>
                    </div>
                    {/* Action Buttons - Bottom of Card */}
                    <div className="flex items-center justify-between pt-4 mt-4 border-t border-gray-100">
                      <div className="flex items-center space-x-3">
                        <Edit property={property} refresh={fetchAllProperties} />
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            deleteProperty(property._id)
                          }}
                          className="flex items-center px-3 py-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors duration-200 text-sm font-medium"
                          title="Delete Property"
                        >
                          <Trash2 className="w-4 h-4 mr-1" />
                          Delete
                        </button>
                      </div>
                      <button
                        onClick={() => goToDetails(property._id)}
                        className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-20">
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                <Search className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {searchKey ? "No properties found" : "No properties available"}
              </h3>
              <p className="text-gray-600 mb-6">
                {searchKey
                  ? `No properties match your search for "${searchKey}". Try adjusting your search terms.`
                  : "There are no properties to display at the moment."}
              </p>
              {searchKey && (
                <button
                  onClick={clearSearch}
                  className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                >
                  <X className="w-4 h-4 mr-2" />
                  Clear Search
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ManageProperties
