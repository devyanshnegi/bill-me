import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

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

async function generateContent(imageData) {
  const imageFormat = imageData.toString("base64");
  const parts = [
    {
      text: "What is the text in the receipt/bill and output it as a json with parameters product name, product price and in the end the total price of the bill?",
    },
    {
      inlineData: {
        mimeType: "image/jpeg",
        data: imageFormat,
      },
    },
  ];
  const data = await model.generateContent({
    contents: [{ role: "user", parts }],
  });

  console.log("Generated Data:", data);

  const result = await data.response;
  const text = await result.text();
  return text;
}

export async function POST(req) {
  try {
    const { image } = await req.json();
    const buffer = Buffer.from(image.data, "base64");
    const recognizedText = await generateContent(buffer);
    return NextResponse.json({ response: { text: recognizedText } });
  } catch (error) {
    console.error("Error in API:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
