import React, {useState} from "react";

export default  function VoiceSlider({name}) {
    const [speed, setSpeed] = useState(1.0);
    return (
        <div style={{display:"flex", flexDirection:"column", alignItems:"stretch"}}>
            <div style={{display:"flex", justifyContent:"space-between", paddingTop:"10px", backgroundColor:"none"}}>
                <span style={{
                    textAlign:"center",
                    color : "#333",
                    padding:"5px",
                    fontSize:"16px",
                }}>
                    {name}
                </span>

                <span style={{
                    marginLeft:"10px",
                    width:"40px",
                    textAlign:"center",
                    color : "#333",
                    padding:"5px",
                    fontSize:"16px"
                }}>
                    {speed.toFixed(2)}
                </span>
            </div>
            <input
                type="range"
                min="1"
                max="2" 
                step="0.01"
                value={speed}
                onChange={(e)=>setSpeed(parseFloat(e.target.value))}
            />
        </div>
    )
}