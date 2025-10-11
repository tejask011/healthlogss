import { GoogleGenAI, Type } from "@google/genai";
import type { FoodItem } from "../types";
import { FoodCategory, Cuisine } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const handleError = (error: unknown, context: string): string => {
    console.error(`Error in ${context}:`, error);
    if (error instanceof Error && error.message.includes('API key not valid')) {
        return `There seems to be an issue with your API Key. Please check if it's correct and has the necessary permissions.`;
    }
    return `Sorry, I couldn't process your request for ${context} right now. Please try again later.`;
}

export const getFoodDetailsFromGoogleSearch = async (foodName: string): Promise<{ foodItem: FoodItem | null; error: string | null; }> => {
    const prompt = `Find nutritional information for a standard 100g serving of '${foodName}'. Also, suggest a likely meal category (Breakfast, Lunch, Dinner, Snacks). Respond ONLY in the following format, with each value on a new line:
CALORIES: [number]
PROTEIN: [number]
CARBS: [number]
FAT: [number]
CATEGORY: [Breakfast|Lunch|Dinner|Snacks]
Do not add any other text, explanation, or formatting. If you cannot find the information, respond with "NOT_FOUND".`;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                tools: [{ googleSearch: {} }],
            },
        });

        const text = response.text.trim();
        
        if (text === 'NOT_FOUND') {
            return { foodItem: null, error: `Could not find nutritional information for "${foodName}".` };
        }

        const lines = text.split('\n');
        const nutritionData: any = {};
        for (const line of lines) {
            const parts = line.split(':');
            if (parts.length === 2) {
                const key = parts[0].trim().toLowerCase();
                const value = parts[1].trim();
                nutritionData[key] = value;
            }
        }
        
        const calories = parseFloat(nutritionData.calories);
        const protein = parseFloat(nutritionData.protein);
        const carbs = parseFloat(nutritionData.carbs);
        const fat = parseFloat(nutritionData.fat);
        const category = nutritionData.category as FoodCategory;

        if (isNaN(calories) || isNaN(protein) || isNaN(carbs) || isNaN(fat) || !Object.values(FoodCategory).includes(category)) {
             throw new Error(`Failed to parse nutrition data from AI response. Received: ${text}`);
        }

        const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks?.map(chunk => ({
            uri: chunk.web?.uri || '',
            title: chunk.web?.title || '',
        })).filter(source => source.uri) || [];

        const foodItem: FoodItem = {
            id: `google-${foodName.replace(/\s+/g, '-')}-${Date.now()}`,
            name: foodName.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
            category: category,
            cuisine: Cuisine.General,
            nutrition: { calories, protein, carbs, fat },
            sources: sources,
            imageUrl: `https://source.unsplash.com/400x300/?${encodeURIComponent(foodName)},food`
        };

        return { foodItem, error: null };

    } catch (error) {
        return { foodItem: null, error: handleError(error, `Google Search for ${foodName}`) };
    }
};

export const getAiResponse = async (prompt: string): Promise<string> => {
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `As a nutrition and health expert specializing in Indian cuisine, answer the following question clearly and concisely: ${prompt}`,
            config: {
                temperature: 0.5,
                topP: 0.95,
                topK: 64,
            }
        });
        return response.text;
    } catch (error) {
        return handleError(error, "AI response");
    }
};

export const getAiFoodAlternative = async (foodName: string): Promise<string> => {
    if (!foodName) return "Please enter a food name.";
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `As a nutrition expert, suggest a single healthy Indian or Maharashtrian food alternative for "${foodName}". Explain why it's a healthier choice in two or three short sentences. Structure the response clearly.`,
            config: {
                temperature: 0.5,
                topP: 0.95,
                topK: 64,
            },
        });
        return response.text;
    } catch (error) {
        return handleError(error, "food alternative");
    }
};

