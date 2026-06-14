const PROFILE_KEY = 'manomitra_profile'
const CHECKINS_KEY = 'manomitra_checkins'
const SAFETY_ACK_KEY = 'manomitra_safety_ack'

export function getProfile() {
  try {
    const raw = localStorage.getItem(PROFILE_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export function saveProfile(profile) {
  localStorage.setItem(PROFILE_KEY, JSON.stringify(profile))
}

export function getCheckIns() {
  try {
    const raw = localStorage.getItem(CHECKINS_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function saveCheckIn(checkIn) {
  const existing = getCheckIns()
  const updated = [checkIn, ...existing]
  localStorage.setItem(CHECKINS_KEY, JSON.stringify(updated))
  return updated
}

export function getSafetyAck() {
  try {
    return localStorage.getItem(SAFETY_ACK_KEY) === 'true'
  } catch {
    return false
  }
}

export function setSafetyAck(value) {
  try {
    localStorage.setItem(SAFETY_ACK_KEY, value ? 'true' : 'false')
  } catch {
    // ignore storage errors
  }
}

export function clearAll() {
  localStorage.removeItem(PROFILE_KEY)
  localStorage.removeItem(CHECKINS_KEY)
  localStorage.removeItem(SAFETY_ACK_KEY)
}
