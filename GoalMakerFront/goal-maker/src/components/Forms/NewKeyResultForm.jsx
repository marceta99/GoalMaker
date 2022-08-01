import React, { useEffect, useState } from 'react'
import "./TeamEditForm.css"; 

const NewKeyResultForm = ({goal, setActiveNewKeyResult,setKeyResults}) => {

  const [employees, setEmployees] = useState(); 
  const [selectedOwner, setSelectedOwner] = useState(); 

  useEffect(()=>{
    const getData = async()=>{
        const response1 = 
        await fetch("https://localhost:5001/api/GoalMaker/GetTeamMembers?teamId="+goal.teamId);  
        const data1 = await response1.json() ; 
        setEmployees(data1) ; 
        console.log(data1);
       
        }
      getData() ;
  },[]);

  const onSubmit = async (e)=>{
    setActiveNewKeyResult(false); 
    console.log(e); 

    const newKeyResult = {
        "name": e.target[0].value,
        "percentageOfSuccess":e.target[1].value,
        "confidenceLevel": e.target[2].value,
        "description": e.target[3].value,
        "ownerId":selectedOwner,
        "goalId": goal.id
      };
    const response = await fetch("https://localhost:44344/api/GoalMaker/NewKeyResult",{
        method: "POST", 
        body : JSON.stringify(newKeyResult),
        headers: {
            'Content-type': 'application/json'
        }
    })
    console.log(response);
    
    const response1 =
       await fetch("https://localhost:5001/api/GoalMaker/GetGoalKeyResults?goalId="+goal.id)  
      const data1 = await response1.json() ; 
      setKeyResults(data1) ;
      console.log(data1); 
  }  

  return (
    <div class="container">
    <header>New Key Result</header>

    <form action="#" onSubmit={(e)=>onSubmit(e)}>
        <div class="form first">
            
            <div class="details ID">
                <span class="title">Key Result Details</span>

                <div class="fields">
                    <div class="input-field">
                        <label>Key Result Name</label>
                        <input type="text" placeholder='Key result name' required></input>
                    </div>

                    <div class="input-field">
                        <label>Percentage of success</label>
                        <input type="number" placeholder='from 0 to 100%' required></input>
                    </div>

                    <div class="input-field">
                        <label>Confidence level</label>
                        <input type="number" placeholder='from 0 to 10' required ></input>
                    </div>


                    <div class="input-field">
                        <label>Description</label>
                        <input type="text" placeholder='Key result description' required></input>
                    </div>

                    {employees && 
                        <div class="input-field">
                        <label>Goal Owner</label>
                        <select required 
                            onChange={(e)=>{
                                setSelectedOwner(e.target.value)
                                console.log(e.target.value)
                            }}>
                            <option disabled selected>Select owner</option>
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

export default NewKeyResultForm ;