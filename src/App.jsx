import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { useApp } from './context/AppContext.jsx'
import Layout from './components/Layout.jsx'
import Landing from './pages/Landing.jsx'
import Setup from './pages/Setup.jsx'
import CheckIn from './pages/CheckIn.jsx'
import Report from './pages/Report.jsx'
import CalmMe from './pages/CalmMe.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Chat from './pages/Chat.jsx'
import Terms from './pages/Terms.jsx'
import About from './pages/About.jsx'

function GuardedRoute({ children }) {
  const { profile } = useApp()
  if (!profile) return <Navigate to="/setup" replace />
  return children
}

export default function App() {
  const location = useLocation()

  return (
    <Layout>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Landing />} />
        <Route path="/setup" element={<Setup />} />
        <Route path="/calm" element={<CalmMe />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/about" element={<About />} />
        <Route path="/checkin" element={<CheckIn />} />
        <Route path="/report" element={<GuardedRoute><Report /></GuardedRoute>} />
        <Route path="/dashboard" element={<GuardedRoute><Dashboard /></GuardedRoute>} />
        <Route path="/chat" element={<GuardedRoute><Chat /></GuardedRoute>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  )
}
