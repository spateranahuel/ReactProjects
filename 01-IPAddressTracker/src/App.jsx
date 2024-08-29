import './App.css'
import { useEffect, useState, useRef } from 'react'
import arrowIMG from './images/icon-arrow.svg'
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import Results from '../../pruebaMapa/src/components/Results';
const GEO_IP_KEY = '4b0e602accf285';

function App() {
  const [ipData, setIpData] = useState(null);

  const mapRef = useRef(null);
  const markerRef = useRef(null)



  useEffect(() => {
    // Initialize the map
    if (!mapRef.current) {
      const lat = 34.0553;
      const lng = -117.7523;

      // Create the map instance
      mapRef.current = L.map('map').setView([lat, lng], 13);

      // Establecer los límites del mapa
      const bounds = L.latLngBounds(
        L.latLng(-85, -180), // Sudoeste
        L.latLng(85, 180)    // Noreste
      );

      mapRef.current.setMaxBounds(bounds);


      // Añadir una capa de mapa (OpenStreetMap en este caso) con opciones para evitar la repetición
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        noWrap: true, // Evita la repetición de teselas
        minZoom: 3,   // Establece un nivel de zoom mínimo
      }).addTo(mapRef.current);


      markerRef.current = L.marker([lat, lng])
      // Add a marker
      markerRef.current.addTo(mapRef.current)
        .bindPopup('Ubicación: 34.0553, -117.7523')
        .openPopup();
    } else {
      // Update the map view if it already exists
      if (ipData && ipData.loc) {
        const [lat, lng] = ipData.loc.split(',');
        mapRef.current.setView([lat, lng], 13);
        markerRef.current.remove()
        markerRef.current = L.marker([lat, lng])
        markerRef.current.addTo(mapRef.current)
          .bindPopup(`Ubicación: ${lat}, ${lng}`)
          .openPopup();
      }
    }
  }, [ipData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const ip = e.target[0].value;
    fetch(`https://ipinfo.io/${ip}?token=${GEO_IP_KEY}`)
      .then(res => res.json())
      .then(data => setIpData(data));
  }

  return (
    <>
        <div className='page'>

        <header>
          <h1>IP Address Tracker</h1>
          <form onSubmit={handleSubmit}>
            <input name='ip' type="text" placeholder='Search for any IP address or domain'/>
            <button type='submit' className='search-button'>
              <img src={arrowIMG} alt="arrow image" />
            </button>
          </form>
        </header>
        
        <Results ipData={ipData}/>

        <div className='map-section' id="map"></div>

        
      </div>
    </>
  )
}

export default App
