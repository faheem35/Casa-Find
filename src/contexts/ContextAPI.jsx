import React, { createContext, useState } from 'react'

export const addPropertyResponseContext = createContext()
export const editPropertyResponseContext = createContext()

const ContextApi = ({children}) => {
          const [addPropertyResponse, setAddPropertyResponse]= useState("")
          const [editPropertyResponse, setEditPropertyResponse]= useState("")
  return (
    <editPropertyResponseContext.Provider value={{editPropertyResponse, setEditPropertyResponse}}>
      <addPropertyResponseContext.Provider value={{addPropertyResponse, setAddPropertyResponse}}>
            {children}
      </addPropertyResponseContext.Provider>
//     </editPropertyResponseContext.Provider>
  )
}

export default ContextApi