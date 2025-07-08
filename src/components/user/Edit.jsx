
import { useContext, useEffect, useState } from "react"
import SERVER_URL from "../../services/serverURL"
import { updatePropertyAPI } from "../../services/allAPI"
import { editPropertyResponseContext } from "../../contexts/ContextAPI"
import { Edit3, X, Upload, MapPin, Home, User, Phone, Bed, Bath, Square } from "lucide-react"

const Edit = ({ property }) => {
  const { setEditPropertyResponse } = useContext(editPropertyResponseContext)
  const [preview, setPreview] = useState("")
  const [imageFileStatus, setImageFileStatus] = useState(false)
  const [propertyDetails, setPropertyDetails] = useState({
    id: property._id,
    title: property.title,
    description: property.description,
    price: property.price,
    type: property.type,
    status: property.status,
    address: property.address,
    city: property.city,
    state: property.state,
    country: property.country,
    contactName: property.contactName,
    contactNumber: property.contactNumber,
    bedroom: property.bedroom || "",
    bathroom: property.bathroom || "",
    squareFeet: property.squareFeet || "",
    propertyImg: "",
  })
  const [show, setShow] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (
      propertyDetails.propertyImg &&
      (propertyDetails.propertyImg.type === "image/png" ||
        propertyDetails.propertyImg.type === "image/jpg" ||
        propertyDetails.propertyImg.type === "image/jpeg")
    ) {
      setImageFileStatus(true)
      setPreview(URL.createObjectURL(propertyDetails.propertyImg))
    } else {
      setImageFileStatus(false)
      setPreview("")
      setPropertyDetails((prev) => ({ ...prev, propertyImg: "" }))
    }
  }, [propertyDetails.propertyImg])

  const handleClose = () => {
    setShow(false)
    setPreview("")
    setPropertyDetails({
      id: property._id,
      title: property.title,
      description: property.description,
      price: property.price,
      type: property.type,
      status: property.status,
      address: property.address,
      city: property.city,
      state: property.state,
      country: property.country,
      contactName: property.contactName,
      contactNumber: property.contactNumber,
      bedroom: property.bedroom || "",
      bathroom: property.bathroom || "",
      squareFeet: property.squareFeet || "",
      propertyImg: "",
    })
  }

  const handleShow = () => setShow(true)

  const handleUpdateProperty = async () => {
    const {
      id,
      title,
      description,
      price,
      type,
      status,
      address,
      city,
      state,
      country,
      contactName,
      contactNumber,
      bedroom,
      bathroom,
      squareFeet,
      propertyImg,
    } = propertyDetails

    if (
      title &&
      description &&
      price &&
      type &&
      status &&
      address &&
      city &&
      state &&
      country &&
      contactName &&
      contactNumber &&
      bedroom &&
      bathroom &&
      squareFeet
    ) {
      setLoading(true)
      const reqBody = new FormData()
      reqBody.append("title", title)
      reqBody.append("description", description)
      reqBody.append("price", price)
      reqBody.append("type", type)
      reqBody.append("status", status)
      reqBody.append("address", address)
      reqBody.append("city", city)
      reqBody.append("state", state)
      reqBody.append("country", country)
      reqBody.append("contactName", contactName)
      reqBody.append("contactNumber", contactNumber)
      reqBody.append("bedroom", bedroom)
      reqBody.append("bathroom", bathroom)
      reqBody.append("squareFeet", squareFeet)
      preview ? reqBody.append("propertyImg", propertyImg) : reqBody.append("propertyImg", property.propertyImg)

      const token = sessionStorage.getItem("token")
      if (token) {
        const reqHeader = {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        }
        try {
          const result = await updatePropertyAPI(id, reqBody, reqHeader)
          if (result.status === 200) {
            alert("Property updated successfully!")
            handleClose()
            setEditPropertyResponse(result)
          }
        } catch (err) {
          console.error(err)
          alert("An error occurred while updating the property")
        }
      }
      setLoading(false)
    } else {
      alert("Please fill in all fields.")
    }
  }

  return (
    <>
      <button
        onClick={handleShow}
        className="group p-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-all duration-200 hover:shadow-md"
        title="Edit property"
      >
        <Edit3 className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
      </button>

      {show && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-full max-w-6xl shadow-2xl overflow-hidden max-h-[95vh] flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Edit3 className="w-5 h-5 text-blue-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">Edit Property</h2>
              </div>
              <button
                onClick={handleClose}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto">
              <div className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Image Upload Section */}
                  <div className="lg:col-span-1">
                    <div className="sticky top-0">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                        <Upload className="w-5 h-5 mr-2 text-blue-600" />
                        Property Image
                      </h3>
                      <label className="cursor-pointer group">
                        <input
                          onChange={(e) => setPropertyDetails({ ...propertyDetails, propertyImg: e.target.files[0] })}
                          type="file"
                          className="hidden"
                          accept="image/png,image/jpg,image/jpeg"
                        />
                        <div className="relative border-2 border-dashed border-gray-300 rounded-xl overflow-hidden hover:border-blue-400 transition-colors group-hover:bg-blue-50/50">
                          <img
                            src={preview || `${SERVER_URL}/uploads/${property.propertyImg}`}
                            alt="Property preview"
                            className="w-full h-64 object-cover"
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                            <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 rounded-full p-3">
                              <Upload className="w-6 h-6 text-blue-600" />
                            </div>
                          </div>
                        </div>
                      </label>
                      {!imageFileStatus && propertyDetails.propertyImg && (
                        <div className="mt-3 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                          <p className="text-sm text-amber-700 font-medium flex items-center">
                            <span className="w-2 h-2 bg-amber-400 rounded-full mr-2"></span>
                            Only JPEG, JPG, PNG files are allowed
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Form Section */}
                  <div className="lg:col-span-2">
                    <div className="space-y-8">
                      {/* Basic Information */}
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                          <Home className="w-5 h-5 mr-2 text-blue-600" />
                          Basic Information
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Property Title</label>
                            <input
                              type="text"
                              placeholder="Enter property title"
                              value={propertyDetails.title}
                              onChange={(e) => setPropertyDetails({ ...propertyDetails, title: e.target.value })}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors placeholder-gray-400"
                            />
                          </div>
                          <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                            <textarea
                              placeholder="Describe your property..."
                              value={propertyDetails.description}
                              onChange={(e) => setPropertyDetails({ ...propertyDetails, description: e.target.value })}
                              rows="3"
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors placeholder-gray-400 resize-none"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Price (USD)</label>
                            <div className="relative">
                              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">
                                $
                              </span>
                              <input
                                type="number"
                                placeholder="0"
                                value={propertyDetails.price}
                                onChange={(e) => setPropertyDetails({ ...propertyDetails, price: e.target.value })}
                                className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors placeholder-gray-400"
                              />
                            </div>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Property Type</label>
                            <select
                              value={propertyDetails.type}
                              onChange={(e) => setPropertyDetails({ ...propertyDetails, type: e.target.value })}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                            >
                              <option value="">Select type</option>
                              <option value="Apartment">Apartment</option>
                              <option value="Villa">Villa</option>
                              <option value="House">House</option>
                              <option value="Condo">Condo</option>
                              <option value="Townhouse">Townhouse</option>
                            </select>
                          </div>
                          <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                            <div className="flex space-x-4">
                              <label className="flex items-center">
                                <input
                                  type="radio"
                                  name="status"
                                  value="For Sale"
                                  checked={propertyDetails.status === "For Sale"}
                                  onChange={(e) => setPropertyDetails({ ...propertyDetails, status: e.target.value })}
                                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                                />
                                <span className="ml-2 text-sm font-medium text-gray-700">For Sale</span>
                              </label>
                              <label className="flex items-center">
                                <input
                                  type="radio"
                                  name="status"
                                  value="For Rent"
                                  checked={propertyDetails.status === "For Rent"}
                                  onChange={(e) => setPropertyDetails({ ...propertyDetails, status: e.target.value })}
                                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                                />
                                <span className="ml-2 text-sm font-medium text-gray-700">For Rent</span>
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Location Information */}
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                          <MapPin className="w-5 h-5 mr-2 text-blue-600" />
                          Location Details
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                            <input
                              type="text"
                              placeholder="Street address"
                              value={propertyDetails.address}
                              onChange={(e) => setPropertyDetails({ ...propertyDetails, address: e.target.value })}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors placeholder-gray-400"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                            <input
                              type="text"
                              placeholder="City"
                              value={propertyDetails.city}
                              onChange={(e) => setPropertyDetails({ ...propertyDetails, city: e.target.value })}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors placeholder-gray-400"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
                            <input
                              type="text"
                              placeholder="State"
                              value={propertyDetails.state}
                              onChange={(e) => setPropertyDetails({ ...propertyDetails, state: e.target.value })}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors placeholder-gray-400"
                            />
                          </div>
                          <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
                            <input
                              type="text"
                              placeholder="Country"
                              value={propertyDetails.country}
                              onChange={(e) => setPropertyDetails({ ...propertyDetails, country: e.target.value })}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors placeholder-gray-400"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Property Features */}
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                          <Square className="w-5 h-5 mr-2 text-blue-600" />
                          Property Features
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              <Bed className="w-4 h-4 inline mr-1" />
                              Bedrooms
                            </label>
                            <input
                              type="number"
                              placeholder="0"
                              value={propertyDetails.bedroom}
                              onChange={(e) => setPropertyDetails({ ...propertyDetails, bedroom: e.target.value })}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors placeholder-gray-400"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              <Bath className="w-4 h-4 inline mr-1" />
                              Bathrooms
                            </label>
                            <input
                              type="number"
                              placeholder="0"
                              value={propertyDetails.bathroom}
                              onChange={(e) => setPropertyDetails({ ...propertyDetails, bathroom: e.target.value })}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors placeholder-gray-400"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Square Feet</label>
                            <input
                              type="number"
                              placeholder="0"
                              value={propertyDetails.squareFeet}
                              onChange={(e) => setPropertyDetails({ ...propertyDetails, squareFeet: e.target.value })}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors placeholder-gray-400"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Contact Information */}
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                          <User className="w-5 h-5 mr-2 text-blue-600" />
                          Contact Information
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Contact Name</label>
                            <input
                              type="text"
                              placeholder="Full name"
                              value={propertyDetails.contactName}
                              onChange={(e) => setPropertyDetails({ ...propertyDetails, contactName: e.target.value })}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors placeholder-gray-400"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              <Phone className="w-4 h-4 inline mr-1" />
                              Contact Number
                            </label>
                            <input
                              type="tel"
                              placeholder="Phone number"
                              value={propertyDetails.contactNumber}
                              onChange={(e) =>
                                setPropertyDetails({ ...propertyDetails, contactNumber: e.target.value })
                              }
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors placeholder-gray-400"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex flex-col sm:flex-row justify-end gap-3 p-6 border-t border-gray-100 bg-gray-50">
              <button
                onClick={handleClose}
                disabled={loading}
                className="px-6 py-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateProperty}
                disabled={loading}
                className="px-6 py-3 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center min-w-[140px]"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Updating...
                  </>
                ) : (
                  <>
                    <Edit3 className="w-4 h-4 mr-2" />
                    Update Property
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Edit
