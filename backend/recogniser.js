import { ImageAnnotatorClient } from '@google-cloud/vision';
import fs from 'fs/promises'
// Creates a client
const client = new ImageAnnotatorClient({
    keyFilename: './.oval-bricolage-437123-b7-be0847ae267d.json',
}
);

/**
 * TODO(developer): Uncomment the following line before running the sample.
 */
 const fileName = './bill.jpg';
try{
    const [result] = await client.textDetection(fileName);
    const detections = result.textAnnotations;
    var dictstring = JSON.stringify(detections);
    await fs.writeFile("output.json", dictstring);
}
// Performs text detection on the local file
catch(error){
    console.error('Error: ' + error.message)
}
