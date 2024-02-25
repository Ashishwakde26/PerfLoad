import Cpu from "./Cpu"
import Mem from "./Mem"
import Info from "./Info"
import './widget.css'
import socket from "../utilities/socketConnection";
import { useEffect, useState } from "react";



const Widget = ({data}) => {

    const [isAlive, setisAlive] = useState(true);

    const {freeMem,
        totalMem,
        usedMem,
        memUsage,
        ostype,
        upTime,
        cpuType,
        numCores,
        cpuSpeed,
        cpuLoad,
        macA} = data;

        const cpuData = { cpuLoad }
        const memData = { freeMem, totalMem, usedMem, memUsage }
        const infoData = { macA, ostype, upTime, cpuType, cpuSpeed, numCores}

    const notAliveDiv = !isAlive ? <div className="not-active">Offline</div> : <></>

    useEffect(() => {
        socket.on('connectedOrNot', ({isAlive, machineMacA}) => {
            if(machineMacA === macA) {
                setisAlive(isAlive)
            }
        })
    },[])

    return (
        <div className="widget row justify-content-evenly">
            <h1>Widget</h1>
            {notAliveDiv}
            <Cpu data={cpuData} />
            <Mem data={memData} />
            <Info data={infoData} />
        </div>
    )
}

export default Widget