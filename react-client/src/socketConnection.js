import io from 'socket.io-client'
const options = {
    auth: { token : "efw6e5f16f51r6f24654"}
}
const socket = io.connect('http://localhost:3000', options);
// socket.on('welcome', (data) => {
//     console.log(data);
// })

export default socket;