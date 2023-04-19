import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import { useParams } from 'react-router-dom'

function Subwayschedule() {
  const [scheduleData, setScheduleData] = useState([]);
  const [stopData, setStopData] = useState([]);
  const { subway } = useParams();

  useEffect(() => {
    async function fetchSchedule() {
      try {
        const response = await axios.get(`https://api-v3.mbta.com/schedules?filter[route]${subway ? `=${subway}` : ''}`);
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
  }, [subway]);

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
  const next20Arrivals = scheduleData
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
    <div style={{backgroundColor: '#5B4EB9', color: 'white'}}>
      <h1>{subway} Line Schedule</h1>
      {next20Arrivals.map(schedule => (
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

export default Subwayschedule;
