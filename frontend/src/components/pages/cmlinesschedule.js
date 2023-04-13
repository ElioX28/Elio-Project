// react hello world 

import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import getUserInfo from '../../utilities/decodeJwt'


function cmlinesschedule() {
    return (
        <div>
            <h1>hello world</h1>
        </div>
    )
}

export default cmlinesschedule;
