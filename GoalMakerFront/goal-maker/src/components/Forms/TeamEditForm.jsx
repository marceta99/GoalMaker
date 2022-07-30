import React from 'react'
import "./TeamEditForm.css"; 
import Select from 'react-select';
import { useEffect, useState } from 'react';

const TeamEditForm = ({team, setActiveForm, setTeam, teamOwner, teamEmployees}) => {
    const [employees, setEmployees] = useState(); 
    const [options, setOptions] = useState(); 
    const [selectedValue, setSelectedValue] = useState(); 
    const [selectedMembers, setSelectedMembers] = useState(); 


    useEffect(()=>{
        const trenutniClanoviTima = teamEmployees.map((item)=>{
            return {value : item.id, label : item.firstName+ " "+ item.lastName}
        })
        setSelectedMembers(trenutniClanoviTima);

        const getData = async()=>{
            const response1 = 
            await fetch("https://localhost:5001/api/GoalMaker/GetOrganizationEmployees?organizationId=1")  
            const data1 = await response1.json() ; 
            setEmployees(data1) ; 
            console.log(data1);
           
            let opcije = data1.map((item)=>{
                return {value : item.id, label : item.firstName + " " +item.lastName}
            } )
            setOptions(opcije) ;
            console.log(team); 
            }
          getData() ;
      },[]);

  const onSubmit = async (e)=>{
    setActiveForm(false); 

    const deleteResponse = await fetch("https://localhost:44344/api/GoalMaker/DeleteMembersFromTeam?teamId="+team.id,{
        method: "DELETE", 
    })
     console.log(deleteResponse); 

    console.log(e); 
    const updatedTeam = {
        "name": e.target[0].value,
        "teamCountry": e.target[1].value,
        "percentageOfSuccess":e.target[2].value,
        "confidenceLevel": e.target[3].value,
        "ownerId":selectedValue
      };
    const response = await fetch("https://localhost:44344/api/GoalMaker/UpdateTeam?teamId="+team.id,{
        method: "PUT", 
        body : JSON.stringify(updatedTeam),
        headers: {
            'Content-type': 'application/json'
        }
    })
    console.log(response);
    const response2 =
       await fetch("https://localhost:5001/api/GoalMaker/GetTeam?teamId="+team.id)  
      const data2 = await response2.json() ; 
      setTeam(data2) ;

      const idArray = [] ; 
      selectedMembers.forEach(selected => {
        idArray.push(selected.value); 
      }); 
      const response3 = await fetch("https://localhost:44344/api/GoalMaker/AddMembersToTeam?teamId="+team.id,{
        method: "POST", 
        body : JSON.stringify(idArray),
        headers: {
            'Content-type': 'application/json'
        }
    })
    console.log(response3); 
    

  }  

  return (
    <div class="container">
    <header>Edit Team</header>

    <form action="#" onSubmit={(e)=>onSubmit(e)}>
        <div class="form first">
            
            <div class="details ID">
                <span class="title">Team Details</span>

                <div class="fields">
                    <div class="input-field">
                        <label>Team Name</label>
                        <input type="text" defaultValue={team.name} required></input>
                    </div>

                    <div class="input-field">
                        <label>Team Country</label>
                        <input type="text" defaultValue={team.teamCountry} required></input>
                    </div>

                    <div class="input-field">
                        <label>Percentage of success (evaluated)</label>
                        <input type="text" defaultValue={team.percentageOfSuccess} disabled></input>
                    </div>

                    <div class="input-field">
                        <label>Confidence level (evaluated)</label>
                        <input type="text" defaultValue={team.confidenceLevel} disabled></input>
                    </div>
                   
                    {employees && <>
                        <div class="input-field">
                        <label>Team Owner</label>
                        <select required 
                            onChange={(e)=>setSelectedValue(e.target.value)}>
                            <option value={teamOwner.id}>{teamOwner.firstName+" "+teamOwner.lastName }</option>
                            {employees.map((employee, index)=>(
                                <option key={index} value={employee.id} >
                                    {employee.firstName+ " "+employee.lastName}
                                </option>
                            ))}
                        </select>
                        </div>

                        <div class="input-field">
                            <Select
                            
                            isMulti={true}
                            value={selectedMembers}
                            onChange={(selectedOptions)=>{
                                setSelectedMembers(selectedOptions);
                                console.log(selectedOptions);
                            }}
                            options={options}
                            />
                        </div>
                        </>

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

export default TeamEditForm ; 