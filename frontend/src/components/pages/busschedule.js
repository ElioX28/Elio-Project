import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom'

function Busschedule() {
  const [scheduleData, setScheduleData] = useState([]);
  const { bus } = useParams();

  useEffect(() => {
    async function fetchSchedule() {
      try {
        const response = await axios.get(`https://api-v3.mbta.com/schedules?filter[route]${bus ? `=${bus}` : ''}`);
        setScheduleData(response.data.data);
      } catch (error) {
        console.error(error);
      }      
    }

    fetchSchedule();
  }, [bus]);

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

  return (
    <div style={{backgroundColor: '#5B4EB9', color: 'white'}}>
      <h1>{bus} Line Schedule</h1>
      {scheduleData.map(schedule => (
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