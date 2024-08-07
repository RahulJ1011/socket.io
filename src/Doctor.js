import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io();

const Doctor = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    socket.on('newRequest', (data) => {
      setRequests((prevRequests) => [...prevRequests, data]);
    });
  }, []);

  const sendResponse = (patientId) => {
    const response = {
      patientId,
      doctorId: socket.id,
      message: 'Your appointment is confirmed'
    };
    socket.emit('doctorResponse', response);
  };

  return (
    <div>
      <h1>Doctor</h1>
      {requests.map((request, index) => (
        <div key={index}>
          <p>Request from Patient: {request.message}</p>
          <button onClick={() => sendResponse(request.patientId)}>Respond</button>
        </div>
      ))}
    </div>
  );
};

export default Doctor;
