import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom'

function Ferryschedule() {
  const [scheduleData, setScheduleData] = useState([]);
  const { ferry, name } = useParams();

  useEffect(() => {
    async function fetchSchedule() {
      try {
        const response = await axios.get(`https://api-v3.mbta.com/schedules?filter[route]${ferry ? `=${ferry}` : ''}`);
        setScheduleData(response.data.data);
      } catch (error) {
        console.error(error);
      }      
    }

    fetchSchedule();
  }, [ferry]);

  const convertToEST = (timeString) => {
    const date = new Date(timeString);
    const options = {timeZone: "America/New_York", hour12: true, hour: 'numeric', minute: 'numeric', weekday: 'short', month: 'short', day: 'numeric'};
    return date.toLocaleString('en-US', options);
  }

  const getStationName = (schedule) => {
    const pattern = /^place-(\w+)/;
    const match = schedule.relationships.stop.data.id.match(pattern);
    if (match && match.length > 1) {
      return match[1];
    }
    return schedule.relationships.stop.data.id;
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
      <div style={{backgroundColor: 'white', color: '#007288'}}>
        <h1>{name} Schedule</h1>
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '15px'}}>
          {arrivals.map(schedule => (
            <Card key={schedule.id} style={{backgroundColor: '#058cac', color: 'white', width:'300px'}}>
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


export default Ferryschedule;