import { yogaSuggestions, pranayamaSuggestions, meditationSuggestions, spiritualSuggestions, familySuggestions, studyResetSuggestions } from '../data/wellness.js'

function detectBurnoutRisk(checkIn) {
  const { stressLevel, sleepHours, mood } = checkIn
  if ((stressLevel >= 8 && sleepHours < 6) || (mood === 'Hopeless' && stressLevel >= 7)) return 'High'
  if (stressLevel >= 5) return 'Medium'
  return 'Low'
}

function detectThoughtPattern(journal, mood, trigger) {
  const j = (journal || '').toLowerCase()
  const t = (trigger || '').toLowerCase()
  const patterns = []

  if (/fail|not enough|can't do|cannot do|not good|never good|useless/.test(j)) patterns.push('Self-doubt')
  if (/everyone|others|friends|topper|rank|better than|ahead of|compare/.test(j)) patterns.push('Comparison')
  if (/parents|family|expectation|disappoint|let down|pressure from/.test(j) || /parent|family/.test(t)) patterns.push('Family pressure')
  if (/sleep|tired|exhausted|burnout|energy|fatigue/.test(j)) patterns.push('Burnout signals')
  if (/mock|test|score|result|marks|exam/.test(j) || /mock|score|exam/.test(t)) patterns.push('Performance anxiety')
  if (/syllabus|backlog|too much|overwhelming|behind|so much/.test(j)) patterns.push('Overwhelm')
  if (mood === 'Anxious' || mood === 'Stressed') patterns.push('Exam stress')
  if (mood === 'Angry') patterns.push('Frustration')

  if (patterns.length === 0) return 'Emotional processing'
  return patterns.join(' & ')
}

function pickRandom(arr, count = 1) {
  const shuffled = [...arr].sort(() => 0.5 - Math.random())
  return shuffled.slice(0, count)
}

function buildRecommendations(checkIn) {
  const { mood, stressLevel, energyLevel, trigger, journal } = checkIn
  const recs = []
  const j = (journal || '').toLowerCase()

  // Yoga
  const moodToYoga = {
    Anxious: 'anxious', Stressed: 'anxious', Panicking: 'anxious',
    Tired: 'tired', Hopeless: 'hopeless',
    Angry: 'angry',
    Confused: 'unfocused', Motivated: 'unfocused',
  }
  const yogaKey = moodToYoga[mood] || (stressLevel >= 7 ? 'anxious' : 'tired')
  const yogaItems = yogaSuggestions[yogaKey] || yogaSuggestions.anxious
  recs.push({ category: 'Yoga', ...pickRandom(yogaItems)[0] })

  // Pranayama
  const moodToPrana = {
    Anxious: 'anxious', Stressed: 'panic', Panicking: 'panic',
    Angry: 'angry', Tired: 'tired',
    Confused: 'unfocused', Motivated: 'unfocused',
    Sad: 'overthinking', Hopeless: 'overthinking',
  }
  const pranaKey = moodToPrana[mood] || 'anxious'
  const pranaItems = pranayamaSuggestions[pranaKey] || pranayamaSuggestions.anxious
  recs.push({ category: 'Pranayama', ...pickRandom(pranaItems)[0] })

  // Meditation
  recs.push({ category: 'Meditation', ...pickRandom(meditationSuggestions)[0] })

  // Spiritual (optional)
  const spirit = pickRandom(spiritualSuggestions)[0]
  recs.push({ category: 'Reflection', ...spirit })

  // Family
  recs.push({ category: 'Family Connection', ...pickRandom(familySuggestions)[0] })

  // Study Reset
  recs.push({ category: 'Study Reset', ...pickRandom(studyResetSuggestions)[0] })

  return recs
}

function buildInsight(checkIn) {
  const { mood, stressLevel, energyLevel, trigger, journal, sleepHours } = checkIn
  const j = (journal || '').toLowerCase()

  if (mood === 'Hopeless' || stressLevel >= 9) {
    return `You are carrying a very heavy weight right now. This much pressure is not normal, and it makes sense that you feel depleted. Before studying anything today, your mind needs care first. You are still in this. One difficult day does not define your entire journey.`
  }
  if (mood === 'Anxious' || mood === 'Stressed') {
    if (/compare|others|everyone|topper/.test(j)) {
      return `You seem anxious because you are comparing your journey to others. Comparison is the thief of peace — and in an exam like this, everyone's preparation looks different from the inside. Your path is your own. Focus on what YOU can improve today.`
    }
    if (/parent|family|disappoint/.test(j)) {
      return `You are feeling the weight of family expectations. This is one of the heaviest burdens for Indian students. Your parents want you to succeed — but most of all, they want you to be okay. One honest conversation with them is worth more than 10 hours of stressed study.`
    }
    if (/mock|score|test|marks/.test(j)) {
      return `Your mock test score is making you anxious, but mock tests are designed to expose gaps — not to predict failure. Every student who has cleared this exam had bad mocks. What matters is what you do with the feedback. Calm first, then adjust your plan.`
    }
    return `You are feeling stressed and anxious, which is very normal at this stage of preparation. Your brain is working hard. Today, prioritize calm over coverage. A rested, calm mind learns better than an anxious, exhausted one.`
  }
  if (mood === 'Tired' || energyLevel <= 3) {
    return `Your body and mind are telling you they need rest. Pushing through deep tiredness creates more mistakes and erodes confidence. Today, a shorter, focused study session after proper rest is more valuable than 8 exhausted hours.`
  }
  if (mood === 'Angry') {
    return `Frustration during preparation is real and valid. It often means you care deeply. But studying while angry reduces retention significantly. Reset your body and mind first — 20 minutes of calm is a better investment than 2 hours of frustrated studying.`
  }
  if (mood === 'Sad') {
    return `Feeling sad during long preparation is human and understandable. You are far from home, from fun, from ease. These feelings deserve acknowledgment, not suppression. Be gentle with yourself today. Connection with family or a friend is medicine.`
  }
  if (mood === 'Motivated') {
    return `You are in a good space today! Channel this energy wisely — tackle your most challenging topic while your motivation is high. Remember to also take breaks so this energy lasts through the week.`
  }
  if (sleepHours < 6) {
    return `You slept fewer than 6 hours, and that significantly affects memory, focus, and emotional regulation. Even 20 minutes of rest (Shavasana or Yoga Nidra) can partially restore your cognitive capacity today. Prioritize sleep tonight.`
  }
  return `Every day of preparation is progress, even when it doesn't feel like it. You showed up today. That consistency, compounded over weeks, is what creates results. Be patient with yourself.`
}

function buildBedtimeAction(checkIn) {
  const { stressLevel, sleepHours } = checkIn
  if (stressLevel >= 7 || sleepHours < 6) {
    return 'Before sleeping: write down tomorrow\'s ONE study task on paper. Put your phone away 30 minutes before bed. Do Shavasana for 5 minutes. Say: "Today is complete."'
  }
  return 'Write 3 things you did well today before sleeping. It can be as simple as "I completed one chapter" or "I drank enough water." Gratitude before sleep improves your mood tomorrow.'
}

export function generateReport(checkIn) {
  const burnoutRisk = detectBurnoutRisk(checkIn)
  const thoughtPattern = detectThoughtPattern(checkIn.journal, checkIn.mood, checkIn.trigger)
  const insight = buildInsight(checkIn)
  const recommendations = buildRecommendations(checkIn)
  const bedtimeAction = buildBedtimeAction(checkIn)

  const smallStudyAction = checkIn.stressLevel >= 7
    ? 'Study only ONE weak topic for 25 minutes. Use the "easiest question first" method. Small progress beats overwhelmed paralysis.'
    : 'Plan tomorrow\'s study session tonight: one clear topic, one goal, one 25-minute sprint to start.'

  const familyAction = 'Have a meal or chai with your family tonight without discussing marks. Connection recharges what study pressure drains.'

  const spiritualAction = checkIn.mood === 'Hopeless' || checkIn.mood === 'Sad'
    ? 'Read one line from APJ Abdul Kalam or Swami Vivekananda. Let a voice of wisdom remind you: your effort today is never wasted.'
    : 'Take 2 minutes of silence. Breathe. Offer your sincere effort and let go of the result anxiety for tonight.'

  return {
    emotion: checkIn.mood,
    trigger: checkIn.trigger,
    thoughtPattern,
    burnoutRisk,
    insight,
    recommendations,
    smallStudyAction,
    familyAction,
    spiritualAction,
    bedtimeAction,
  }
}
