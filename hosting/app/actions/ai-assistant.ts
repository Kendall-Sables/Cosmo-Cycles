'use server'

import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function chatWithAero(prompt: string, productData: any[], imageData?: string) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    // 1. Prepare the "Knowledge Base" for the AI
    const context = `
      You are the Cosmo Cycles Aero-Assistant. You are a pro bike mechanic and expert.
      Here is our current inventory in JSON format: ${JSON.stringify(productData)}
      
      Rules:
      - If the user provides an image, identify the bike type/color/brand.
      - Recommend the best 1-3 matches from our inventory based on the user's prompt or image.
      - Explain WHY you chose them (e.g., "This fits your R50k budget and is great for climbing").
      - Keep the tone technical, premium, and professional.
    `;

    let result;

    if (imageData) {
      // HANDLE IMAGE + TEXT
      const imagePart = {
        inlineData: {
          data: imageData.split(',')[1], // Remove the base64 header
          mimeType: "image/jpeg",
        },
      };
      result = await model.generateContent([context, prompt || "What bike is this and do we have similar ones?", imagePart]);
    } else {
      // HANDLE TEXT ONLY
      result = await model.generateContent([context, prompt]);
    }

    return result.response.text();
  } catch (error) {
    console.error("AI Error:", error);
    return "System recalibration required. Please try again.";
  }
}