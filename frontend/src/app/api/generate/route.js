import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Google Generative AI with the API key
const genAI = new GoogleGenerativeAI("AIzaSyCs-pVDUMpLPNbtAIrry20ePkXF9vhfDEc");

const generationConfig = {
  temperature: 0.8,
  topP: 1,
  topK: 1,
  maxOutputTokens: 2048,
};

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  generationConfig,
});

// Function to convert image buffer to base64
async function convertImageToBase64(imageBuffer) {
  return imageBuffer.toString("base64");
}

// Function to generate content using Google Generative AI API
async function generateContent(base64Image) {
  // Log the base64-encoded image to check correctness
  console.log(
    "Base64 Image Data:",
    base64Image.substring(0, 100) + "...(truncated)"
  ); // Log only the first 100 characters for brevity

  const parts = [
    {
      text: "Extract only the price and product description from this bill image.",
    },
    {
      inlineData: {
        mimeType: "image/png", // Specify PNG as the MIME type
        data: base64Image, // Base64-encoded image data
      },
    },
  ];

  const data = await model.generateContent({
    contents: [{ role: "user", parts }],
  });

  // Check if the response has text and log it
  const result = await data.response;
  const text = await result.text();

  return text;
}

export async function POST(req) {
  try {
    // Log request reception
    console.log("Request received at /api/generate");

    // Parse the request body
    const { image } = await req.json();

    // Convert base64-encoded image data to buffer
    const buffer = Buffer.from(image.data, "base64");

    // Convert image buffer to base64
    const base64Image = await convertImageToBase64(buffer);

    // Generate content using the base64 image
    const recognizedText = await generateContent(base64Image);

    // Log the final extracted text
    console.log("Final extracted price and description:", recognizedText);

    // Return the response
    return NextResponse.json({ response: recognizedText });
  } catch (error) {
    // Log any error that occurs
    console.error("Error in /api/generate:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
