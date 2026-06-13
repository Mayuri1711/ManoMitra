import { generateReport } from './aiEngine.js'

const OPENAI_KEY = import.meta.env.VITE_OPENAI_API_KEY

export async function generateAIReport(checkIn, profile) {
  if (!OPENAI_KEY || OPENAI_KEY === 'your_openai_api_key_here') {
    return generateReport(checkIn)
  }

  try {
    const prompt = `You are ManoMitra, a warm and caring AI wellness companion for Indian students preparing for ${profile?.exam || 'competitive exams'}.

Student ${profile?.name || 'Priya'} has shared their daily check-in:
- Mood: ${checkIn.mood}
- Stress Level: ${checkIn.stressLevel}/10
- Energy Level: ${checkIn.energyLevel}/10
- Sleep Hours: ${checkIn.sleepHours}
- Study Hours: ${checkIn.studyHours}
- Main Stress Trigger: ${checkIn.trigger}
- Journal Entry: "${checkIn.journal || 'Nothing written today.'}"

Please respond as a warm Indian elder sibling. You are NOT a therapist. Never diagnose. Be caring, practical, and grounded in Indian wellness wisdom. Always suggest at least one Indian wellness practice (yoga, pranayama, meditation, family connection, or spiritual reflection).

Return a JSON object with ONLY these fields:
{
  "emotion": "main emotion in 1-2 words",
  "thoughtPattern": "detected thought pattern (e.g. Self-doubt, Comparison, Family pressure, Performance anxiety)",
  "burnoutRisk": "Low or Medium or High",
  "insight": "2-3 sentence caring insight about what the student is feeling and why. Warm, non-judgmental tone.",
  "recommendations": [
    { "category": "Yoga", "emoji": "🧘", "title": "...", "description": "..." },
    { "category": "Pranayama", "emoji": "🌬️", "title": "...", "description": "..." },
    { "category": "Meditation", "emoji": "🧘", "title": "...", "description": "..." },
    { "category": "Family Connection", "emoji": "👨‍👩‍👧", "title": "...", "description": "..." },
    { "category": "Study Reset", "emoji": "📚", "title": "...", "description": "..." },
    { "category": "Reflection", "emoji": "🪔", "title": "...", "description": "..." }
  ],
  "smallStudyAction": "One specific study action for today",
  "familyAction": "One family/social connection action",
  "spiritualAction": "One spiritual or reflective action (optional, secular-friendly)",
  "bedtimeAction": "One bedtime reset action"
}`

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: 'You are ManoMitra, a warm Indian wellness companion. Always respond with valid JSON only. No markdown, no explanation.' },
          { role: 'user', content: prompt },
        ],
        temperature: 0.7,
        max_tokens: 1200,
      }),
    })

    if (!response.ok) throw new Error(`OpenAI error: ${response.status}`)
    const data = await response.json()
    const content = data.choices?.[0]?.message?.content
    if (!content) throw new Error('Empty response')

    const parsed = JSON.parse(content)
    parsed.trigger = checkIn.trigger
    return parsed
  } catch (err) {
    console.warn('OpenAI fallback to rule-based engine:', err.message)
    return generateReport(checkIn)
  }
}

