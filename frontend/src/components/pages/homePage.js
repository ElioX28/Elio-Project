import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import getUserInfo from '../../utilities/decodeJwt'


const HomePage = () => {
    const [user, setUser] = useState({})
    const navigate = useNavigate()
    const [alerts, setAlerts] = useState([]);
    const handleClick = (e) => {
        e.preventDefault();
        localStorage.removeItem('accessToken')
        return navigate('/')
    }
    useEffect(() => {
        async function fetchData() {
          const result = await axios(
            'https://api-v3.mbta.com/alerts?page%5Blimit%5D=20&sort=-created_at&filter%5Bactivity%5D=BOARD%2CEXIT%2CRIDE',
          );
          setAlerts(result.data.data);
          setUser(getUserInfo())
        }
        fetchData();
      }, []);

    if (!user) return (
        <div><h4>Log in to view this page.</h4></div>)
    const { id, email, username, password, favline, zipcode } = user
    return (
        <>
            <div>
                <h3 class="text-center">
                    Methods of Transportation
                    
                </h3>
            </div>
            <div class="container">

            <div class="row g-3">
                <div class="col-12 col-md-6 col-lg-4">
                    <div clas="card">
                        <button  class="btn-warning" onClick={(e) => handleClick('/cmlines')}>
                        <img src="Picture1.png" alt="Commuter Rail" class="card-img-top" onClick={ () => navigate('/cmlines') }></img>
                        <div class="card-body">
                        
                            <h5 clas="card-title ">Commuter Rail</h5>
                            
                            
                        </div>
                        </button>
                        
                    </div>
                </div>
                <div class="col-12 col-md-6 col-lg-4">
                <button    onClick={(e) => handleClick('/subwaylines')}>
                <img src="Picture2.png" alt="Subway" class="card-img-top" onClick={ () => navigate('/subwaylines') }></img>
                        <div class="card-body">
                            <h5 clas="card-title">Subway</h5>
                            
                            
                        </div>
                        </button>
                </div>
                <div class="col-12 col-md-6 col-lg-4">
                <button   onClick={(e) => handleClick('/buslines')}>
                <img src="Picture3.png" alt="Bus"   class="card-img-top" onClick={ () => navigate('/buslines') }></img>
                        <div class="card-body">
                            <h5 clas="text-center">Busses</h5>
                            </div>
                            </button>
                            </div>

                <div class="col-12 col-md-6 col-lg-4">
                <button   onClick={(e) => handleClick('/ferrylines')}>
                <img src="ferrypicture.png" alt="Ferry"   class="card-img-top" onClick={ () => navigate('/ferrylines') }></img>
                        <div class="card-body">
                            <h5 clas="text-center">Ferry</h5>
                            </div>
                            </button>
                </div>

    <div>
      
      
      
    <div style={{ height: '200px', overflowY: 'scroll' }}>
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
        <Card.Title>Time</Card.Title>
        <Card.Text>{alert.attributes.updated_at}</Card.Text>

        </Card.Body>
      </div>
    </Card>
  ))}
</div>

      
    </div>

                
                </div>
                </div>
            <button onClick={(e) => handleClick(e)}>
                Log Out
            </button>

           
        </>
    )
}

export default HomePage