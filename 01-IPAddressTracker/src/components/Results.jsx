/* eslint-disable */
export default function Results({ipData}) {

  return (
    <>
      {             
        ipData
          &&
        <div className='results'>
          <div className='result-item'>
            <p className='item-title'>IP ADDRESS</p>
            <p className='item-data'>{ipData.ip}</p>
          </div>

          <div className='result-item'>
            <p className='item-title'>LOCATION</p>
            <p className='item-data'>{ipData.city}, {ipData.region} {ipData.postal}</p>
          </div>

          <div className='result-item'>
            <p className='item-title'>TIMEZONE</p>
            <p className='item-data'>{ipData.timezone}</p>
          </div>

          <div className='result-item'>
            <p className='item-title'>ORGANIZACION</p>
            <p className='item-data'>{ipData.org}</p>
          </div>
        </div>
      }
    </> 
   
 
  )
}
