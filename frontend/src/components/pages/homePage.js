import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import getUserInfo from '../../utilities/decodeJwt'
const HomePage = () => {
    const [user, setUser] = useState({})
    const navigate = useNavigate()
    const handleClick = (e) => {
        e.preventDefault();
        localStorage.removeItem('accessToken')
        return navigate('/')
    }
  //Ryan's Comment  
//Joes comment
    useEffect(() => {
        setUser(getUserInfo())
    }, [])


    if (!user) return (
        <div><h4>Log in to view this page.</h4></div>)
    const { id, email, username, password } = user
    return (
        <>
            <div>
                <h3 class="text-center">
                    Scheduling and Lines 
                    
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
                
                </div>
                </div>
            <button onClick={(e) => handleClick(e)}>
                Log Out
            </button>

           
        </>
    )
}

export default HomePage