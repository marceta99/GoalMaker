import React, { useEffect, useState } from 'react'
import "./TeamEditForm.css"; 

const NewInitiativeForm = ({keyResult, setActiveNewInitiative,setRefresh}) => {

  const [selectedState, setSelectedState] = useState();
  const initiativeStates = [
    {value: 0, name : "Non started"}, 
    {value: 1, name : "In progress"}, 
    {value: 2, name : "Finished"}, 

  ]

  useEffect(()=>{
    const getData = async()=>{
        
        }
      getData() ;
  },[]);

  const onSubmit = async (e)=>{
    setActiveNewInitiative(false); 
    console.log(e); 

   const newInitiative = {
        "name": e.target[0].value,
        "description": e.target[1].value,
        "initiativeState":  selectedState, 
        "comments":"",
        "ownerId":1,
        "keyResultId": keyResult.id
      };
    const response = await fetch("https://localhost:44344/api/GoalMaker/NewInitiative",{
        method: "POST", 
        body : JSON.stringify(newInitiative),
        headers: {
            'Content-type': 'application/json'
        }
    })
    console.log(response);
    setRefresh(previous => !previous); 
  }  

  return (
    <div class="container">
    <header>New Initiative</header>

    <form action="#" onSubmit={(e)=>onSubmit(e)}>
        <div class="form first">
            
            <div class="details ID">
                <span class="title">Initiative Details</span>

                <div class="fields">
                    <div class="input-field">
                        <label>Initiative Name</label>
                        <input type="text" placeholder='initiative name' required></input>
                    </div>

                    <div class="input-field">
                        <label>Description</label>
                        <input type="text" placeholder='initiative description' required></input>
                    </div>

                    <div class="input-field">
                    <label>Initiative State</label>
                    <select required 
                        onChange={(e)=>{
                            setSelectedState(e.target.value)
                            console.log(e.target.value)
                        }}>
                        <option disabled selected>Select initiative state</option>
                        {initiativeStates.map((state, index)=>(
                            <option key={index} value={state.value}>
                                {state.name}
                            </option>
                        ))}
                    </select>
                </div>
                
                   
                </div>

                <button class="nextBtn">
                    <span class="btnText">Submit</span>
                    <i class="uil uil-navigator"></i>
                </button>
            </div> 
        </div>

        
    </form>
</div>
  )
}

export default NewInitiativeForm ;