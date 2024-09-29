import React, { useEffect, useState } from 'react';

const App = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/data')
      .then((response) => response.json())
      .then((data) => {
        console.log(data); // Log the response to see it in the console
        setData(data.message); // Store the fetched message in state
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []); // Empty dependency array means this runs once when the component mounts

  return (
    <div>
      <h1>Bill-Me Data</h1>
      <p>{data ? data : 'Loading...'}</p>
    </div>
  );
};

export default App;
