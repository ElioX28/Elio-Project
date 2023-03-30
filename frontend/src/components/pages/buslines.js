import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import getUserInfo from '../../utilities/decodeJwt'


function BusLines() {
  const [buslines, setBusLines] = useState([]);
  const [user, setUser] = useState({});
  const navigate = useNavigate()
  const handleClick = (e) => {
    e.preventDefault();
    localStorage.removeItem('accessToken')
    return navigate('/')
}

  useEffect(() => {
    async function fetchData() {
      const result = await axios(
        'https://api-v3.mbta.com/lines?page%5Boffset%5D=5&page%5Blimit%5D=2&sort=sort_order',
        
      );
      setBusLines(result.data.data);
      setUser(getUserInfo())
    }
    fetchData();
  }, []);

  if (!user) return (
    <div><h4>Log in to view this page.</h4></div>)

  return (
    <div>
        <h3 class="text-left-center">
        Bus Lines 
        
    </h3>
      {buslines.map(buslines => (
        <Card
        body
        outline
        color="success"
        className="mx-1 my-2"
        style={{ width: "30rem" }}
      >
        <Card.Body>
          <button onClick={(e) => handleClick('/buslines')}>
        <Card.Title>{buslines.attributes.long_name}</Card.Title>
        <Card.Text>{buslines.attributes.short_name}</Card.Text>
        </button>
        </Card.Body>
      </Card>
      ))}

    </div>
  );
}

export default BusLines;