
import { GoogleGenAI } from "@google/genai";

// Ensure the API key is available as an environment variable
const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.warn("API_KEY for Gemini is not set. AI features will be disabled.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

export const generateReportSummary = async (reportData: string): Promise<string> => {
  if (!API_KEY) {
    return "La funcionalidad de IA está deshabilitada. Por favor, configure la clave de API de Gemini.";
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Eres un analista de datos experto en operaciones de estacionamientos. 
      Resume el siguiente informe de actividad del estacionamiento en un párrafo conciso y profesional. 
      Destaca las tendencias clave o los puntos más importantes. El informe está en formato JSON.
      Informe:
      ${reportData}`,
    });
    return response.text;
  } catch (error) {
    console.error("Error generating summary with Gemini:", error);
    return "No se pudo generar el resumen. Por favor, inténtelo de nuevo más tarde.";
  }
};
