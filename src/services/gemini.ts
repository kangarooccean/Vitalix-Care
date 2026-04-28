import { GoogleGenAI } from "@google/genai";
import { Patient, Vital } from "../types";

const apiKey = import.meta.env.VITE_GOOGLE_GEMINI_API_KEY || process.env.GEMINI_API_KEY || "";

if (!apiKey) {
  console.warn('[v0] Gemini API key not configured. Please set VITE_GOOGLE_GEMINI_API_KEY or GEMINI_API_KEY');
}

const ai = new GoogleGenAI({ 
  apiKey: apiKey
});

interface SummaryRequest {
  patient: Patient;
  vitals: Vital[];
  notes: string;
}

export async function generateClinicalSummary({ patient, vitals, notes }: SummaryRequest): Promise<string> {
  if (!apiKey) return "Gemini API key not configured.";
  
  try {
    const vitalsStr = vitals.map(v => `${v.type}: ${v.value} ${v.unit}`).join(', ');
    const prompt = `
      As a clinical AI assistant, provide a concise medical summary for the following patient:
      
      Patient Name: ${patient.name}
      Age: ${patient.age}
      Gender: ${patient.gender}
      
      Current Vitals: ${vitalsStr}
      
      Clinical Notes: ${notes}
      
      Please provide the summary in Markdown format, focusing on any potential concerns or trends.
    `;

    const model = ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt,
    });

    const response = await model;
    return response.text || "I was unable to generate a summary at this time.";
  } catch (error) {
    console.error("[v0] Gemini API Error:", error);
    return "Error generating clinical summary. Please ensure the Gemini API key is configured correctly.";
  }
}

/**
 * Analyze health symptoms using Gemini AI
 */
export async function analyzeHealthSymptoms(symptoms: string[]): Promise<{ analysis: string; recommendations: string[] }> {
  if (!apiKey) return { analysis: "API not configured", recommendations: [] };

  try {
    const prompt = `You are a healthcare information assistant. A patient is experiencing: ${symptoms.join(', ')}.

Provide:
1. General information about what these symptoms might indicate
2. 3-4 practical recommendations
3. When to seek medical attention

IMPORTANT: This is informational only, not a diagnosis. Recommend consulting a healthcare provider.

Format:
ANALYSIS: [analysis]
RECOMMENDATIONS: [bullet points]`;

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt,
    });
    
    const text = response.text || "";
    
    const analysisMatch = text.match(/ANALYSIS:\s*(.+?)(?=RECOMMENDATIONS:|$)/s);
    const recommendationsMatch = text.match(/RECOMMENDATIONS:\s*(.+?)$/s);
    
    const analysis = analysisMatch?.[1]?.trim() || text;
    const recommendationsText = recommendationsMatch?.[1]?.trim() || "";
    const recommendations = recommendationsText
      .split('\n')
      .filter(line => line.trim())
      .map(line => line.replace(/^[-•]\s*/, '').trim());

    return { analysis, recommendations };
  } catch (error) {
    console.error("[v0] Error analyzing symptoms:", error);
    return { analysis: "Unable to analyze at this time", recommendations: [] };
  }
}

/**
 * Get medication information using Gemini
 */
export async function getMedicationInfo(medicationName: string): Promise<{ info: string; sideEffects: string[]; interactions: string[] }> {
  if (!apiKey) return { info: "API not configured", sideEffects: [], interactions: [] };

  try {
    const prompt = `Provide information about: ${medicationName}

Include:
1. What it treats
2. Common side effects
3. Important drug interactions

Format:
INFO: [information]
SIDE_EFFECTS: [bullet list]
INTERACTIONS: [bullet list]`;

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt,
    });
    
    const text = response.text || "";
    
    const infoMatch = text.match(/INFO:\s*(.+?)(?=SIDE_EFFECTS:|$)/s);
    const sideEffectsMatch = text.match(/SIDE_EFFECTS:\s*(.+?)(?=INTERACTIONS:|$)/s);
    const interactionsMatch = text.match(/INTERACTIONS:\s*(.+?)$/s);
    
    const info = infoMatch?.[1]?.trim() || text;
    const sideEffectsText = sideEffectsMatch?.[1]?.trim() || "";
    const interactionsText = interactionsMatch?.[1]?.trim() || "";
    
    const sideEffects = sideEffectsText
      .split('\n')
      .filter(line => line.trim())
      .map(line => line.replace(/^[-•]\s*/, '').trim());
    
    const interactions = interactionsText
      .split('\n')
      .filter(line => line.trim())
      .map(line => line.replace(/^[-•]\s*/, '').trim());

    return { info, sideEffects, interactions };
  } catch (error) {
    console.error("[v0] Error getting medication info:", error);
    return { info: "Unable to retrieve information", sideEffects: [], interactions: [] };
  }
}

/**
 * Answer medical questions using Gemini
 */
export async function askHealthQuestion(question: string): Promise<string> {
  if (!apiKey) return "Gemini API key not configured.";

  try {
    const prompt = `You are a healthcare information assistant. Answer this question:

Question: ${question}

Important:
- This is informational only, not medical advice
- Recommend consulting with a healthcare provider
- Be accurate and evidence-based

Provide a clear, concise answer.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt,
    });
    
    return response.text || "Unable to answer this question.";
  } catch (error) {
    console.error("[v0] Error answering question:", error);
    return "Unable to answer. Please consult a healthcare provider.";
  }
}

/**
 * Generate wellness recommendations using Gemini
 */
export async function generateWellnessRecommendations(profile: {
  age?: number;
  conditions?: string[];
  medications?: string[];
  activity?: string;
}): Promise<string[]> {
  if (!apiKey) return ["API not configured"];

  try {
    const prompt = `Provide 5 personalized wellness recommendations based on:
- Age: ${profile.age || 'Not specified'}
- Conditions: ${profile.conditions?.join(', ') || 'None'}
- Medications: ${profile.medications?.join(', ') || 'None'}
- Activity Level: ${profile.activity || 'Not specified'}

Format as a numbered list.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt,
    });
    
    const text = response.text || "";
    
    const recommendations = text
      .split('\n')
      .filter(line => /^\d+\./.test(line.trim()))
      .map(line => line.replace(/^\d+\.\s*/, '').trim());

    return recommendations.length > 0 ? recommendations : ["Unable to generate recommendations"];
  } catch (error) {
    console.error("[v0] Error generating recommendations:", error);
    return ["Error generating recommendations"];
  }
}

export default {
  generateClinicalSummary,
  analyzeHealthSymptoms,
  getMedicationInfo,
  askHealthQuestion,
  generateWellnessRecommendations,
};
