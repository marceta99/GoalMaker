import React from 'react'
import {CircularProgressbar} from "react-circular-progressbar";  
import "react-circular-progressbar/dist/styles.css" ; 

const CircularBar = ({percentage}) => {

  const color = percentage > 50 ? "green" : "red" ; 

  return (
    <div style={{width: "100px", height: "100px"}} className="circular">
      <CircularProgressbar
        value={percentage}
        text={percentage+"%"}
        circleRatio={0.7}
        styles={{
          trail: {
            strokeLinecap : "butt", 
            transform : "rotate(-126deg)",
            transformOrigin : "center center"
          },
          path:{
            strokeLinecap : "butt", 
            transform : "rotate(-126deg)",
            transformOrigin : "center center", 
            stroke: "blue"
          }, 
          text:{
            fill : "black"
          }
        }}
        strokeWidth={10}
      />

    </div>
  )
}

export default CircularBar; 