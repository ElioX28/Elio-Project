import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios';
import getUserInfo from '../../utilities/decodeJwt'



function Cmlinesschedule() {
  const { id } = useParams();

  return (
    <div>
      <h1>{id} Schedule</h1>
      <p>This is the schedule for {id}</p>
    </div>
  );
}

export default Cmlinesschedule;