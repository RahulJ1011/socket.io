const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const PORT = process.env.PORT || 3001;


app.use(express.static(path.join(__dirname, 'client/build')));

io.on('connection', (socket) => {
  console.log('New client connected:', socket.id);


  socket.on('patientRequest', (data) => {
    console.log('Patient request:', data);
    io.to(data.doctorId).emit('newRequest', data);
  });


  socket.on('doctorResponse', (data) => {
    console.log('Doctor response:', data);
    io.to(data.patientId).emit('responseReceived', data);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
