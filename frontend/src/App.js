import React from "react";
// We use Route in order to define the different routes of our application
import { Route, Routes } from "react-router-dom";

// We import all the components we need in our app
import Navbar from "./components/navbar";
import LandingPage from "./components/pages/landingPage";
import Alerts from "./components/pages/alertstest";
import Lines from "./components/pages/cmlines";
import SubwayLines from "./components/pages/subwaylines";
import BusLines from "./components/pages/buslines";
import FerryLines from "./components/pages/ferrylines";
import HomePage from "./components/pages/homePage";
import Login from "./components/pages/loginPage";
import Signup from "./components/pages/registerPage";
import PrivateUserProfile from "./components/pages/privateUserProfilePage";
import AddCommentPage from "./components/pages/addCommentPage";
import Map from "./components/pages/map";
import { createContext, useState, useEffect } from "react";
import getUserInfo from "./utilities/decodeJwt";
import Cmlinesschedule from "./components/pages/cmlinesschedule";
import Ferryschedule from "./components/pages/ferryschedule";
import Busschedule from "./components/pages/busschedule";
import Subwayschedule from "./components/pages/subwayschedule";



export const UserContext = createContext();
//test change
//test again
const App = () => {
  const [user, setUser] = useState();

  useEffect(() => {
    setUser(getUserInfo());
  }, []);

  return (
    <>
      <Navbar />
      <UserContext.Provider value={user}>
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route exact path="/home" element={<HomePage />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/alerts" element={<Alerts />} />
          <Route exact path="/cmlines" element={<Lines />} />
          <Route exact path="/cmlines/:id" element={<Cmlinesschedule />} />
          <Route exact path="/subwaylines" element={<SubwayLines />} />
          <Route exact path="/buslines" element={<BusLines />} />
          <Route exact path="/ferrylines" element={<FerryLines />} />
          <Route exact path="/subwaylines/:subway" element={<Subwayschedule  />} />
          <Route exact path="/buslines/:bus" element={<Busschedule  />} />
          <Route exact path="/ferrylines/:ferry" element={<Ferryschedule  />} />
          <Route path="/privateUserProfile" element={<PrivateUserProfile />} />
          <Route path="/addComment" element={<AddCommentPage />} />
          <Route path="/map" element={<Map />} />    
        </Routes>
      </UserContext.Provider>
    </>
  );
};



export default App
