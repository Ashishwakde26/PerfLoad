import { useEffect } from 'react';
import socket from '../utilities/socketConnection';

const SecondTest = () => {

    useEffect(() => {
        socket.emit('secondTest', "DataDataDate")
    },[])
    return (
        <h2>Seconds Test App</h2>
    )
}

export default SecondTest