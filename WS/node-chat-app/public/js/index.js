const socket = io();

socket.on('connect', () => {

    socket.emit('createMessage', {
        from: 'Andrew',
        to: 'Andrew@test.com',
        text: 'Send a message to someone else',
        createdAt: Date.now()
    });
});

socket.on('newMessage', (message) => {
    console.log(message);
});

socket.on('disconnect', () => {
    console.log('disconnected from socket');
});
