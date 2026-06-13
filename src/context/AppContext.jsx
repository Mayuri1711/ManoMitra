import { createContext, useContext, useState, useEffect } from 'react'
import { getProfile, saveProfile as persistProfile, getCheckIns, saveCheckIn as persistCheckIn } from '../lib/storage.js'

const AppContext = createContext(null)

export function AppProvider({ children }) {
  const [profile, setProfileState] = useState(null)
  const [checkIns, setCheckIns] = useState([])
  const [latestReport, setLatestReport] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setProfileState(getProfile())
    setCheckIns(getCheckIns())
  }, [])

  function setProfile(p) {
    persistProfile(p)
    setProfileState(p)
  }

  function addCheckIn(checkIn) {
    const updated = persistCheckIn(checkIn)
    setCheckIns(updated)
    setLatestReport(checkIn.report)
    return checkIn
  }

  return (
    <AppContext.Provider value={{ profile, setProfile, checkIns, addCheckIn, latestReport, setLatestReport, isLoading, setIsLoading }}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  return useContext(AppContext)
}
