import React, { useEffect, useState } from 'react'
import { cvEmpty } from '../constants/cv';
import { encode, decode } from 'js-base64';

const FormContext = React.createContext({})

export const FormProvider = ({ cv = null, children }) => {

  const [form, setForm] = useState(cv || cvEmpty)

  useEffect(() => {
    const jsonHash = encode(JSON.stringify(form))
    const urlHash = window.location.pathname.slice(8)
    if (jsonHash !== urlHash) {
      window.history.replaceState(null, null, `/deploy/${jsonHash}`)
    }
  }, [form])

  return (
    <FormContext.Provider value={{ form, setForm }}>
      {children}
    </FormContext.Provider>
  )
}

export default FormContext
