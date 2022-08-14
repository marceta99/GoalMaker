import React, { useEffect, useState } from 'react'
import "./TeamEditForm.css"; 
import { useStateContext } from '../../contexts/ContextProvider';

const NewGoalForm = ({team, setActiveNewGoal,setGoals}) => {

  const [employees, setEmployees] = useState(); 
  const [selectedValue, setSelectedValue] = useState(); 
  const [organizationGoals, setOrganizationGoals]= useState(); 
  const [selectedOrganizationalGoal, setSelectedOrganizationalGoal] = useState();
  const {leadershipTeam} = useStateContext() ;  
  

  useEffect(()=>{
    const getData = async()=>{
        const response1 = 
        await fetch("https://localhost:5001/api/GoalMaker/GetTeamMembers?teamId="+team.id);  
        const data1 = await response1.json() ; 
        setEmployees(data1) ; 
        console.log(data1);

        const response2 = 
        await fetch("https://localhost:5001/api/GoalMaker/GetOrganizationalTeamGoals?leadershipTeamId="+leadershipTeam.id);  
        const data2 = await response2.json() ; 
        setOrganizationGoals(data2) ; 
        console.log(data2);
       
        }
      getData() ;
  },[]);

  const onSubmit = async (e)=>{
    setActiveNewGoal(false); 
    console.log(e); 
    console.log(selectedValue); 
    const newGoal = {
        "name": e.target[0].value,
        "percentageOfSuccess":e.target[1].value,
        "confidenceLevel": e.target[2].value,
        "startDate": e.target[3].value,
        "endDate": e.target[4].value,
        "goalOwnerId":selectedValue,
        "teamId": team.id,
        cycleId : 1,
        organizationalGoalId: selectedOrganizationalGoal
      };
    const response = await fetch("https://localhost:44344/api/GoalMaker/NewGoal",{
        method: "POST", 
        body : JSON.stringify(newGoal),
        headers: {
            'Content-type': 'application/json'
        }
    })
    console.log(response);
    
    const response1 =
       await fetch("https://localhost:5001/api/GoalMaker/GetTeamGoals?teamId="+team.id)  
      const data1 = await response1.json() ; 
      setGoals(data1) ;
      console.log(data1); 
  }  

  return (
    <div class="container">
    <header>New Goal</header>

    <form action="#" onSubmit={(e)=>onSubmit(e)}>
        <div class="form first">
            
            <div class="details ID">
                <span class="title">Goal Details</span>

                <div class="fields">
                    <div class="input-field">
                        <label>Goal Name</label>
                        <input type="text" placeholder='Goal name' required></input>
                    </div>

                    <div class="input-field">
                        <label>Percentage of success (evaluated)</label>
                        <input type="text" defaultValue={0} disabled></input>
                    </div>

                    <div class="input-field">
                        <label>Confidence level (evaluated)</label>
                        <input type="text" defaultValue={0} disabled></input>
                    </div>

                    <div class="input-field">
                        <label>Start Date</label>
                        <input type="date" placeholder="Enter start date" required></input>
                    </div>

                    <div class="input-field">
                        <label>End Date</label>
                        <input type="date" placeholder="Enter end date" required></input>
                    </div>

                    {employees && 
                        <div class="input-field">
                        <label>Goal Owner</label>
                        <select required 
                            onChange={(e)=>setSelectedValue(e.target.value)}>
                            <option disabled selected>Select owner</option>
                            {employees.map((employee, index)=>(
                                <option key={index} value={employee.id}>
                                    {employee.firstName+ " "+employee.lastName}
                                </option>
                            ))}
                        </select>
                    </div>
                    }
                    {organizationGoals && 
                        <div class="input-field">
                        <label>Contribute to :</label>
                        <select required 
                            onChange={(e)=>setSelectedOrganizationalGoal(e.target.value)}>
                            <option disabled selected>Select organizational goal</option>
                            {organizationGoals.map((goal, index)=>(
                                <option key={index} value={goal.id}>
                                    {goal.name}
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

export default NewGoalForm ;