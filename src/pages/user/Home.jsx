
import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import Header from "../../components/user/Header"
import { allPropertyAPI } from "../../services/allAPI"
import SERVER_URL from "../../services/serverURL"

const Home = () => {
  const [featuredProperties, setFeaturedProperties] = useState([])
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    totalProperties: 200,
    propertiesSold: 850,
    activeUsers: 2400,
    citiesCovered: 45,
  })
  const navigate = useNavigate()

  useEffect(() => {
    getFeaturedProperties()
  }, [])

  const getFeaturedProperties = async () => {
    setLoading(true)
    try {
      const token = sessionStorage.getItem("token")
      const reqHeader = token ? { Authorization: `Bearer ${token}` } : {}
      const result = await allPropertyAPI("", reqHeader)
      if (result.status === 200) {
        setFeaturedProperties(result.data.slice(0, 3))
        setStats((prev) => ({ ...prev, totalProperties: result.data.length }))
      }
    } catch (err) {
      console.log(err)
    }
    setLoading(false)
  }

  // Authentication check functions
  const handleBuyProperties = () => {
    if (sessionStorage.getItem("token")) {
      navigate("/properties")
    } else {
      alert("Please login to browse properties!")
      navigate("/login")
    }
  }

  const handleSellProperties = () => {
    if (sessionStorage.getItem("token")) {
      navigate("/dashboard")
    } else {
      alert("Please login to sell properties!")
      navigate("/login")
    }
  }

  const handlePropertyDetails = (propertyId) => {
    if (sessionStorage.getItem("token")) {
      navigate(`/property/${propertyId}`)
    } else {
      alert("Please login to view property details!")
      navigate("/login")
    }
  }

  const handleExploreAllProperties = () => {
    if (sessionStorage.getItem("token")) {
      navigate("/properties")
    } else {
      alert("Please login to explore all properties!")
      navigate("/login")
    }
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(price)
  }

  const PropertyCard = ({ property }) => (
    <div
      // className="group bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden cursor-pointer transform hover:-translate-y-3 border border-gray-100"
      className="group rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden cursor-pointer transform hover:-translate-y-3 border border-gray-100"
style={{ background: "oklch(93.2% 0.032 255.585)" }}

      onClick={() => handlePropertyDetails(property._id)}
    >
      <div className="relative overflow-hidden">
        <img
          src={`${SERVER_URL}/uploads/${property?.propertyImg}`}
          alt={property?.title}
          className="w-full h-72 object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="absolute top-6 left-6">
          <span
            className={`px-4 py-2 rounded-full text-sm font-bold backdrop-blur-md ${
              property.status === "For Sale" ? "bg-emerald-500/90 text-white" : "bg-blue-500/90 text-white"
            }`}
          >
            {property.status}
          </span>
        </div>
        <div className="absolute top-6 right-6">
          <span className="bg-white/90 backdrop-blur-md text-gray-800 px-3 py-2 rounded-full text-sm font-semibold">
            {property.type}
          </span>
        </div>
        <div className="absolute bottom-6 left-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button className="w-full bg-white/90 backdrop-blur-md text-gray-800 py-3 rounded-xl font-semibold hover:bg-white transition-colors">
            View Details
          </button>
        </div>
      </div>
      <div className="p-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
          {property.title}
        </h3>
        <div className="flex items-center text-gray-600 mb-4">
          <i className="fa-solid fa-location-dot mr-3 text-blue-500 text-lg"></i>
          <span className="text-base">
            {property.city}, {property.state}
          </span>
        </div>
        <div className="flex items-center justify-between mb-4">
          <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {formatPrice(property.price)}
          </div>
          <div className="flex items-center space-x-4 text-gray-600">
            {property.bedroom && (
              <div className="flex items-center bg-gray-100 px-3 py-1 rounded-full">
                <i className="fa-solid fa-bed mr-2 text-blue-500"></i>
                <span className="font-medium">{property.bedroom}</span>
              </div>
            )}
            {property.bathroom && (
              <div className="flex items-center bg-gray-100 px-3 py-1 rounded-full">
                <i className="fa-solid fa-bath mr-2 text-blue-500"></i>
                <span className="font-medium">{property.bathroom}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900"></div>
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transform rotate-12"></div>
          <div className="absolute inset-0 bg-gradient-to-l from-transparent via-white/5 to-transparent transform -rotate-12"></div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-pink-500/20 rounded-full blur-3xl animate-pulse delay-2000"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <div className="mb-8">
            <h1 className="text-5xl sm:text-6xl lg:text-8xl font-black mb-8 leading-tight">
              <span className="block">Your Dream</span>
              <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Property Awaits
              </span>
            </h1>
            <p className="text-xl lg:text-2xl text-blue-100 mb-12 max-w-4xl mx-auto leading-relaxed">
              Whether you're buying your first home, selling a property or  your next perfect place, CasaFind connects
              you with premium properties and trusted opportunities worldwide.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <button
              onClick={handleBuyProperties}
              className="group bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-10 py-5 rounded-2xl font-bold text-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl flex items-center space-x-3"
            >
              <i className="fa-solid fa-home text-2xl"></i>
              <span>Buy Properties</span>
              <i className="fa-solid fa-arrow-right group-hover:translate-x-1 transition-transform"></i>
            </button>
            <button
              onClick={handleSellProperties}
              className="group border-2 border-white/30 bg-white/10 backdrop-blur-md text-white hover:bg-white hover:text-gray-900 px-10 py-5 rounded-2xl font-bold text-xl transition-all duration-300 transform hover:scale-105 flex items-center space-x-3"
            >
              <i className="fa-solid fa-plus text-2xl"></i>
              <span>Sell Properties</span>
              <i className="fa-solid fa-arrow-right group-hover:translate-x-1 transition-transform"></i>
            </button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="text-5xl lg:text-6xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
                  {stats.totalProperties}+
                </div>
                <div className="text-gray-700 font-bold text-lg">Properties Available</div>
              </div>
            </div>
            <div className="text-center group">
              <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="text-5xl lg:text-6xl font-black bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent mb-4">
                  {stats.propertiesSold}+
                </div>
                <div className="text-gray-700 font-bold text-lg">Properties Sold</div>
              </div>
            </div>
            <div className="text-center group">
              <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="text-5xl lg:text-6xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
                  {stats.activeUsers}+
                </div>
                <div className="text-gray-700 font-bold text-lg">Active Users</div>
              </div>
            </div>
            <div className="text-center group">
              <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="text-5xl lg:text-6xl font-black bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-4">
                  {stats.citiesCovered}+
                </div>
                <div className="text-gray-700 font-bold text-lg">Cities Covered</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl lg:text-6xl font-black text-gray-900 mb-6">
              Complete Real Estate
              <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Solutions
              </span>
            </h2>
            <p className="text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              From buying to selling, we provide end-to-end real estate services with cutting-edge technology
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
            {/* Buy Properties */}
            <div className="group bg-gradient-to-br from-blue-50 to-indigo-100 rounded-3xl p-12 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 h-full flex flex-col justify-between">
              <div>
                <div className="flex items-center mb-8">
                  <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mr-6">
                    <i className="fa-solid fa-home text-white text-3xl"></i>
                  </div>
                  <h3 className="text-4xl font-black text-gray-900">Buy Properties</h3>
                </div>
                <p className="text-xl text-gray-700 mb-8 leading-relaxed text-justify">
                  Discover your perfect home from our extensive collection of verified properties. Advanced search
                  filters and expert guidance make buying effortless.
                </p>
                <div className="space-y-4 mb-8">
                  <div className="flex items-center text-gray-700">
                    <i className="fa-solid fa-check-circle text-blue-500 mr-4 text-xl"></i>
                    <span className="text-lg">Verified property listings</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <i className="fa-solid fa-check-circle text-blue-500 mr-4 text-xl"></i>
                    <span className="text-lg">Virtual property tours</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <i className="fa-solid fa-check-circle text-blue-500 mr-4 text-xl"></i>
                    <span className="text-lg">Expert market insights</span>
                  </div>
                </div>
              </div>
              <button
                onClick={handleBuyProperties}
                className="inline-flex items-center space-x-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105"
              >
                <span>Start Buying</span>
                <i className="fa-solid fa-arrow-right"></i>
              </button>
            </div>

            {/* Sell Properties */}
            <div className="group bg-gradient-to-br from-purple-50 to-pink-100 rounded-3xl p-12 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 h-full flex flex-col justify-between">
              <div>
                <div className="flex items-center mb-8">
                  <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mr-6">
                    <i className="fa-solid fa-plus text-white text-3xl"></i>
                  </div>
                  <h3 className="text-4xl font-black text-gray-900">Sell Properties</h3>
                </div>
                <p className="text-xl text-gray-700 mb-8 leading-relaxed text-justify">
                  List your property and reach thousands of potential buyers. Professional photography, marketing
                  support, and transparent pricing maximize your returns.
                </p>
                <div className="space-y-4 mb-8">
                  <div className="flex items-center text-gray-700">
                    <i className="fa-solid fa-check-circle text-purple-500 mr-4 text-xl"></i>
                    <span className="text-lg">Professional photography</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <i className="fa-solid fa-check-circle text-purple-500 mr-4 text-xl"></i>
                    <span className="text-lg">Marketing & promotion</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <i className="fa-solid fa-check-circle text-purple-500 mr-4 text-xl"></i>
                    <span className="text-lg">Transparent pricing</span>
                  </div>
                </div>
              </div>
              <button
                onClick={handleSellProperties}
                className="inline-flex items-center space-x-3 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105"
              >
                <span>Start Selling</span>
                <i className="fa-solid fa-arrow-right"></i>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Properties Section */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl lg:text-6xl font-black text-gray-900 mb-6">
              Featured
              <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Properties
              </span>
            </h2>
            <p className="text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Handpicked premium properties that offer exceptional value and luxury living experiences
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {[...Array(3)].map((_, index) => (
                <div key={index} className="bg-white rounded-3xl shadow-xl overflow-hidden animate-pulse">
                  <div className="h-72 bg-gray-300"></div>
                  <div className="p-8">
                    <div className="h-6 bg-gray-300 rounded mb-4"></div>
                    <div className="h-4 bg-gray-300 rounded w-3/4 mb-4"></div>
                    <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-16">
                {featuredProperties.map((property) => (
                  <PropertyCard key={property._id} property={property} />
                ))}
              </div>
              <div className="text-center">
                <button
                  onClick={handleExploreAllProperties}
                  className="inline-flex items-center space-x-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-12 py-6 rounded-2xl font-bold text-xl transition-all duration-300 transform hover:scale-105 shadow-2xl"
                >
                  <span>Explore All Properties</span>
                  <i className="fa-solid fa-arrow-right text-2xl"></i>
                </button>
              </div>
            </>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 left-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
        </div>
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-5xl lg:text-6xl font-black mb-8 leading-tight">
            Ready to Make Your
            <span className="block">Real Estate Move?</span>
          </h2>
          <p className="text-2xl mb-12 opacity-90 leading-relaxed">
            Join thousands of satisfied customers who found their perfect properties or sold at the best prices with
            CasaFind
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            {sessionStorage.getItem("token") ? (
              <Link
                to="/dashboard"
                className="bg-white text-gray-900 hover:bg-gray-100 px-12 py-6 rounded-2xl font-bold text-xl transition-all duration-300 transform hover:scale-105 shadow-2xl"
              >
                Manage Your Properties
              </Link>
            ) : (
              <Link
                to="/register"
                className="bg-white text-gray-900 hover:bg-gray-100 px-12 py-6 rounded-2xl font-bold text-xl transition-all duration-300 transform hover:scale-105 shadow-2xl"
              >
                Get Started Free
              </Link>
            )}
            <button
              onClick={handleExploreAllProperties}
              className="border-2 border-white/30 bg-white/10 backdrop-blur-md text-white hover:bg-white hover:text-gray-900 px-12 py-6 rounded-2xl font-bold text-xl transition-all duration-300 transform hover:scale-105"
            >
              Browse Properties
            </button>
          </div>
        </div>
      </section>

      <style >{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  )
}

export default Home
