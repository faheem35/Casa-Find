
import React, { useContext, useEffect, useState } from 'react'
import Add from './Add'
import Edit from './Edit'
import { userPropertyAPI, userPropertyRemoveAPI } from '../../services/allAPI'
import { addPropertyResponseContext, editPropertyResponseContext } from '../../contexts/ContextAPI'
import SERVER_URL from '../../services/serverURL'
import { Trash2, MapPin, DollarSign, Home, Bed, Bath, Square } from 'lucide-react'

const View = () => {
  const { addPropertyResponse } = useContext(addPropertyResponseContext)
  const { editPropertyResponse } = useContext(editPropertyResponseContext)
  const [userProperties, setUserProperties] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getUserProperties()
  }, [addPropertyResponse, editPropertyResponse])

  const getUserProperties = async () => {
    setLoading(true)
    const token = sessionStorage.getItem("token")
    if (token) {
      const reqHeader = {
        "Authorization": `Bearer ${token}`
      }
      try {
        const result = await userPropertyAPI(reqHeader)
        if (result.status === 200) {
          setUserProperties(result.data)
        }
      } catch (err) {
        console.log(err)
      }
    }
    setLoading(false)
  }

  const deleteProperty = async (id) => {
    if (window.confirm('Are you sure you want to delete this property?')) {
      const token = sessionStorage.getItem('token')
      if (token) {
        const reqHeader = {
          "Authorization": `Bearer ${token}`
        }
        try {
          await userPropertyRemoveAPI(id, reqHeader)
          getUserProperties()
        } catch (err) {
          console.log(err)
        }
      }
    }
  }

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
        <div className="animate-pulse space-y-6">
          <div className="flex justify-between items-center">
            <div className="h-8 bg-slate-200 rounded w-48"></div>
            <div className="h-10 bg-slate-200 rounded w-32"></div>
          </div>
          {[1, 2, 3].map(i => (
            <div key={i} className="flex gap-4 p-4 border border-slate-200 rounded-xl">
              <div className="w-32 h-24 bg-slate-200 rounded-lg"></div>
              <div className="flex-1 space-y-2">
                <div className="h-6 bg-slate-200 rounded w-3/4"></div>
                <div className="h-4 bg-slate-200 rounded w-1/2"></div>
                <div className="h-4 bg-slate-200 rounded w-1/3"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 sm:px-8 py-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-white mb-1">Your Properties</h2>
            <p className="text-blue-100 text-sm">
              {userProperties.length} {userProperties.length === 1 ? 'property' : 'properties'} in your portfolio
            </p>
          </div>
          <Add />
        </div>
      </div>

      {/* Properties List */}
      <div className="p-6 sm:p-8">
        {userProperties?.length > 0 ? (
          <div className="space-y-6" >
            {userProperties.map(property => (
              <div key={property?._id} className="group bg-slate-50 hover:bg-slate-100 border border-slate-200 hover:border-slate-300 rounded-xl p-4 sm:p-6 transition-all duration-200 hover:shadow-md"  style={{  background: "oklch(97% 0.014 254.604)" }} >
                <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
                  {/* Property Image */}
                  <div className="flex-shrink-0">
                    <div className="relative overflow-hidden rounded-lg">
                      <img 
                        src={`${SERVER_URL}/uploads/${property?.propertyImg}`}
                        alt={property?.title}
                        className="w-full lg:w-48 h-48 lg:h-36 object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute top-3 left-3">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          property?.status?.toLowerCase().includes('sale') 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                          {property?.status}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Property Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-xl font-bold text-slate-900 mb-2 truncate">
                          {property?.title}
                        </h3>
                        
                        <div className="flex items-center text-slate-600 mb-3">
                          <MapPin className="w-4 h-4 mr-1 flex-shrink-0" />
                          <span className="text-sm truncate">
                            {property?.city}, {property?.state}, {property?.country}
                          </span>
                        </div>

                        <div className="flex items-center gap-4 mb-3">
                          <div className="flex items-center text-slate-700">
                            <DollarSign className="w-4 h-4 mr-1" />
                            <span className="font-semibold text-lg">
                              {parseInt(property?.price).toLocaleString()}
                            </span>
                          </div>
                          <div className="flex items-center text-slate-600">
                            <Home className="w-4 h-4 mr-1" />
                            <span className="text-sm">{property?.type}</span>
                          </div>
                        </div>

                        {/* Property Features */}
                        <div className="flex items-center gap-4 text-sm text-slate-600">
                          {property?.bedroom && (
                            <div className="flex items-center">
                              <Bed className="w-4 h-4 mr-1" />
                              <span>{property.bedroom} bed</span>
                            </div>
                          )}
                          {property?.bathroom && (
                            <div className="flex items-center">
                              <Bath className="w-4 h-4 mr-1" />
                              <span>{property.bathroom} bath</span>
                            </div>
                          )}
                          {property?.squareFeet && (
                            <div className="flex items-center">
                              <Square className="w-4 h-4 mr-1" />
                              <span>{parseInt(property.squareFeet).toLocaleString()} sq ft</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <Edit property={property} />
                        <button 
                          onClick={() => deleteProperty(property?._id)} 
                          className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors duration-200"
                          title="Delete property"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-24 h-24 mx-auto mb-4 bg-slate-100 rounded-full flex items-center justify-center">
              <Home className="w-12 h-12 text-slate-400" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">No properties yet</h3>
            <p className="text-slate-600 mb-6">Start building your portfolio by adding your first property</p>
            <Add />
          </div>
        )}
      </div>
    </div>
  )
}

export default View
