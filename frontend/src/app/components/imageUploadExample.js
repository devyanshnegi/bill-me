import React, { useState } from 'react';

const ImageUpload = () => {
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleUpload = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('image', selectedFile);  // 'image' matches the name in multer.single('image')

        const response = await fetch('http://localhost:5000/api/vision/upload', {
            method: 'POST',
            body: formData,
        });

        const data = await response.json();
        console.log(data);  // This will log the detected text data
    };

    return (
        <div>
            <h1>Upload an Image</h1>
            <form onSubmit={handleUpload}>
                <input type="file" onChange={handleFileChange} />
                <button type="submit">Upload and Detect Text</button>
            </form>
        </div>
    );
};

export default ImageUpload;
