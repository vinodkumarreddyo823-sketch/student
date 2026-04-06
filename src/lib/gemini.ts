import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export async function getTeacherInsights(classroomData: string) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `You are an AI Classroom Assistant. Analyze the following classroom attention data and provide 3-4 actionable insights for the teacher to improve engagement. Keep it concise and professional.
      
      Data:
      ${classroomData}
      
      Format your response as a markdown list.`,
    });

    return response.text || "Unable to generate insights at this time.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Error generating insights. Please check your connection.";
  }
}
