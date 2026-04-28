# Google Gemini AI Integration - Vitalix Care

## Overview

Vitalix Care integrates **Google Gemini 2.0 Flash** to provide intelligent healthcare features:
- AI-powered symptom analysis
- Medication information lookup
- Health question answering
- Personalized wellness recommendations
- Clinical summary generation

## Setup

### 1. Get Your Gemini API Key

1. Visit [Google AI Studio](https://ai.google.dev/)
2. Click "Get API Key"
3. Create a new project or select existing
4. Copy your API key

### 2. Configure Environment Variables

**For Development (Local):**

Create `.env.local` in project root:
```bash
VITE_GOOGLE_GEMINI_API_KEY=your_api_key_here
```

**For Production (Vercel):**

1. Go to Vercel Project Settings
2. Navigate to Environment Variables
3. Add: `VITE_GOOGLE_GEMINI_API_KEY=your_api_key_here`

**For Google Cloud Run:**

1. Go to Cloud Run service settings
2. Edit and add environment variable
3. Set: `GEMINI_API_KEY=your_api_key_here`

### 3. Install Dependencies

Dependencies are already installed:
```bash
npm install @google/genai
```

## Features

### AI Health Assistant Modal

Located in: `src/components/HealthAssistant.tsx`

**Two Modes:**

#### Question Mode
- Ask any health-related question
- Get informative AI responses
- Includes medical disclaimers

**Example Questions:**
- "What are symptoms of diabetes?"
- "How long does COVID-19 last?"
- "What should I do about persistent headaches?"

#### Symptoms Analysis Mode
- Add multiple symptoms
- Get AI analysis and recommendations
- Includes when to seek medical attention

**Example Symptoms:**
- Fever, Cough, Fatigue
- Headache, Nausea, Dizziness

### Service Functions

Located in: `src/services/gemini.ts`

```typescript
// Generate clinical summary
generateClinicalSummary({ patient, vitals, notes })

// Analyze symptoms
analyzeHealthSymptoms(symptoms: string[])

// Get medication info
getMedicationInfo(medicationName: string)

// Answer health questions
askHealthQuestion(question: string)

// Generate wellness recommendations
generateWellnessRecommendations(userProfile)
```

## Usage

### In Components

```typescript
import { askHealthQuestion, analyzeHealthSymptoms } from '../services/gemini';

// Ask a question
const answer = await askHealthQuestion("What is high blood pressure?");

// Analyze symptoms
const { analysis, recommendations } = await analyzeHealthSymptoms(['fever', 'cough']);
```

### In UI

The AI Health Assistant is accessible via:
1. **Help & Clinical Support** page → "AI Health Assistant" button
2. **HelpSupport component** in any portal

## Model Configuration

**Current Model:** `gemini-2.0-flash`

**Features:**
- Latest Gemini model
- Fast inference
- Optimized for healthcare Q&A
- Multimodal capable

**Alternative Models:**
- `gemini-1.5-pro` - More capable but slower
- `gemini-1.5-flash` - Faster, slightly less capable

## API Limits & Pricing

### Free Tier
- 15 requests per minute
- 1,500 requests per day
- Perfect for development

### Paid Tier
- Starting at $0.075 per 1K input tokens
- $0.30 per 1K output tokens
- Scalable for production

## Error Handling

The app gracefully handles:
- Missing API key (shows informative message)
- Network errors (displays error UI)
- Rate limiting (retry mechanism)
- Invalid responses (fallback messages)

## Security & Privacy

**Important:**
- Never commit your API key
- Use environment variables only
- API keys are sensitive credentials
- Consider rate limiting in production
- Add request validation before API calls

## Testing Locally

```bash
# Set API key
export VITE_GOOGLE_GEMINI_API_KEY="your_key_here"

# Run dev server
npm run dev

# Visit Help & Clinical Support
# Click "AI Health Assistant"
# Try asking a question or analyzing symptoms
```

## Deployment

### Vercel Deployment

1. Add API key to Vercel Environment Variables
2. Deploy normally
3. Test in production

```bash
vercel env add VITE_GOOGLE_GEMINI_API_KEY
vercel --prod
```

### Google Cloud Run

1. Add to `.env.local` or Cloud Run env vars
2. Deploy using provided script

```bash
./deploy-to-gcloud.sh
```

## Troubleshooting

### "API key not configured"
- Check `.env.local` file exists
- Verify key is set: `echo $VITE_GOOGLE_GEMINI_API_KEY`
- Restart dev server after adding key

### "Rate limit exceeded"
- Free tier has 15 req/min limit
- Implement rate limiting in production
- Consider upgrading to paid tier

### "Model not available"
- Verify model name in `gemini.ts`
- Check API key has correct permissions
- Ensure API is enabled in Google Cloud

### "CORS errors"
- Gemini API is called server-side in services
- Should not have CORS issues
- Check browser console for specific errors

## Production Considerations

1. **Rate Limiting:** Implement request throttling
2. **Caching:** Cache common questions/answers
3. **Logging:** Monitor API usage
4. **Fallbacks:** Have UX gracefully degrade without AI
5. **Updates:** Monitor for model updates

## Documentation

- [Google Gemini Docs](https://ai.google.dev/docs)
- [Gemini API Reference](https://ai.google.dev/reference/rest)
- [Vitalix Care README](./README.md)

## Support

- Report issues: GitHub Issues
- Ask questions: GitHub Discussions
- Google AI Help: https://ai.google.dev/help

---

**Last Updated:** 2026-04-28
**Vitalix Care with Google Gemini**
