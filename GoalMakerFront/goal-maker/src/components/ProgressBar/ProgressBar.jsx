import React, { useEffect, useRef } from 'react'
import "./ProgressBar.css"; 

const ProgressBar = ({percentage}) => {
  const progress = useRef();

  useEffect(()=>{
    progress.current.style.width = percentage+"%" ; 
    if(percentage > 50)progress.current.style.background = "green"; 
  },[])

  return (
    <div className='progress'>
        <div className='progress-done' ref={progress}>
        </div>
    </div>
  )
}

export default ProgressBar