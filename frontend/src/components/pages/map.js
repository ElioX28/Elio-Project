import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import stationsData from '/Users/kozetadimo/source/repos/Elio-Project/frontend/src/stations.json';

export default function Map() {
  const [stations, setStations] = useState((stationsData).stations);
  const [stationsg, setgreenline] = useState((stationsgData).stationsg);
  
 const newicon = new L.icon({
    iconUrl: "/MBTA_T_Logo_Red_MAGNET.webp",
    iconAnchor: [5, 55],
    popupAnchor: [10, -44],
    iconSize: [25, 25]
  
  });
  const newicon2 = new L.icon({
    iconUrl: "/MBTA_T_Logo_Green_MAGNET.webp",
    iconAnchor: [5, 55],
    popupAnchor: [10, -44],
    iconSize: [25, 25]
  
  });

  return (
    <MapContainer center={[42.3601, -71.0589]} zoom={13} style={{ height: '100vh', width: '100vw' }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {Array.isArray(stations) && stations.map((station) => (
        <Marker title= {station.line} icon={newicon} key={station.id} position={[station.latitude, station.longitude]}>
          <Popup>{station.name}</Popup>
        </Marker>))}
        {Array.isArray(stationsg) && stationsg.map((greenline) => (
        <Marker title= {greenline.line} icon={newicon2} key={greenline.id} position={[greenline.latitude, greenline.longitude]}>
          <Popup>{greenline.name}</Popup>
        </Marker>))}

    </MapContainer>
  );
}

