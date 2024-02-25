import logo from './logo.svg';
import './App.css';
import socket from './utilities/socketConnection';
import { useEffect, useState } from 'react';
import Widget from './perfDataComponent/Widget';

function App() {

  const [performanceData, setperformanceData] = useState({})

  useEffect(() => {

    socket.on('perfData', (data) => {
      // console.log(data)

      const copyPerfData = {...performanceData};

      copyPerfData[data.macA] = data;
      setperformanceData(copyPerfData);
    })

  },[])

  const widget = Object.values(performanceData).map(d=> <Widget data={d} key={d.macA}/>)

  return (
    <div className="container">
    {widget}
    </div>
  );
}

export default App;
