import { ImageAnnotatorClient } from '@google-cloud/vision';
import fs from 'fs/promises';

// Creates a client
const client = new ImageAnnotatorClient({
    keyFilename: './.oval-bricolage-437123-b7-be0847ae267d.json', // Update with your correct path
});

export const uploadAndDetectText = async (req, res) => {
    try {
        
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }
        
        // File path of the uploaded image
        const fileName = req.file.path;
        
        // Detect text using Google Vision API
        const [result] = await client.textDetection(fileName);
        const detections = result.textAnnotations;
        
        // Convert the result to JSON string and write to output.json
        const dictstring = JSON.stringify(detections);
        await fs.writeFile("output.json", dictstring);
        
        // Send response with the text detection results
        res.status(200).json({ message: 'Text detection completed', detections });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: 'Text detection failed', details: error.message });
    }
};
