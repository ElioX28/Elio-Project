import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import stationsData from '/Users/kozetadimo/source/repos/Elio-Project/frontend/src/stations.json';

export default function Map() {
  const [stations, setStations] = useState(stationsData);

  return (
    <MapContainer center={[42.3601, -71.0589]} zoom={13} style={{ height: '100vh', width: '100vw' }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {Array.isArray(stations) && stations.map((station) => (
        <Marker key={station.id} position={[station.latitude, station.longitude]}>
          <Popup>{station.name}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

