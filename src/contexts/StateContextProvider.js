import React, { createContext, useContext, useState } from 'react'

const StateContext = createContext()
const baseUrl = 'https://google-search3.p.rapidapi.com/api/v1'

export const StateContextProvider = ({ children }) => {
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  const getResults = async (url) => {
    setLoading(true)

    const res = await fetch(`${baseUrl}${url}`, {
      method: 'GET',
      headers: {
        'x-rapidapi-host': 'google-search3.p.rapidapi.com',
        'x-rapidapi-key': 'f97f976e70msh29b43dfc816f2b5p1902f1jsn00cae0683e28',
      },
    })

    const data = await res.json()

    setResults(data)
    setLoading(false)
  }

  return (
    <StateContext.Provider
      value={{ getResults, results, searchTerm, setSearchTerm, loading }}
    >
      {children}
    </StateContext.Provider>
  )
}

export const useStateContext = () => useContext(StateContext)
