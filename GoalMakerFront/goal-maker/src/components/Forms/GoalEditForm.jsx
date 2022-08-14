import React, { useEffect, useState } from 'react'
import "./TeamEditForm.css"; 
import { useStateContext } from '../../contexts/ContextProvider';
import Select from 'react-select';



const GoalEditForm = ({goal, setActiveEditGoal, goalOwner, setGoalOwner, setGoal, dependedTeams, setDependedTeams}) => {

  const [employees, setEmployees] = useState(); 
  const [selectedOwner, setSelectedOwner] = useState(); 
  const [organizationGoals, setOrganizationGoals]= useState(); 
  const [selectedOrganizationalGoal, setSelectedOrganizationalGoal] = useState();
  const {leadershipTeam} = useStateContext() ;  
  const [organizationalGoal, setOrganizationalGoal] = useState(); 
  const [teams, setTeams]= useState();
  const [options, setOptions]= useState(); 
  const [selectedTeams, setSelectedTeams]= useState();

  useEffect(()=>{
    //on start set alredy selected depended teams to be selected
    const arr = dependedTeams.map((team)=>{
        return {value : team, label : team.name}
    })
    setSelectedTeams(arr);

    console.log(goal);
    const getData = async()=>{
        const response1 = 
        await fetch("https://localhost:5001/api/GoalMaker/GetTeamMembers?teamId="+goal.teamId);  
        const data1 = await response1.json() ; 
        setEmployees(data1) ; 
        console.log(data1);
       
        setSelectedOwner(goalOwner.id); 

        const response3 = 
        await fetch("https://localhost:5001/api/GoalMaker/GetOrganizationalGoal?goalId="+goal.organizationalGoalId);  
        const data3 = await response3.json() ; 
        setOrganizationalGoal(data3) ; 

        setSelectedOrganizationalGoal(data3.id);

        const response2 = 
        await fetch("https://localhost:5001/api/GoalMaker/GetOrganizationalTeamGoals?leadershipTeamId="+leadershipTeam.id);  
        const data2 = await response2.json() ; 
        setOrganizationGoals(data2) ; 
        console.log(data2);

        const response4 = 
        await fetch("https://localhost:5001/api/GoalMaker/GetOrganizationTeamsWithId?organizationId="+1);  
        const data4 = await response4.json() ; 
        setTeams(data4) ; 
        console.log(data4);
       
        const opcije = [];
        for(const team of data4){
            if(!isAlredyDependedTeam(team)){
                opcije.push({value : team, label : team.name}); 
            }
        }
        console.log("opcije na pocetku su: ");
        console.log(opcije);
        setOptions(opcije);

        }
      getData() ;
  },[]);
  const isAlredyDependedTeam = (team)=>{
    console.log(dependedTeams);
    for(const t of dependedTeams){
        if(t.id === team.id)return true;
    } 
    return false ; 
  }


  const onSubmit = async (e)=>{
    setDependedTeams([]);
    const helperDependingTeams = [];  
    selectedTeams.forEach(t => {
        dependedTeams.push(t.value);
        helperDependingTeams.push(t.value); 
    });
    setDependedTeams([...helperDependingTeams]); 

    setActiveEditGoal(false); 
    console.log(e); 
    const updatedGoal = {
        "name": e.target[0].value,
        "percentageOfSuccess":goal.percentageOfSuccess,
        "confidenceLevel": goal.confidenceLevel,
        "startDate": e.target[3].value,
        "endDate": e.target[4].value,
        "goalOwnerId":selectedOwner,
        "teamId":goal.teamId,
        cycleId : 1,
        organizationalGoalId: selectedOrganizationalGoal,
        dependedTeams: helperDependingTeams
      };
      console.log(updatedGoal);
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

                    {organizationGoals && 
                        <div class="input-field">
                        <label>Contribute to :</label>
                        <select required 
                            onChange={(e)=>setSelectedOrganizationalGoal(e.target.value)}>
                            <option disabled selected value={organizationalGoal?.id}>
                                {organizationalGoal?.name}</option>
                            {organizationGoals.map((goal, index)=>(
                                <option key={index} value={goal.id}>
                                    {goal.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    }   

                    {teams && 
                    <>
                        <div class="input-field">
                        <label>Depending teams</label>
                            <Select
                            isMulti={true}
                            value={selectedTeams}
                            onChange={(selectedOptions)=>{
                                setSelectedTeams(selectedOptions); 
                                console.log(selectedOptions);
                            }}
                            options={options}
                            />
                        </div>    
                    </>}
                   
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