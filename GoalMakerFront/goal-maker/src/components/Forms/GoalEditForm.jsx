import React, { useEffect, useState } from 'react'
import "./TeamEditForm.css"; 

const GoalEditForm = ({goal, setActiveEditGoal, goalOwner, setGoalOwner, setGoal}) => {

  const [employees, setEmployees] = useState(); 
  const [selectedOwner, setSelectedOwner] = useState(); 

  useEffect(()=>{
    console.log(goal);
    const getData = async()=>{
        const response1 = 
        await fetch("https://localhost:5001/api/GoalMaker/GetTeamMembers?teamId="+goal.teamId);  
        const data1 = await response1.json() ; 
        setEmployees(data1) ; 
        console.log(data1);
       
        setSelectedOwner(goalOwner.id); 
        }
      getData() ;
  },[]);

  const onSubmit = async (e)=>{
    setActiveEditGoal(false); 
    console.log(e); 
    const updatedGoal = {
        "name": e.target[0].value,
        "percentageOfSuccess":e.target[1].value,
        "confidenceLevel": e.target[2].value,
        "startDate": e.target[3].value,
        "endDate": e.target[4].value,
        "goalOwnerId":selectedOwner,
        cycleId : 1
      };
    const response = await fetch("https://localhost:44344/api/GoalMaker/UpdateGoal?goalId="+goal.id,{
        method: "PUT", 
        body : JSON.stringify(updatedGoal),
        headers: {
            'Content-type': 'application/json'
        }
    })
    console.log(response); 

    const response2 =
         await fetch("https://localhost:5001/api/GoalMaker/GetGoal?goalId="+goal.id);  
        const data2 = await response2.json() ; 
        setGoal(data2) ;
        console.log(data2); 

        const response3 = 
        await fetch("https://localhost:5001/api/GoalMaker/GetUser?userId="+data2.goalOwnerId);  
        const data3 = await response3.json() ; 
        setGoalOwner(data3) ; 
        console.log(data3);
  }  
  return (
    <div class="container">
    <header>Update Goal</header>

    <form action="#" onSubmit={(e)=>onSubmit(e)}>
        <div class="form first">
            
            <div class="details ID">
                <span class="title">Goal Details</span>

                <div class="fields">
                    <div class="input-field">
                        <label>Goal Name</label>
                        <input type="text" defaultValue={goal.name} required></input>
                    </div>

                    <div class="input-field">
                        <label>Percentage of success (evaluated)</label>
                        <input type="text" defaultValue={goal.percentageOfSuccess} disabled></input>
                    </div>

                    <div class="input-field">
                        <label>Confidence level (evaluated)</label>
                        <input type="text" defaultValue={goal.confidenceLevel} disabled></input>
                    </div>

                    <div class="input-field">
                        <label>Start Date</label>
                        <input type="date" defaultValue={goal.startDate.slice(0,10)} required></input>
                    </div>

                    <div class="input-field">
                        <label>{goal.endDate}</label>
                        <input type="date" defaultValue={goal.endDate.slice(0,10)} required></input>
                    </div>

                    {employees && 
                        <div class="input-field">
                        <label>Goal Owner</label>
                        <select required 
                            onChange={(e)=>setSelectedOwner(e.target.value)}>
                            <option disabled selected value={goalOwner?.id}>
                                {goalOwner?.firstName+ " "+ goalOwner?.lastName}</option>
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

export default GoalEditForm ;