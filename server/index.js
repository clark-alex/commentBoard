const express = require('express')
    , socket = require('socket.io')

const app = express()
const port = 3333
app.use(express.static(`${__dirname}/../build`))


const io = socket(app.listen(port, () => console.log(`listening on port ${port}`)))

io.on('connection', socket => {
    console.log('User Connected')
    socket.emit("welcome", { userId: socket.id })
    //...listen for events and emit to connected sockets
    // anything that happens inside this callback function that is not nested inside an event, will happen immediately on connection.
    socket.on('message sent', (data) => {
        console.log('data',data)
        // "data" represents incoming data from the client
        //...do things like perform logic, store data in db, join room, emit data to connected sockets, etc.
        io.emit('message dispatched', data)
        socket.on('disconnect', () => {
            console.log('User Disconnected');
        })
    })
})
