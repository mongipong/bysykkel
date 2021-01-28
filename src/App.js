import React, { useState, useEffect } from 'react';
import StationInfo from './components/stationInfo';

function App() {

  const [stations, setStations] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [isStationLoaded, setStationIsLoaded] = useState(false);
  const [isStatusLoaded, setStatusIsLoaded] = useState(false);

  const handleStations = async () => {
    try {
      const stationResponse = await fetch(`https://gbfs.urbansharing.com/oslobysykkel.no/station_information.json`,
      {        
          headers: {
            'Client-Identifier': 'myCity_BikeMonitor',
          },
        }
      );
      const stationData = await stationResponse.json();      
      setStations(stationData.data);
      setStationIsLoaded(true);
    }
    catch (e) {
      console.error(e);
    }
  };

  const handleStatus = async () => {
    try {
      const statusResponse = await fetch(`https://gbfs.urbansharing.com/oslobysykkel.no/station_status.json`,
        {
          headers: {
            'Client-Identifier': 'myCity_BikeMonitor',
          },
        }      
      );      
      const statusData = await statusResponse.json();    
      setStatuses(statusData.data);
      setStatusIsLoaded(true);
    }
    catch (e) {
      console.error(e)
    }
  };

  useEffect(() => {
    handleStations();
    const interval = setInterval(() => {
      handleStations();
    }, 10000);
    return () => clearInterval(interval);  
  }, []);

  useEffect(() => {
    handleStatus();
    const interval = setInterval(() => {
      handleStatus();
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const renderData = () => {   
    return (
    <StationInfo stations={stations} statuses={statuses}/>
    )
  }

  return isStationLoaded && isStatusLoaded ? renderData() : (<div> Loading...</div>);
}

export default App;