export async function chatWithManoMitra(messages, profile, lastCheckIn) {
  if (!OPENAI_KEY || OPENAI_KEY === 'your_openai_api_key_here') {
    return generateFallbackChatResponse(messages[messages.length - 1]?.content || '', profile, lastCheckIn)
  }

  try {
    const systemPrompt = `You are ManoMitra, a caring AI wellness companion for Indian students. You speak like a warm, wise older sibling — not a therapist. You are calm, kind, practical, and non-judgmental.

Student profile: ${profile?.name || 'Student'} is preparing for ${profile?.exam || 'a competitive exam'}.
${lastCheckIn ? `Recent mood: ${lastCheckIn.mood}, stress: ${lastCheckIn.stressLevel}/10` : ''}

RULES:
- Never diagnose mental health conditions
- Always be warm and empathetic
- Ask gentle follow-up questions to understand better
- Suggest at least one Indian wellness practice in your response (yoga, pranayama, meditation, family support, or spiritual reflection)
- If student mentions exam stress, acknowledge it specifically
- If ANY message contains crisis phrases, respond ONLY with: {"crisis": true}
- Keep responses to 3-4 short paragraphs maximum
- End each response with one small, actionable suggestion

Speak in simple, clear English that any Indian student would understand.`

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          ...messages.map(m => ({ role: m.role, content: m.content })),
        ],
        temperature: 0.8,
        max_tokens: 500,
      }),
    })

    if (!response.ok) throw new Error(`OpenAI error: ${response.status}`)
    const data = await response.json()
    return data.choices?.[0]?.message?.content || generateFallbackChatResponse(messages[messages.length - 1]?.content || '', profile, lastCheckIn)
  } catch (err) {
    console.warn('Chat fallback:', err.message)
    return generateFallbackChatResponse(messages[messages.length - 1]?.content || '', profile, lastCheckIn)
  }
}

function generateFallbackChatResponse(userMessage, profile, lastCheckIn) {
  const msg = userMessage.toLowerCase()
  const name = profile?.name || 'friend'
  const exam = profile?.exam || 'your exam'

  if (/fail|failing|can't do|cannot|not good enough/.test(msg)) {
    return `I hear you, ${name}. That feeling of "I might fail" is one of the heaviest emotions in ${exam} preparation. But one thought is not the final truth.

This feeling often comes when the mind is exhausted or scared — not when it has actually calculated your chances objectively.

Let's take this one step at a time. Can you tell me — did this feeling come after a mock test, after comparing with someone, or has it been building up for a few days? That will help me suggest the right kind of support right now.

For now: take 5 slow, deep breaths. Then drink some water. Your nervous system needs to calm before your mind can think clearly.`
  }

  if (/stress|pressure|overwhelm|too much/.test(msg)) {
    return `You are not alone in feeling this way, ${name}. Stress during ${exam} preparation is real and valid — the syllabus is vast, the stakes feel high, and the pressure can feel suffocating.

But here's what I know: stressed minds cannot absorb information effectively. The best thing you can do for your preparation right now is to calm first, then study.

Try this: do 7 rounds of Anulom Vilom right now. Alternate nostril breathing. It takes 3 minutes and it directly calms your nervous system.

After that, tell me — what is the one thing causing the most stress right now? Let's break it down together.`
  }

  if (/parent|family|expect|disappoint/.test(msg)) {
    return `Family pressure is one of the most complex things Indian students carry, ${name}. Your parents want the best for you — but sometimes their worry comes out as pressure, and that pressure lands heavy.

You cannot control their expectations, but you can choose how you respond. One honest conversation — "I am trying my best, and I need your support right now, not just your expectations" — can sometimes change everything.

For today: Have chai or dinner with your family without any exam talk. Just be a family for one meal. This connection actually recharges your study capacity more than you'd think.

What feels most difficult about the family situation right now?`
  }

  if (/sleep|tired|exhausted|can't sleep|cannot sleep/.test(msg)) {
    return `Your body is telling you something important, ${name}. Sleep deprivation is not just uncomfortable — it severely affects memory consolidation, focus, and emotional regulation. Studying on poor sleep is like pouring water into a broken vessel.

Tonight, try this sleep plan: put your phone away 30 minutes before bed. Do Shavasana — lie flat, arms relaxed, and do Yoga Nidra body scan from toes to head. Write down ONE task for tomorrow on paper so your mind can release it.

During the day, even 15-20 minutes of Shavasana or light Yoga Nidra can partially restore your capacity.

How many hours are you currently sleeping? Let's find a specific solution for your situation.`
  }

  return `Thank you for sharing that with me, ${name}. It takes courage to reach out.

Preparing for ${exam} is genuinely hard — not just academically, but emotionally. There will be days that feel heavier than others, and that is completely human.

I want to understand your situation better. Can you tell me a little more about what's weighing on you most right now? Is it the syllabus, your scores, comparison with others, family pressure, or something else?

Whatever it is, we will find a way through it — one small step at a time. 🙏`
}
