const path      = require('path');
const http      = require('http');
const express   = require('express');
const socketIO  = require('socket.io');
/*
 *  GLOBAL CONSTANTS (I WOULD NORMALLY HAVE THESE IN A CONFIG/ENV FILE)
 */
const PORT = process.env.PORT || 3000;
const PUBLIC_PATH = path.join(__dirname, '../public');
/*
 *  START EXPRESS
 */
const app    = express();
const server = http.createServer(app);
const io     = socketIO(server);
/*
 *  CONFIG EXPRESS
 */
app.use(express.static(PUBLIC_PATH));
/*
 *  SOCKET METHODS
 */
io.on('connection', (socket) => {
    console.log('A user just connected');
    /*
     *  messages to the client
     */
    socket.emit('newMessage', {
        from: 'Andrew',
        to: 'brittany@test.com',
        text: 'Hi, what is going on',
        createdAt: Date.now()
    });
    /*
     *  messages from the client
     */
    socket.on('createMessage', (message) => {
        console.log(message);
    });
    /*
     *  WHEN DISCONNECT HAPPENS
     */
    socket.on('disconnect', () => {
        console.log('A user just disconnected');
    });
});
/*
 *  START THE SERVER
 */
server.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
});