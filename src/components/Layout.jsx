import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext.jsx'

const navItems = [
  { path: '/', label: 'Home', emoji: '🏠' },
  { path: '/checkin', label: 'Check-in', emoji: '📝' },
  { path: '/calm', label: 'Calm Me Now', emoji: '🌿' },
  { path: '/dashboard', label: 'Dashboard', emoji: '📊' },
  { path: '/chat', label: 'Talk to ManoMitra', emoji: '💬' },
]

export default function Layout({ children }) {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const { profile } = useApp()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="min-h-screen flex flex-col bg-cream">
      {/* Disclaimer ribbon */}
      <div className="bg-saffron/10 border-b border-saffron/20 py-1.5 px-4 text-center">
        <p className="font-body text-xs text-text-soft">
          🪔 ManoMitra is not a replacement for professional mental health support. It is a wellness and reflection companion.
        </p>
      </div>

      {/* Navigation */}
      <nav className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-saffron/10 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl">🪔</span>
            <span className="font-display font-bold text-xl text-text-main">ManoMitra</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6">
            {navItems.map(({ path, label }) => (
              <Link
                key={path}
                to={path}
                className={`nav-link text-sm transition-all ${pathname === path ? 'text-saffron font-semibold' : ''}`}
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Profile + Calm button */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => navigate('/calm')}
              className="btn-calm text-sm px-4 py-2"
            >
              🌿 Calm Me Now
            </button>
            {profile?.name && (
              <Link to="/setup" className="flex items-center gap-2 bg-cream rounded-full px-3 py-1.5 hover:bg-saffron/10 transition-colors">
                <div className="w-7 h-7 rounded-full bg-saffron-gradient flex items-center justify-center text-white font-body font-bold text-xs">
                  {profile.name[0].toUpperCase()}
                </div>
                <span className="font-body text-sm text-text-soft">{profile.name}</span>
              </Link>
            )}
          </div>

          {/* Mobile menu */}
          <button
            className="md:hidden p-2 rounded-xl hover:bg-cream transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <div className="space-y-1.5">
              <span className={`block w-5 h-0.5 bg-text-main transition-all ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`block w-5 h-0.5 bg-text-main transition-all ${menuOpen ? 'opacity-0' : ''}`} />
              <span className={`block w-5 h-0.5 bg-text-main transition-all ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </div>
          </button>
        </div>

        {/* Mobile menu items */}
        {menuOpen && (
          <div className="md:hidden bg-white border-t border-saffron/10 py-4 px-4 space-y-1 animate-slide-up">
            {navItems.map(({ path, label, emoji }) => (
              <Link
                key={path}
                to={path}
                onClick={() => setMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-2xl font-body font-medium transition-all ${pathname === path ? 'bg-saffron/10 text-saffron' : 'text-text-soft hover:bg-cream'}`}
              >
                <span>{emoji}</span>
                {label}
              </Link>
            ))}
          </div>
        )}
      </nav>

      {/* Main content */}
      <main className="flex-1 page-enter">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-saffron/10 mt-12">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xl">🪔</span>
                <span className="font-display font-bold text-lg text-text-main">ManoMitra</span>
              </div>
              <p className="font-body text-sm text-text-soft leading-relaxed">
                Your AI companion for calm mind, focused study, and Indian-style wellness.
              </p>
            </div>
            <div>
              <h4 className="font-body font-semibold text-text-main mb-3 text-sm">Crisis Support India</h4>
              <div className="space-y-1 font-body text-sm text-text-soft">
                <p>iCall: <strong>9152987821</strong></p>
                <p>Vandrevala Foundation: <strong>1800-2333-330</strong></p>
                <p>NIMHANS: <strong>080-46110007</strong></p>
              </div>
            </div>
            <div>
              <h4 className="font-body font-semibold text-text-main mb-3 text-sm">Disclaimer</h4>
              <p className="font-body text-xs text-text-soft leading-relaxed">
                ManoMitra is not a replacement for professional mental health support. It is a wellness and reflection companion for educational purposes only. If you are in crisis, please reach out to a mental health professional immediately.
              </p>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-saffron/10 text-center">
            <p className="font-body text-xs text-text-soft">
              Made with 🧡 for Indian students &nbsp;·&nbsp; Your data stays on your device only
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
