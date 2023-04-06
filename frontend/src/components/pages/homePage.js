import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import getUserInfo from '../../utilities/decodeJwt';

const HomePage = () => {
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get('https://api-v3.mbta.com/alerts', {
        params: {
          'page[limit]': 20,
          sort: '-created_at',
          'filter[activity]': 'BOARD,EXIT,RIDE',
        },
      });
      setAlerts(result.data.data);
      setUser(getUserInfo());
    };
    fetchData();
  }, []);

  const handleClick = () => {
    localStorage.removeItem('accessToken');
    navigate('/');
  };

  if (!user.id) return <div><h4>Log in to view this page.</h4></div>;

  return (
    <>
      <div>
        <h3 class="text-center">
          Methods of Transportation
        </h3>
      </div>
      <div class="container">
        <div class="row g-3 justify-content-start"> {/* Add justify-content-start class to move pictures to left */}
          {[
            {
              name: 'Commuter Rail',
              imgSrc: 'commuterrailicon.png',
              onClick: () => navigate('/cmlines'),
            },
            {
              name: 'Subway',
              imgSrc: 'subwayicon.png',
              onClick: () => navigate('/subwaylines'),
            },
            {
              name: 'Bus',
              imgSrc: 'busicon.png',
              onClick: () => navigate('/buslines'),
            },
            {
              name: 'Ferry',
              imgSrc: 'ferryicon.png',
              onClick: () => navigate('/ferrylines'),
            },
          ].map((transportation, index) => (
            <div class="col-12 col-md-6 col-lg-4" key={index}>
              <div clas="card">
                <button class="btn-warning" onClick={transportation.onClick}>
                  <h5 clas="card-title "></h5>
                  <img src={transportation.imgSrc} alt={transportation.name} class="card-img-top"></img>
                  <div class="card-body"></div>
                </button>
              </div>
            </div>
          ))}
        </div>
        <div class="float-end"> {/* Add float-end class to move alerts to right */}
          <div style={{ height: '900px', overflowY: 'scroll' }}>
            {alerts.map((alert, index) => (
              <Card
                key={index}
                body
                outline
                color="success"
                className="mx-1 my-2"
                style={{ width: '30rem' }}
              >
                <div class="alert alert-info">
                  <Card.Body>
                    <Card.Title>Alert</Card.Title>
                    <Card.Text>
                    {alert.attributes.header + alert.attributes.description}
                    </Card.Text>
                    <Card.Text>
                    Time: {new Date(alert.attributes.updated_at).toLocaleString()}
                    </Card.Text>

                  </Card.Body>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
      <button onClick={handleClick}>
        Log Out

      </button>
    </>
  );
};

export default HomePage;