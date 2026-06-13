const CRISIS_PHRASES = [
  'want to die',
  'wants to die',
  'i want to die',
  "can't live",
  'cannot live',
  'hurt myself',
  'hurting myself',
  'harm myself',
  'suicide',
  'suicidal',
  'end my life',
  'end it all',
  'no reason to live',
  'not worth living',
  'self harm',
  'self-harm',
  'kill myself',
  'killing myself',
  'better off dead',
  'wish i was dead',
]

export function crisisDetect(text) {
  if (!text || typeof text !== 'string') return { isCrisis: false, matchedPhrase: null }
  const lower = text.toLowerCase()
  for (const phrase of CRISIS_PHRASES) {
    if (lower.includes(phrase)) {
      return { isCrisis: true, matchedPhrase: phrase }
    }
  }
  return { isCrisis: false, matchedPhrase: null }
}