export const getAiHealthTip = async (): Promise<string> => {
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `As a nutrition and health expert, provide one concise, actionable health tip related to Indian food or lifestyle. The tip should be positive, encouraging, and under 50 words.`,
            config: {
                temperature: 0.8,
                topP: 0.95,
                topK: 64,
            },
        });
        return response.text;
    } catch (error) {
        return handleError(error, "health tip");
    }
};

// Fix: Add and export the missing `identifyFoodFromImage` function.
export const identifyFoodFromImage = async (imageDataUrl: string): Promise<string> => {
    try {
        if (!imageDataUrl.startsWith('data:image/')) {
            throw new Error('Invalid image data URL format');
        }
        
        const [meta, base64Data] = imageDataUrl.split(',');
        const mimeType = meta.match(/:(.*?);/)?.[1];

        if (!mimeType || !base64Data) {
            throw new Error('Could not parse image data URL');
        }

        const imagePart = {
            inlineData: {
                mimeType,
                data: base64Data,
            },
        };

        const textPart = {
            text: 'Identify the primary Indian food item in this image. Respond with only the name of the food (e.g., "Poha", "Masala Dosa"). If you cannot identify a specific dish with high confidence, respond with "Unknown".',
        };

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: { parts: [imagePart, textPart] },
            config: {
                temperature: 0.1,
                topK: 1,
            }
        });
        
        // Clean up the response to get just the food name, removing any trailing period.
        return response.text.trim().replace(/\.$/, '');

    } catch (error) {
        return handleError(error, "food identification");
    }
};

export const getAiCustomizedDietPlan = async (preferences: { diet: string; goal: string; portionSize: string; allergies: string; notes: string; }): Promise<string> => {
    const { diet, goal, portionSize, allergies, notes } = preferences;

    const prompt = `Create a one-day customized diet plan for me.
    My preferences are:
    - Dietary Preference: ${diet}
    - Health Goal: ${goal}
    - Desired Portion Size: ${portionSize}
    - Food I want to avoid (allergies/dislikes): ${allergies || 'None'}
    - Additional Notes: ${notes || 'None'}

    Please provide a plan focusing on Indian cuisine. Generate a creative name for the plan and a short description.
    The output must be a JSON object.`;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                temperature: 0.7,
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        planName: { type: Type.STRING, description: "A creative name for the diet plan." },
                        description: { type: Type.STRING, description: "A brief, encouraging description of the plan." },
                        meals: {
                            type: Type.OBJECT,
                            properties: {
                                breakfast: {
                                    type: Type.ARRAY,
                                    items: { type: Type.STRING },
                                    description: "List of food items for breakfast."
                                },
                                lunch: {
                                    type: Type.ARRAY,
                                    items: { type: Type.STRING },
                                    description: "List of food items for lunch."
                                },
                                dinner: {
                                    type: Type.ARRAY,
                                    items: { type: Type.STRING },
                                    description: "List of food items for dinner."
                                },
                                snacks: {
                                    type: Type.ARRAY,
                                    items: { type: Type.STRING },
                                    description: "List of food items for snacks."
                                },
                            },
                        },
                    },
                },
            },
        });
        return response.text;
    } catch (error) {
        return handleError(error, "custom diet plan");
    }
};

export const getAiCalorieBurnEstimate = async (activity: string, duration: number): Promise<string> => {
    const prompt = `As a fitness expert, estimate the calories burned for the following activity.
    Activity: "${activity}"
    Duration: ${duration} minutes
    Assume an average person weighing 70kg (155 lbs).
    The output must be a JSON object containing only the estimated calories burned.`;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                temperature: 0.2,
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        caloriesBurned: {
                            type: Type.NUMBER,
                            description: "The estimated number of calories burned, rounded to the nearest integer."
                        }
                    },
                    required: ["caloriesBurned"]
                },
            },
        });
        return response.text;
    } catch (error) {
        return handleError(error, "calorie burn estimate");
    }
};
