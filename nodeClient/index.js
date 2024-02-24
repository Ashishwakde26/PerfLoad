const os = require('os')

const cpus = os.cpus();

const totalMem = os.totalmem();
//console.log(totalMem)

const freeMem = os.freemem();
//console.log(freeMem);

const usedMem = totalMem - freeMem
const memUsage = Math.floor(usedMem/totalMem*100)/100

//console.log(totalMem, freeMem,  memUsage)

const ostype = os.type();
//console.log(ostype);

const upTime = os.uptime();
//console.log(upTime);


///cpu type
const cpuType = cpus[0].model;
const numCores = cpus.length;
const cpuSpeed = cpus[0].speed;

//console.log(cpus)
//console.log(cpuType, numCores, cpuSpeed)

function cpuAverage() {

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

function getCpuLoad() {
    const start = cpuAverage()

    setTimeout(()=> {

        const end = cpuAverage()
        const idleDiff = end.idle - start.idle
        const totalDiff = end.total - start.total

        console.log(idleDiff, totalDiff)

        const percentOfCpu = 100 - Math.floor(100 * idleDiff/totalDiff);
        console.log(percentOfCpu)

    },100)
}


setInterval(() => {
    getCpuLoad();
},1000)
