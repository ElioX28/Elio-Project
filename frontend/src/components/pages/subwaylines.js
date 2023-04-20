import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios';
import getUserInfo from '../../utilities/decodeJwt'



function SubwayLines() {
  const [subwaylines, setSubwayLines] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [user, setUser] = useState({});
  const params = useParams();
  const navigate = useNavigate()
  const handleClick = (e) => {
    e.preventDefault();
    localStorage.removeItem('accessToken')
    return navigate('/')
}


useEffect(() => {
  axios
    .get('https://api-v3.mbta.com/routes', {
      params: {
        filter: {
          type: [0,1],
        },
      },
    })
    .then((response) => {
      setSubwayLines(response.data.data.slice(0, 8));
    })
    .catch((error) => {
      console.log(error);
    });
}, []);


  useEffect(() => {
    async function fetchData() {
      const result = await axios(
        'https://api-v3.mbta.com/alerts?page%5Blimit%5D=20&sort=-updated_at&filter%5Broute_type%5D=1&filter%5Bactivity%5D=BOARD%2CEXIT%2CRIDE'
      );
      setAlerts(result.data.data);
      setUser(getUserInfo());
    }
    fetchData();
  }, []);

  const buttonStyle = {
    display: 'inline-block',
    height: '180px',
    width: '400px',
    padding: '10px',
    margin: '5px',
    fontSize: '30px',
    backgroundColor: '#4c4c5c',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  };

  const alertBoxStyle = {
    display: 'inline-block',
    height: '750px',
    width: '800px',
    padding: '10px',
    margin: '5px',
    fontSize: '1em',
    backgroundColor: 'white',
    color: 'black',
    border: 'white',
    borderRadius: '5px',
    overflowY: 'scroll',
  };

  const alertStyle = {
    margin: '5px',
    padding: '10px',
    fontSize: '20px',
    backgroundColor: 'white',
    border: '3px solid #4c4c5c',
    borderRadius: '5px',
  }

  return (
    <div>
      <h1 className="text-center">MBTA Subway Lines and Alerts</h1>

      <div style={{ display: 'flex' }}>
        <div style={{ flex: 1 }}>
          {subwaylines.map((line) => (
            <button key={line.id} style={buttonStyle} onClick={ () => navigate(`/subwaylines/${line.id}`) }>
              {line.attributes.long_name}
            </button>
          ))}
        </div>

        <div style={{ flex: 1 }}>
          <div style={alertBoxStyle}>
            {alerts.length > 0 ? (
              alerts.map((alert) => (
                <div key={alert.id} style={alertStyle}>
                  <Card.Body>
                    <Card.Title>{alert.attributes.header}</Card.Title>
                    <Card.Text>{"Time: " + new Date(alert.attributes.updated_at).toLocaleString()}</Card.Text>
                  </Card.Body>
                </div>
              ))
            ) : (
              <p>No alerts to display</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SubwayLines;