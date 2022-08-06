import React, { useState } from 'react'

const LoadContext = React.createContext(false)

export const LoadProvider = ({ children }) => {
  const [load, setLoad] = useState(false)
  return (
    <LoadContext.Provider value={{ load, setLoad }}>
      {children}
    </LoadContext.Provider>
  )
}

export default LoadContext
