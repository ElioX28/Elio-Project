import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import getUserInfo from '../../utilities/decodeJwt'


function SubwayLines() {
  const [subwaylines, setSubwayLines] = useState([]);
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
        'https://api-v3.mbta.com/lines?page%5Blimit%5D=5&sort=sort_order',
        
      );
      setSubwayLines(result.data.data);
      setUser(getUserInfo())
    }
    fetchData();
  }, []);

  if (!user) return (
    <div><h4>Log in to view this page.</h4></div>)

  return (

    <div>   
    <h3 class="text-left-center">
        Subway Lines 
        
    </h3>
      {subwaylines.map(subwaylines => (
        <Card
        body
        outline
        color="success"
        className="mx-1 my-2"
        style={{ width: "30rem" }}
      >
        <Card.Body>
          <button onClick={(e) => handleClick('/subwaylines')}>
        <Card.Title>{subwaylines.attributes.long_name}</Card.Title>
        <Card.Text>{subwaylines.attributes.short_name}</Card.Text>
        </button>
        </Card.Body>
      </Card>
      ))}

3
    </div>
  );
}

export default SubwayLines;