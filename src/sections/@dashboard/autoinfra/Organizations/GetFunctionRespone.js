import React, { useEffect, useState } from 'react';
import axios from 'axios';

function HttpListenerComponent() {
  const [response, setResponse] = useState(null);

  const pollServer = async () => {
    try {
      // Replace 'your-azure-function-url' with the actual URL of your Azure Function.
      const azureFunctionUrl = 'https://slahttprequest.azurewebsites.net/api/HttpTrigger1?code=aSM4UV0Xj2fkGsqvhdblcisahKGrFa0uZUEj8SyVRNv0AzFu-ALeZg==';

      // Make an HTTP GET request using Axios
      const response = await axios.get(azureFunctionUrl);

      if (response.status === 200) {
        // Process the response data as needed.
        const responseData = response.data;
        setResponse(responseData);

        // Call your custom function here with the response data
        handleResponse(responseData);
      }
    } catch (error) {
      console.error('Error polling server:', error);
    }
  };

  // Your custom function to handle the response data
  const handleResponse = (data) => {
    // Do something with the response data
    console.log('Received response:', data);
    // Call your custom function or perform actions here
    // For example: update state, trigger other functions, etc.
  };

  useEffect(() => {
    // Define a background polling interval (e.g., every 5 minutes)
    const pollInterval = 5 * 60 * 1000; // 5 minutes in milliseconds

    const intervalId = setInterval(() => {
      // Poll the server at the specified interval
      pollServer();
    }, pollInterval);

    // Initial poll when the component mounts
    pollServer();

    // Clean up the interval when the component unmounts
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div>
      <h2>HTTP Listener</h2>
      {response ? (
        <pre>{JSON.stringify(response, null, 2)}</pre>
      ) : (
        <p>Listening for HTTP requests...</p>
      )}
    </div>
  );
}

export default HttpListenerComponent;
