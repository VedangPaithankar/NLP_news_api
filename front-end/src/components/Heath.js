import React, { useEffect, useState } from 'react';

const Health = () => {
    const [isHealthy, setIsHealthy] = useState(null); // State to hold health check status

    useEffect(() => {
        const checkHealth = async () => {
            try {
                const response = await fetch('https://nlp-news-api.onrender.com/health');
                const data = await response.json();
                // Check if the response contains success
                if (response.ok && data.status === 'Server is up and running') {
                    setIsHealthy(true);
                } else {
                    setIsHealthy(false);
                }
            } catch (error) {
                console.error('Error fetching health check:', error);
                setIsHealthy(false);
            }
        };

        checkHealth(); // Call the health check function
    }, []); // Empty dependency array to run only once on mount

    return (
        <div>
            {isHealthy === null && <p>Checking API health...</p>}
            {isHealthy === true && <p>NLP News API working.</p>}
            {isHealthy === false && <p>NLP News API not working.</p>}
        </div>
    );
};

export default Health;
