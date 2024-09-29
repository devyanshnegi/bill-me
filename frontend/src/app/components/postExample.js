import React, { useState } from 'react';

const App = () => {
  const [field1, setField1] = useState('');
  const [field2, setField2] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Make the POST request to the backend
    fetch('http://localhost:5000/api/data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ field1, field2 }), // Send the form data as JSON
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data); // Log the response
        alert('Data posted successfully');
      })
      .catch((error) => {
        console.error('Error posting data:', error);
      });
  };

  return (
    <div>
      <h1>Submit Data to Bill-Me</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Field 1:</label>
          <input
            type="text"
            value={field1}
            onChange={(e) => setField1(e.target.value)}
          />
        </div>
        <div>
          <label>Field 2:</label>
          <input
            type="text"
            value={field2}
            onChange={(e) => setField2(e.target.value)}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default App;
