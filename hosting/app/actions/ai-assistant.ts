'use server'

import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function chatWithAero(prompt: string, productData: any[], imageData?: string) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const slimInventory = productData.map(bike => ({
      id: bike.id,
      name: bike.name,
      brand: bike.brand,
      price: bike.price,
      category: bike.category,
      level: bike.level,
      material: bike.material || 'Carbon Fiber'
    }));

    const context = `
        You are Cosmo, the premium cycling concierge for Cosmo Cycles. 
        
        INVENTORY: ${JSON.stringify(slimInventory)}
        
        RESPONSE RULES:
        - Use **Markdown** and **Bullet Points**.
        - For EVERY bike, you MUST clearly state the **Type** (e.g., Road, Mountain, or Gravel).
        - Include technical specs: **Price**, **Material**, and **Level**.
        - Format every recommendation exactly like this:
            * **[Bike Name]** ([Type])
            - Why it matches: [Reason]
            - Specs: **[Price]** | **[Material]** | **[Level]**
            - [VIEW MACHINE DETAILS](/shop/id/[ID])
        
        TONE: Elite, helpful, and professional.
        `;

    let result;

    if (imageData) {
      const imagePart = {
        inlineData: {
          data: imageData.split(',')[1],
          mimeType: "image/jpeg",
        },
      };
      result = await model.generateContent([context, prompt || "Analyze this image and find matches.", imagePart]);
    } else {
      // If it's the first time opening, we use a specific greeting prompt
      const finalPrompt = prompt === "INITIAL_GREETING" 
        ? "Introduce yourself briefly as the Aero-Assistant and ask how you can help with the fleet." 
        : prompt;

      result = await model.generateContent([context, finalPrompt]);
    }

    return result.response.text();
  } catch (error) {
    console.error("AI Error:", error);
    return "System recalibration required. Please try again.";
  }
}