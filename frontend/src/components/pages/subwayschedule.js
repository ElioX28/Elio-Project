import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import { useParams } from 'react-router-dom'

function Subwayschedule() {
  const [scheduleData, setScheduleData] = useState([]);
  const [stopData, setStopData] = useState([]);
  const { subway, color } = useParams();
  const [direction, setDirection] = useState('inbound'); // default to inbound
  const [searchTerm, setSearchTerm] = useState('');


  useEffect(() => {
    async function fetchSchedule() {
      try {
        const response = await axios.get(`https://api-v3.mbta.com/schedules?filter[route]${subway ? `=${subway}` : ''}&filter[direction_id]=${direction === 'inbound' ? 0 : 1}`);
        setScheduleData(response.data.data);
      } catch (error) {
        console.error(error);
      }      
    }

    async function fetchStops() {
      try {
        const response = await axios.get('https://api-v3.mbta.com/stops');
        setStopData(response.data.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchSchedule();
    fetchStops();
  }, [subway, direction]);

  const convertToEST = (timeString) => {
    const date = new Date(timeString);
    const options = {timeZone: "America/New_York", hour12: true, hour: 'numeric', minute: 'numeric', weekday: 'short', month: 'short', day: 'numeric'};
    return date.toLocaleString('en-US', options);
  }

  const getStationName = (schedule) => {
    const stopId = schedule.relationships.stop.data.id;
    const stop = stopData.find(stop => stop.id === stopId);
    return stop?.attributes?.name || stopId;
  }

  const now = new Date().getTime();
  const filteredArrivals = scheduleData
    .filter(schedule => {
      const arrivalTime = new Date(schedule.attributes.arrival_time).getTime();
      return arrivalTime > now;
    })
    .sort((a, b) => {
      const arrivalTimeA = new Date(a.attributes.arrival_time).getTime();
      const arrivalTimeB = new Date(b.attributes.arrival_time).getTime();
      return arrivalTimeA - arrivalTimeB;
    })
    .filter(schedule => {
      const stationName = getStationName(schedule).toLowerCase();
      return stationName.includes(searchTerm.toLowerCase());
    })
    .slice(0, 75);

    function darkenColor(color, percentage) {
      // Convert color from hex string to RGB values
      let r = parseInt(color.substr(0, 2), 16);
      let g = parseInt(color.substr(2, 2), 16);
      let b = parseInt(color.substr(4, 2), 16);
    
      // Calculate new RGB values based on percentage
      r = Math.round(r * (1 - percentage));
      g = Math.round(g * (1 - percentage));
      b = Math.round(b * (1 - percentage));
    
      // Convert new RGB values back to hex string
      let newColor = '#' + r.toString(16).padStart(2, '0') + g.toString(16).padStart(2, '0') + b.toString(16).padStart(2, '0');
    
      return newColor;
    }

    return (
      <div style={{backgroundColor: 'white', color: darkenColor(color, 0.3)}}>
        <h1>{subway} Line Schedule</h1>
        <div style={{marginBottom: '20px'}}>
          <span style={{marginRight: '10px'}}>Direction:</span>
          <select value={direction} onChange={(e) => setDirection(e.target.value)}>
            <option value="inbound">Inbound</option>
            <option value="outbound">Outbound</option>
          </select>
          <span style={{marginLeft: '10px'}}>Search for a Stop:</span>
          <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} style={{marginLeft: '10px'}} />
        </div>
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '15px'}}>
          {filteredArrivals.map(schedule => (
            <Card key={schedule.id} style={{backgroundColor: `#${color}`, color: 'white', width:'300px'}}>
              <Card.Body>
                <Card.Title>{getStationName(schedule)}</Card.Title>
                <Card.Text>
                  <p>Arrival Time: {convertToEST(schedule.attributes.arrival_time)}</p>
                </Card.Text>
              </Card.Body>
            </Card>
          ))}
        </div>
      </div>
    );
  
    
}

export default Subwayschedule;

