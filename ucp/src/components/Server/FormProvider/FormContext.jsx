import React, { createContext} from 'react'

const FormContext = createContext({})
export default function FormContext({ children}) {
  return (
    <FormContext.Provider value={{}}>
        {children}
    </FormContext.Provider>
   
  )
}
