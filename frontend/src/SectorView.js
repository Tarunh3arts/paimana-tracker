import api from "./api";
import {useEffect,useState} from "react";

function SectorView(){
  const [data,setData]=useState({});

  useEffect(()=>{
    api.get("/analytics/sector-progress").then(r=>setData(r.data))
  },[])

  return(
    <div className="mt-6">
      <h2>Sector Summary</h2>
      {Object.keys(data).map(k=>(
        <p key={k}>{k} : {data[k].toFixed(2)}%</p>
      ))}
    </div>
  )
}
export default SectorView;
