import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import getUserInfo from '../../utilities/decodeJwt'


function Alerts() {
  const [alerts, setAlerts] = useState([]);
  const [user, setUser] = useState({});

  useEffect(() => {
    async function fetchData() {
      const result = await axios(
        'https://api-v3.mbta.com/alerts?sort=banner&filter%5Bactivity%5D=BOARD%2CEXIT%2CRIDE',
      );
      setAlerts(result.data.data);
      setUser(getUserInfo())
    }
    fetchData();
  }, []);

  if (!user) return (
    <div><h4>Log in to view this page.</h4></div>)


  return (
    <div>
      {alerts.map(alert => (
        <Card
        body
        outline
        color="success"
        className="mx-1 my-2"
        style={{ width: "30rem" }}
      >
        <div class="alert alert-info">
        <Card.Body>
          
        <Card.Title>Alert</Card.Title>
        <Card.Text>{alert.attributes.header}{alert.attributes.description}</Card.Text>
         
        </Card.Body>
        </div>
      </Card>
      ))}

        <h1>Alerts!</h1>
      {alerts.map(alert => (  
        <div key={alert.id}>
          <h3>{alert.attributes.header}</h3>
          <p>{alert.attributes.description}</p>
        </div>
      ))}
    </div>
  );
}

export default Alerts;
