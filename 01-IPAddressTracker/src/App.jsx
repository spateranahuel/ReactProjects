import './App.css'
import arrowIMG from './images/icon-arrow.svg'
import 'leaflet/dist/leaflet.css';
import Results from './components/Results';
import {useGetIpData} from './hooks/useGetIpData'
import { useMapView } from './hooks/useMapView';





function App() {

  const {ipData, getData} = useGetIpData()
  
  useMapView({ipData})
  
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
