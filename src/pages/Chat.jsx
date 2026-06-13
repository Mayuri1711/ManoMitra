import { useState, useRef, useEffect } from 'react'
import { useApp } from '../context/AppContext.jsx'
import { crisisDetect } from '../lib/crisisDetect.js'
import { chatWithManoMitra } from '../lib/openaiClient.js'
import CrisisAlert from '../components/CrisisAlert.jsx'

const INITIAL_MSG = {
  role: 'assistant',
  content: `Namaste 🙏 I'm ManoMitra — your wellness companion. I'm here to listen, not to judge.

Whether it's exam stress, comparison with friends, family pressure, sleep trouble, or just a heavy day — tell me what's going on. I'll do my best to help.

What would you like to talk about today?`,
}

const SUGGESTIONS = [
  'I feel like I will fail my exam',
  'My parents have too many expectations',
  'I cannot focus on studying',
  'I am comparing myself with my classmates',
  'I have not been sleeping well',
  'I feel burned out',
]

export default function Chat() {
  const { profile, checkIns } = useApp()
  const [messages, setMessages] = useState([INITIAL_MSG])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [crisis, setCrisis] = useState(false)
  const bottomRef = useRef(null)
  const lastCheckIn = checkIns[0]

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  async function sendMessage(text) {
    const userText = (text || input).trim()
    if (!userText || loading) return

    const { isCrisis } = crisisDetect(userText)
    if (isCrisis) {
      setMessages(prev => [...prev, { role: 'user', content: userText }])
      setCrisis(true)
      setInput('')
      return
    }

    const newMessages = [...messages, { role: 'user', content: userText }]
    setMessages(newMessages)
    setInput('')
    setLoading(true)

    try {
      const response = await chatWithManoMitra(newMessages, profile, lastCheckIn)
      if (response && typeof response === 'object' && response.crisis) {
        setCrisis(true)
      } else {
        setMessages(prev => [...prev, { role: 'assistant', content: response }])
      }
    } catch (err) {
      setMessages(prev => [...prev, { role: 'assistant', content: 'I\'m here with you. Could you tell me a little more about what you\'re feeling right now?' }])
    } finally {
      setLoading(false)
    }
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 flex flex-col" style={{ minHeight: 'calc(100vh - 160px)' }}>
      {crisis && <CrisisAlert onDismiss={() => setCrisis(false)} />}

      {/* Header */}
      <div className="text-center mb-6 animate-fade-in">
        <div className="w-16 h-16 rounded-full bg-saffron/20 flex items-center justify-center mx-auto mb-3">
          <span className="text-3xl">🪔</span>
        </div>
        <h1 className="font-display text-2xl font-bold text-text-main">Talk to ManoMitra</h1>
        <p className="font-body text-text-soft text-sm">Your warm, caring AI companion. Not a therapist — a wise friend.</p>
      </div>

      {/* Chat window */}
      <div className="flex-1 card mb-4 overflow-y-auto space-y-4 scrollbar-hide" style={{ maxHeight: '50vh', minHeight: '300px' }}>
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
          >
            {msg.role === 'assistant' && (
              <div className="w-8 h-8 rounded-full bg-saffron/20 flex items-center justify-center flex-shrink-0 mr-2 mt-1">
                <span className="text-sm">🪔</span>
              </div>
            )}
            <div
              className={`max-w-xs md:max-w-sm rounded-2xl px-4 py-3 ${msg.role === 'user'
                ? 'bg-saffron text-white rounded-br-sm'
                : 'bg-cream border border-saffron/10 text-text-main rounded-bl-sm'}`}
            >
              <p className="font-body text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="w-8 h-8 rounded-full bg-saffron/20 flex items-center justify-center mr-2">
              <span className="text-sm">🪔</span>
            </div>
            <div className="bg-cream border border-saffron/10 rounded-2xl rounded-bl-sm px-4 py-3">
              <div className="flex gap-1">
                {[0, 1, 2].map(i => (
                  <div key={i} className="w-2 h-2 rounded-full bg-saffron animate-pulse-soft" style={{ animationDelay: `${i * 0.2}s` }} />
                ))}
              </div>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Suggestions */}
      {messages.length <= 1 && (
        <div className="mb-3">
          <p className="font-body text-xs text-text-soft mb-2">Quick start:</p>
          <div className="flex flex-wrap gap-2">
            {SUGGESTIONS.map((s, i) => (
              <button
                key={i}
                onClick={() => sendMessage(s)}
                className="font-body text-xs bg-saffron/10 hover:bg-saffron/20 text-saffron-dark border border-saffron/20 rounded-full px-3 py-1.5 transition-all"
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="flex gap-3">
        <textarea
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Share what's on your mind..."
          rows={2}
          className="input-field flex-1 resize-none"
          disabled={loading}
          aria-label="Chat message"
        />
        <button
          onClick={() => sendMessage()}
          disabled={loading || !input.trim()}
          className={`btn-primary px-4 py-2 self-end flex-shrink-0 ${(!input.trim() || loading) ? 'opacity-50 cursor-not-allowed' : ''}`}
          aria-label="Send message"
        >
          <span className="text-lg">➤</span>
        </button>
      </div>

      <p className="font-body text-xs text-text-soft text-center mt-3">
        ManoMitra is not a therapist. For professional support, contact iCall: <strong>9152987821</strong>
      </p>
    </div>
  )
}
