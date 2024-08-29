import { useState } from "react";
const GEO_IP_KEY = '4b0e602accf285';
export function useGetIpData(){
  const [ipData, setIpData] = useState(null);

  const getData = (ip) =>{
    fetch(`https://ipinfo.io/${ip}?token=${GEO_IP_KEY}`)
    .then(res => res.json())
    .then(data => setIpData(data));
  }

  return {ipData, getData}

}