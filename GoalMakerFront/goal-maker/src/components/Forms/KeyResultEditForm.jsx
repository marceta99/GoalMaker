import React, { useEffect, useState } from 'react'
import "./TeamEditForm.css"; 

const KeyResultEditForm = ({keyResult, setActiveEditKeyResult,setRefresh, keyResultOwner}) => {

  const [employees, setEmployees] = useState(); 
  const [selectedOwner, setSelectedOwner] = useState(); 

  useEffect(()=>{
    setSelectedOwner(keyResultOwner.id); 
    const getData = async()=>{
        const response1 = 
        await fetch("https://localhost:5001/api/GoalMaker/GetTeamMembers?teamId="+keyResult.goal.teamId);  
        const data1 = await response1.json() ; 
        setEmployees(data1) ; 
        console.log(data1);
       
        }
      getData() ;
  },[]);

  const onSubmit = async (e)=>{
    setActiveEditKeyResult(false); 
    console.log(e); 

    const updatedKeyResult = {
        "name": e.target[0].value,
        "percentageOfSuccess":e.target[1].value,
        "confidenceLevel": e.target[2].value,
        "description": e.target[3].value,
        "ownerId":selectedOwner,
        "goalId": keyResult.GoalId
      };
      console.log(updatedKeyResult);
      const response = await fetch("https://localhost:44344/api/GoalMaker/UpdateKeyResult?keyResultId="+keyResult.id,{
        method: "PUT", 
        body : JSON.stringify(updatedKeyResult),
        headers: {
            'Content-type': 'application/json'
        }
    })
    console.log(response);
    
    setRefresh(previous => !previous); 
  }  

  return (
    <div class="container">
    <header>Edit Key Result</header>

    <form action="#" onSubmit={(e)=>onSubmit(e)}>
        <div class="form first">
            
            <div class="details ID">
                <span class="title">Key Result Details</span>

                <div class="fields">
                    <div class="input-field">
                        <label>Key Result Name</label>
                        <input type="text" defaultValue={keyResult.name} required></input>
                    </div>

                    <div class="input-field">
                        <label>Percentage of success</label>
                        <input type="number" defaultValue={keyResult.percentageOfSuccess} required></input>
                    </div>

                    <div class="input-field">
                        <label>Confidence level</label>
                        <input type="number" defaultValue={keyResult.confidenceLevel} required ></input>
                    </div>


                    <div class="input-field">
                        <label>Description</label>
                        <input type="text" defaultValue={keyResult.description} required></input>
                    </div>

                    {employees && 
                        <div class="input-field">
                        <label>Key Result Owner</label>
                        <select required 
                            onChange={(e)=>{
                                setSelectedOwner(e.target.value)
                                console.log(e.target.value)
                            }}>
                             <option disabled selected value={keyResultOwner?.id}>
                                {keyResultOwner?.firstName+ " "+ keyResultOwner?.lastName}</option>
                            {employees.map((employee, index)=>(
                                <option key={index} value={employee.id}>
                                    {employee.firstName+ " "+employee.lastName}
                                </option>
                            ))}
                        </select>
                    </div>
                    }
                   
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

export default KeyResultEditForm ;