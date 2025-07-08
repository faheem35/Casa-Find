
  import { useEffect, useState } from "react"
  import { useParams, useNavigate } from "react-router-dom"
  import { getPropertyDetailsAPI } from "../../services/allAPI"
  import SERVER_URL from "../../services/serverURL"

  const PropertyDetails = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [property, setProperty] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
      fetchPropertyDetails()
    }, [])

    const fetchPropertyDetails = async () => {
      setLoading(true)
      const token = sessionStorage.getItem("token")
      if (token) {
        const reqHeader = {
          Authorization: `Bearer ${token}`,
        }
        try {
          const result = await getPropertyDetailsAPI(id, reqHeader)
          if (result.status === 200) {
            setProperty(result.data)
          }
        } catch (err) {
          console.log("Error fetching property details:", err)
          setError("Failed to load property details")
        }
      }
      setLoading(false)
    }

    const formatPrice = (price) => {
      return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0,
      }).format(price)
    }

    const handleContact = (phoneNumber) => {
      window.open(`tel:${phoneNumber}`, "_self")
    }

    const handleWhatsApp = (phoneNumber) => {
      const message = `Hi, I'm interested in your property: ${property?.title}`
      window.open(`https://wa.me/${phoneNumber.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(message)}`, "_blank")
    }

    if (loading) {
      return (
        
          
          <div className="min-h-screen bg-gray-50 pt-20">
            <div className="max-w-6xl mx-auto px-4 py-8">
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="animate-pulse">
                  <div className="h-96 bg-gray-300"></div>
                  <div className="p-8">
                    <div className="h-8 bg-gray-300 rounded mb-4"></div>
                    <div className="h-4 bg-gray-300 rounded mb-2"></div>
                    <div className="h-4 bg-gray-300 rounded w-3/4 mb-4"></div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="h-4 bg-gray-300 rounded"></div>
                      <div className="h-4 bg-gray-300 rounded"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
      
      )
    }

    if (error || !property) {
      return (
        <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
          <div className="text-center">
            <div className="text-gray-400 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Property Not Found</h3>
            <p className="text-gray-600 mb-6">The property you're looking for doesn't exist or has been removed.</p>
            <button
              onClick={() => navigate("/properties")}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Back to Properties
            </button>
          </div>
        </div>
      )
    }

    return (
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="max-w-6xl mx-auto px-4 py-8">
          {/* Back Button */}
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-600 hover:text-gray-900 mb-6 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Properties
          </button>

          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            {/* Property Image */}
            <div className="relative">
              <img
                src={`${SERVER_URL}/uploads/${property?.propertyImg}`}
                alt={property?.title}
                className="w-full h-96 object-cover"
              />
              {/* Status Badge */}
              <div className="absolute top-6 left-6">
                <span
                  className={`px-4 py-2 rounded-full text-sm font-semibold ${
                    property.status === "For Sale" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"
                  }`}
                >
                  {property.status}
                </span>
              </div>
              {/* Property Type */}
              <div className="absolute top-6 right-6">
                <span className="bg-black bg-opacity-70 text-white px-3 py-2 rounded-lg text-sm font-medium">
                  {property.type}
                </span>
              </div>
            </div>

            {/* Property Details */}
            <div className="p-8">
              {/* Header */}
              <div className="mb-8">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{property.title}</h1>
                <div className="flex items-center text-gray-600 mb-4">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                  <span className="text-lg">
                    {property.address}, {property.city}, {property.state}, {property.country}
                  </span>
                </div>
                <div className="text-3xl md:text-4xl font-bold text-blue-600">
                  {formatPrice(property.price)}
                  {property.status === "For Rent" && <span className="text-lg text-gray-500">/month</span>}
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2">
                  {/* Description */}
                  <div className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">Description</h2>
                    <p className="text-gray-700 leading-relaxed text-lg">{property.description}</p>
                  </div>

                  {/* Property Features */}
                  {(property.bedroom || property.bathroom || property.squareFeet) && (
                    <div className="mb-8">
                      <h2 className="text-2xl font-semibold text-gray-900 mb-4">Property Features</h2>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {property.bedroom && (
                          <div className="bg-gray-50 p-4 rounded-lg text-center">
                            <div className="text-2xl mb-2">🛏️</div>
                            <div className="text-xl font-semibold text-gray-900">{property.bedroom}</div>
                            <div className="text-gray-600">Bedrooms</div>
                          </div>
                        )}
                        {property.bathroom && (
                          <div className="bg-gray-50 p-4 rounded-lg text-center">
                            <div className="text-2xl mb-2">🚿</div>
                            <div className="text-xl font-semibold text-gray-900">{property.bathroom}</div>
                            <div className="text-gray-600">Bathrooms</div>
                          </div>
                        )}
                        {property.squareFeet && (
                          <div className="bg-gray-50 p-4 rounded-lg text-center">
                            <div className="text-2xl mb-2">📐</div>
                            <div className="text-xl font-semibold text-gray-900">{property.squareFeet}</div>
                            <div className="text-gray-600">Square Feet</div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Property Details */}
                  <div className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">Property Details</h2>
                    <div className="bg-gray-50 rounded-lg p-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex justify-between py-2 border-b border-gray-200">
                          <span className="text-gray-600">Property Type</span>
                          <span className="font-semibold text-gray-900">{property.type}</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-gray-200">
                          <span className="text-gray-600">Status</span>
                          <span className="font-semibold text-gray-900">{property.status}</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-gray-200">
                          <span className="text-gray-600">City</span>
                          <span className="font-semibold text-gray-900">{property.city}</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-gray-200">
                          <span className="text-gray-600">State</span>
                          <span className="font-semibold text-gray-900">{property.state}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sidebar */}
                <div className="lg:col-span-1">
                  {/* Contact Card */}
                  <div className="bg-blue-50 rounded-lg p-6 sticky top-8">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Contact Agent</h3>
                    <div className="text-center mb-6">
                      <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
                        <span className="text-white text-xl font-bold">
                          {property.contactName?.charAt(0)?.toUpperCase()}
                        </span>
                      </div>
                      <h4 className="text-lg font-semibold text-gray-900">{property.contactName}</h4>
                      <p className="text-gray-600">Property Agent</p>
                    </div>

                    <div className="space-y-3">
                      <button
                        onClick={() => handleContact(property.contactNumber)}
                        className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
                      >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                          />
                        </svg>
                        Call Now
                      </button>

                      <button
                        onClick={() => handleWhatsApp(property.contactNumber)}
                        className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center"
                      >
                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                        </svg>
                        WhatsApp
                      </button>

                      <div className="text-center pt-2">
                        <p className="text-gray-600 text-sm">{property.contactNumber}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  export default PropertyDetails
