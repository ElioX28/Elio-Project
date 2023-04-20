import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import getUserInfo from '../../utilities/decodeJwt';
import Card from 'react-bootstrap/Card';

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

  if (!user.id) return <h4>Please log in to view this page.</h4>;

  return (
    <>
      <div className="container">
        <h3 className="text-center my-5">Methods of Transportation</h3>
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4 justify-content-center">
          {[{name: "Commuter Rail",imgSrc: "commuterrailicon.png",onClick: () => navigate("/cmlines"), color: "#84246c"},{name: "Subway",imgSrc: "subwayicon.png",onClick: () => navigate("/subwaylines"),color: "#4c4c5c"},{name: "Bus",imgSrc: "busicon.png",onClick: () => navigate("/buslines"),color: "#fac32c"},{name: "Ferry",imgSrc: "ferryicon.png",onClick: () => navigate("/ferrylines"),color: "#058cac"},].map((transportation, index) => (
            <div className="col" key={index} style={{ width: "330px" }}>
              <div className="card" style={{ height: "375px" }}>
                <button
                  className="btn"
                  onClick={transportation.onClick}
                  style={{ width: "100%", height: "100%", backgroundColor: transportation.color }}
                >
                  <img
                    src={transportation.imgSrc}
                    alt={transportation.name}
                    className="card-img-top"
                    style={{ width: "100%", height: "75%" }}
                  />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
  
};

export default HomePage;