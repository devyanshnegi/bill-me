import { ImageAnnotatorClient } from '@google-cloud/vision';

// Creates a client
const client = new ImageAnnotatorClient();

/**
 * TODO(developer): Uncomment the following line before running the sample.
 */
 const fileName = 'C:\Users\santh\billme\Screenshot 2024-09-28 162214.png6';

// Performs text detection on the local file
const [result] = await client.textDetection(fileName);
const detections = result.textAnnotations;
console.log('Text:');
detections.forEach(text => console.log(text));