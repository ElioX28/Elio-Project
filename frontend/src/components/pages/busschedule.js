import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom'

function Busschedule() {
  const [scheduleData, setScheduleData] = useState([]);
  const [stopData, setStopData] = useState([]);
  const { bus } = useParams();
  const [direction, setDirection] = useState('inbound');

useEffect(() => {
    async function fetchSchedule() {
      try {
        const response = await axios.get(`https://api-v3.mbta.com/schedules?filter[route]${bus ? `=${bus}` : ''}&filter[direction_id]=${direction === 'inbound' ? 0 : 1}`);
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
  }, [bus, direction]);

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
  const arrivals = scheduleData
    .filter(schedule => {
      const arrivalTime = new Date(schedule.attributes.arrival_time).getTime();
      return arrivalTime > now;
    })
    .sort((a, b) => {
      const arrivalTimeA = new Date(a.attributes.arrival_time).getTime();
      const arrivalTimeB = new Date(b.attributes.arrival_time).getTime();
      return arrivalTimeA - arrivalTimeB;
    })
    .slice(0, 50);

    return (
      <div style={{backgroundColor: '#5B4EB9', color: 'white', height: '1500px', overflowY: 'scroll'}}>
        <h1>{bus} Line Schedule</h1>
        <div style={{marginBottom: '20px'}}>
          <span style={{marginRight: '10px'}}>Direction:</span>
          <select value={direction} onChange={(e) => setDirection(e.target.value)}>
            <option value="inbound">Inbound</option>
            <option value="outbound">Outbound</option>
          </select>
        </div>
        {arrivals.map(schedule => (
          <Card key={schedule.id} style={{backgroundColor: '#2C2B50', color: 'white'}}>
            <Card.Body>
              <Card.Title>{getStationName(schedule)}</Card.Title>
              <Card.Text>
                <p>Arrival Time: {convertToEST(schedule.attributes.arrival_time)}</p>
              </Card.Text>
            </Card.Body>
          </Card>
        ))}
      </div>
    );
}


export default Busschedule;