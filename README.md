# 🪔 ManoMitra — AI Wellness Companion for Indian Students

> *"Your AI companion for calm mind, focused study, and Indian-style wellness."*

Live demo: **[manomitra.pages.dev](https://manomitra.pages.dev)**

---

## Chosen Vertical

**Mental Wellness for Indian Competitive Exam Students**

India has over 3 million students preparing for NEET, JEE, CUET, CAT, GATE, UPSC, and Board Exams at any given time. The psychological burden — family expectations, comparison culture, syllabus pressure, fear of failure — is immense and largely unaddressed by existing tools. Most wellness apps are built for Western contexts and miss the unique emotional landscape of the Indian student.

ManoMitra targets this gap: a culturally grounded, AI-powered wellness companion that combines daily mental health tracking with personalised Indian wellness practices — yoga, pranayama, meditation, spiritual reflection, family connection, and mindful study routines.

---

## Approach and Logic

### Design Philosophy

- **Not a therapy app.** ManoMitra explicitly avoids clinical framing. It acts as a warm elder sibling, not a diagnostician.
- **Indian-first wellness.** Generic apps suggest box breathing. ManoMitra suggests Anulom Vilom, Bhramari pranayama, Balasana, Bhagavad Gita reflections, chai with parents, and Yoga Nidra — because that is the actual cultural context of the user.
- **AI as compass, not crutch.** The AI surfaces patterns and suggests actions. The user decides.
- **Safety by design.** Crisis detection is non-optional and runs before any other logic.

### AI Architecture: Two-Layer System

**Layer 1 — Rule-Based Engine (`src/lib/aiEngine.js`)**

Deterministic, zero-latency, works offline:

```
Burnout Risk:
  High   → stress ≥ 8 AND sleep < 6 hrs
  High   → mood = "Hopeless" AND stress ≥ 7
  Medium → stress ≥ 5
  Low    → stress ≤ 4

Thought Pattern Detection (journal keyword scan):
  fail / not enough / can't do   → Self-doubt
  everyone / topper / compare    → Comparison
  parents / family / disappoint  → Family pressure
  mock / score / test / marks    → Performance anxiety
  syllabus / backlog / too much  → Overwhelm
  tired / exhausted / burnout    → Burnout signals
```

Each mood × trigger combination maps to curated yoga poses, pranayama techniques, meditation practices, family activities, and study reset actions from `src/data/wellness.js`.

**Layer 2 — OpenAI GPT-4o-mini (`src/lib/openaiClient.js`)**

When `VITE_OPENAI_API_KEY` is set, calls GPT-4o-mini with a system prompt that enforces:
- Warm Indian elder sibling tone
- Non-diagnostic language
- Structured JSON output (emotion, thoughtPattern, burnoutRisk, insight, recommendations)
- At least one Indian wellness practice per response

Any API error silently falls back to Layer 1. The user never sees an error state.

### Crisis Safety System (`src/lib/crisisDetect.js`)

A live keyword scanner runs on every journal keystroke and every chat message. On detection of crisis phrases (`"want to die"`, `"suicide"`, `"hurt myself"`, etc.):

1. Normal AI logic is **bypassed entirely**
2. Full-screen overlay appears **immediately** — not on submit
3. Indian crisis helplines shown (iCall, Vandrevala Foundation, NIMHANS)
4. Overlay cannot be dismissed for 8 seconds
5. Yoga and meditation are **not suggested** in crisis mode

---

## How the Solution Works

### User Flow

```
Landing Page
    ↓
Profile Setup (name, exam, stress source, wellness style) → localStorage
    ↓
Daily Check-in (mood + stress + energy + sleep + study + trigger + journal)
    ↓  [crisis detection runs live on every keystroke]
AI Mind Report (emotion, burnout risk, thought pattern, personalised wellness plan)
    ↓
Dashboard (stress/mood/sleep charts, weekly insight, check-in history)
```

### Pages

| Page | Route | Purpose |
|---|---|---|
| Landing | `/` | Hero, feature cards, demo mode |
| Profile Setup | `/setup` | Onboarding, persisted to localStorage |
| Daily Check-in | `/checkin` | Full form with live crisis detection |
| Mind Report | `/report` | AI wellness report with Indian recommendations |
| Calm Me Now | `/calm` | 2-minute calm plans for 8 emotional states |
| Dashboard | `/dashboard` | Charts, weekly insight, history |
| Chat | `/chat` | Conversational AI companion |

### Data Model (localStorage — no backend, fully private)

```json
// manomitra_profile
{ "name": "Arjun", "exam": "JEE", "year": "12th Standard",
  "mainStressSource": "Mock test scores",
  "preferredWellnessStyle": "Mixed Indian Wellness Plan" }

// manomitra_checkins  (array, newest first)
{ "id": "uuid", "date": "ISO timestamp",
  "mood": "Anxious", "stressLevel": 8, "energyLevel": 3,
  "sleepHours": 5, "studyHours": 7, "trigger": "Mock test score",
  "journal": "...",
  "report": {
    "emotion": "Anxious", "thoughtPattern": "Comparison & Performance anxiety",
    "burnoutRisk": "High", "insight": "...", "recommendations": [],
    "smallStudyAction": "...", "familyAction": "...",
    "spiritualAction": "...", "bedtimeAction": "..."
  }
}
```

### Indian Wellness Content Library (`src/data/wellness.js`)

~80 curated wellness actions across 8 categories:

| Category | Examples |
|---|---|
| Yoga | Balasana, Shavasana, Tadasana, Yoga Nidra, Legs-up-the-wall |
| Pranayama | Anulom Vilom, Bhramari, Sheetali, counted breathing |
| Meditation | Breath awareness, diya focus, gratitude, body scan, mantra |
| Spiritual | Gita reflections, Vivekananda/Kabir/Kalam quotes, diya ritual (optional) |
| Family | Chai without marks talk, phone-free dinner, calling grandparents |
| Study Reset | 25-min sprints, one weak topic, mistake review, easy-first method |
| Calm Plans | 8 state-specific step-by-step plans with breathing animation |
| Quotes | Rotating quotes from Indian icons on the landing page |

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 + Vite |
| Styling | Tailwind CSS v3 (custom Indian colour palette) |
| Routing | React Router v6 |
| Charts | Recharts (line, bar, area) |
| AI | OpenAI GPT-4o-mini + rule-based fallback |
| Persistence | localStorage (no backend) |
| Fonts | Playfair Display + DM Sans |
| Deployment | Cloudflare Pages |

---

## Assumptions Made

1. **No auth needed.** Students use their own device. localStorage avoids signup friction.

2. **Rule-based AI is sufficient for demo.** Keyword-based pattern detection covers the most common scenarios with high accuracy. A fine-tuned model would improve edge cases but is not required.

3. **Triggers follow a known distribution.** Mock scores, parent expectations, syllabus backlog, comparison, and coaching pressure account for the vast majority of exam stress cases, based on research into Indian student mental health.

4. **Prescriptive suggestions outperform open-ended ones.** "7 rounds of Anulom Vilom" is more actionable than "try some breathing." Stressed students need specificity.

5. **Spiritual content is opt-in by framing.** Suggestions are labelled "choose only if it matches your personal belief," respecting India's religious diversity without requiring a settings toggle.

6. **Crisis detection favours false positives.** Showing the overlay unnecessarily is safer than missing a genuine crisis. The 8-second delay ensures the helpline information registers.

7. **OpenAI key is user-supplied.** The rule-based engine provides a complete demo experience. Live AI is additive, not required.

---

## Running Locally

```bash
git clone https://github.com/Mayuri1711/ManoMitra.git
cd ManoMitra
npm install

# Optional: add your OpenAI key for live AI
cp .env.example .env
# VITE_OPENAI_API_KEY=sk-...

npm run dev -- --port 3456
# Open http://localhost:3456
```

---

## Disclaimer

ManoMitra is not a replacement for professional mental health support. It is a wellness and reflection companion for educational purposes only.

**India Crisis Helplines:**
- iCall: **9152987821**
- Vandrevala Foundation: **1800-2333-330** (24/7, free)
- NIMHANS: **080-46110007**
