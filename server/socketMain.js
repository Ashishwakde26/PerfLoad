const socketMain = (io) => {
    io.on("connection", (socket) => {

        const auth = socket.handshake.auth;
        console.log(auth.token)

        if(auth.token === "df65r4g6rg54er98g465rg4ragr") {
            //valid node client
            socket.join('nodeClient')
        } else if(auth.token === "efw6e5f16f51r6f24654") {
            //valid react client
            socket.join('reactClient')
        } else {
            socket.disconnect();
            console.log("YOU HAVE BEED DISCONNECTED !!!")
        }

        console.log(`Someone connected on worker ${process.pid}`)
        socket.emit('welcome', "Welcome to our cluster driven socket.io server!")

        socket.on('perfData', (data) => {
            console.log("Tick...");
            console.log(data);
        })

        socket.on('testConnection', (data) => {
            console.log(data);
        })

        socket.on('secondTest', (data) => {
            console.log(data);
        })
      });
}

module.exports = socketMain