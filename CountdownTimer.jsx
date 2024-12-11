import React, { useState, useEffect } from 'react';

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState(() => {
    // Check if there's a stored countdown time in localStorage
    const savedTime = localStorage.getItem('countdownEndTime');
    
    if (savedTime) {
      // If there's a saved time, calculate remaining time
      const endTime = parseInt(savedTime, 10);
      const currentTime = Date.now();
      
      if (currentTime < endTime) {
        return Math.max(0, Math.floor((endTime - currentTime) / 1000));
      }
    }
    
    // If no saved time or time has expired, set to 24 hours
    const newEndTime = Date.now() + 24 * 60 * 60 * 1000;
    localStorage.setItem('countdownEndTime', newEndTime.toString());
    return 24 * 60 * 60; // 24 hours in seconds
  });

  useEffect(() => {
    // If time is already 0, don't start the timer
    if (timeLeft <= 0) return;

    // Set up interval to update countdown every second
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(timer);
  }, []);

  // Format time into hours, minutes, seconds
  const formatTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div 
      className="absolute z-10 top-4 right-4 bg-black bg-opacity-50 text-white px-4 py-2 rounded-lg"
      style={{ 
        fontSize: '1.5rem', 
        fontWeight: 'bold',
        backdropFilter: 'blur(5px)'
      }}
    >
      {formatTime(timeLeft)}
    </div>
  );
};

export default CountdownTimer;