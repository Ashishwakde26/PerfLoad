const os = require('os')
const io = require('socket.io-client');
const option = {
    auth: {
        token: "df65r4g6rg54er98g465rg4ragr"
    }
}
const socket = io('http://localhost:3000', option)
socket.on('connect', ()=> {
    //console.log("We are connected to the server!")

    const nI = os.networkInterfaces();
    let macA;

    for(let key in nI) {
        const isInternetFacing = !nI[key][0].internal;

        if(isInternetFacing) {
            macA = nI[key][0].mac
            break;
        }
    }

    // console.log(macA)
    const perfDataInterval = setInterval(async() => {
        const perfData = await performanceLoadDate()
        perfData.macA = macA;
        socket.emit('perfData', perfData)
    },1000)

    socket.on('disconnect', ()=> {
        clearInterval(perfDataInterval)
    })
})

const cpuAverage = () => {

    const cpus = os.cpus();

    let idleMs = 0;
    let totalMS = 0;

    cpus.forEach(aCore => {

        for(mode in aCore.times) {
            totalMS +=  aCore.times[mode]
        }
        idleMs += aCore.times.idle;
    });
    return {
        idle : idleMs/cpus.length,
        total : totalMS/cpus.length
    }
}

const getCpuLoad = () => new Promise((resolve, reject) => {

    const start = cpuAverage()
    setTimeout(()=> {
        const end = cpuAverage()
        const idleDiff = end.idle - start.idle
        const totalDiff = end.total - start.total

     //   console.log(idleDiff, totalDiff)

        const percentOfCpu = 100 - Math.floor(100 * idleDiff/totalDiff);
        resolve(percentOfCpu)
    },100)
})


const performanceLoadDate = () => new Promise( async (resolve, reject) => {
    const cpus = os.cpus();

    const totalMem = os.totalmem();
    //console.log(totalMem)

    const freeMem = os.freemem();
    //console.log(freeMem);

    const usedMem = totalMem - freeMem
    const memUsage = Math.floor(usedMem / totalMem * 100) / 100

    //console.log(totalMem, freeMem,  memUsage)

    const ostype = os.type();
    //console.log(ostype);

    const upTime = os.uptime();
    //console.log(upTime);


    ///cpu type
    const cpuType = cpus[0].model;
    const numCores = cpus.length;
    const cpuSpeed = cpus[0].speed;

    const cpuLoad = await getCpuLoad();

    resolve({
        freeMem,
        totalMem,
        usedMem,
        memUsage,
        ostype,
        upTime,
        cpuType,
        numCores,
        cpuSpeed,
        cpuLoad
    })
}) 


// const run = async () => {
//     const data = await performanceLoadDate();
//     console.log(data);
// }

// run();