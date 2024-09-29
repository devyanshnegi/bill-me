import { IncomingForm } from "formidable";
import { promises as fs } from "fs";
import Tesseract from "tesseract.js";
import { Configuration, OpenAIApi } from "openai";
import path from "path";

// Disable bodyParser for file uploads
export const config = {
  api: {
    bodyParser: false,
  },
};

// OpenAI API setup
const openai = new OpenAIApi(
  new Configuration({
    apiKey: process.env.OPENAI_API_KEY, // Use your OpenAI API key from environment variables
  })
);

export default async function upload(req, res) {
  const form = new IncomingForm();

  // Parse the form to get the uploaded file
  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(500).json({ error: "Error parsing the form" });
    }

    // Get the file path of the uploaded file
    const filePath = files.file.filepath;

    try {
      // Perform OCR using Tesseract.js to extract text from the image
      const {
        data: { text: extractedText },
      } = await Tesseract.recognize(filePath, "eng");

      // Send the extracted text to OpenAI to recognize and structure items
      const prompt = `Extract the item names and prices from this bill: "${extractedText}". Format the response as a list of items with names and prices.`;

      const openaiResponse = await openai.createCompletion({
        model: "gpt-4", // Use GPT-4 or GPT-3.5 based on your plan
        prompt: prompt,
        temperature: 0.2, // Keep the temperature low for factual accuracy
        max_tokens: 500, // Adjust based on the bill size
      });

      const items = openaiResponse.data.choices[0].text.trim();

      // Return the items recognized by OpenAI
      res.status(200).json({ items });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error processing bill" });
    }
  });
}
