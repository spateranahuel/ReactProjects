import './App.css'
import { useEffect, useRef } from 'react'
import arrowIMG from './images/icon-arrow.svg'
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import Results from './components/Results';
import {useGetIpData} from './hooks/useGetIpData'







function App() {

  const {ipData, getData} = useGetIpData()
  const mapRef = useRef(null);
  const markerRef = useRef(null)


  useEffect(() =>{
    // Create the map instance
    mapRef.current = L.map('map').setView([34,-117],13)
  
    console.log(mapRef.current)
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
  },[])



  useEffect(() => {
    // Update the map view if it already exists
    if (ipData && ipData.loc) {
      const [lat, lng] = ipData.loc.split(',');
      mapRef.current.setView([lat, lng], 13);
      

      if(markerRef.current)
        markerRef.current.remove()

      markerRef.current = L.marker([lat, lng])
      markerRef.current.addTo(mapRef.current)
        .bindPopup(`Ubicación: ${lat}, ${lng}`)
        .openPopup();
    }
  }, [ipData]);




  const handleSubmit = (e) => {
    e.preventDefault();
    const ip = e.target[0].value;
    getData(ip)
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
