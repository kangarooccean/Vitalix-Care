import { GoogleGenAI } from "@google/genai";
import { Patient, Vital } from "../types";

const ai = new GoogleGenAI({ 
  apiKey: process.env.GEMINI_API_KEY || "" 
});

interface SummaryRequest {
  patient: Patient;
  vitals: Vital[];
  notes: string;
}

export async function generateClinicalSummary({ patient, vitals, notes }: SummaryRequest): Promise<string> {
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

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        systemInstruction: "You are a professional medical assistant providing clinical summaries for doctors and families. Be objective, accurate, and concise.",
      }
    });

    return response.text || "I was unable to generate a summary at this time.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Error generating clinical summary. Please ensure the Gemini API key is configured correctly.";
  }
}
