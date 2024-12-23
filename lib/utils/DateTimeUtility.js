import React from 'react';

  // Convert the timestamp and format the date and time
const DateTimeUtility = ({ timestamp }) => {
  const seconds = timestamp.seconds;
  const nanoseconds = timestamp.nanoseconds;

  const milliseconds = (seconds * 1000) + (nanoseconds / 1000000);
  const date = new Date(milliseconds);


  const formattedDate = date.toISOString().split('T')[0]; // YYYY-MM-DD
  // const formattedTime = date.toISOString().split('T')[1].split('.')[0]; // HH:MM:SS

  const timeFormatter = new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
    });
    const formattedTimeIn12Hour = timeFormatter.format(date);

  return (
      <p>{formattedDate} {formattedTimeIn12Hour}</p>
  );
};

export  { DateTimeUtility };