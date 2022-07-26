import React, { useEffect, useRef, useState } from 'react'
import "./TeamEditForm.css"; 
import Select from 'react-select';

const NewTeamForm = ({setActiveNewTeam, organization, setTeams}) => {
  const [employees, setEmployees] = useState(); 
  const [options, setOptions] = useState(); 
  const [selectedValue, setSelectedValue] = useState(); 
  const [selectedMembers, setSelectedMembers] = useState(); 

  useEffect(()=>{
    const getData = async()=>{
        const response1 = 
        await fetch("https://localhost:5001/api/GoalMaker/GetOrganizationEmployees?organizationId="+organization.id)  
        const data1 = await response1.json() ; 
        setEmployees(data1) ; 
        console.log(data1);
       
        let opcije = data1.map((item)=>{
            return {value : item.id, label : item.firstName + " " +item.lastName}
        } )
        setOptions(opcije) ;
        }
      getData() ;
  },[]);

  const onSubmit = async (e)=>{
    setActiveNewTeam(false); 
    console.log(e); 
    console.log(selectedValue); 
    const newTeam = {
        "name": e.target[0].value,
        "teamCountry": e.target[1].value,
        "percentageOfSuccess":e.target[2].value,
        "confidenceLevel": e.target[3].value,
        "ownerId":selectedValue
      };
    const response = await fetch("https://localhost:44344/api/GoalMaker/NewTeam?organizationId="+organization.id,{
        method: "POST", 
        body : JSON.stringify(newTeam),
        headers: {
            'Content-type': 'application/json'
        }
    })
    console.log(response);


    const response3 = await 
          fetch("https://localhost:5001/api/GoalMaker/GetOrganizationTeamsWithId?organizationId="+organization.id)
      const data2 = await response3.json() ;
      setTeams(data2) ;

      const idArray = [] ; 
      selectedMembers.forEach(selected => {
        idArray.push(selected.value); 
      });
      const lastTeam = data2[data2.length - 1] ; 
      const response2 = await fetch("https://localhost:44344/api/GoalMaker/AddMembersToTeam?teamId="+lastTeam.id,{
        method: "POST", 
        body : JSON.stringify(idArray),
        headers: {
            'Content-type': 'application/json'
        }
    })
    console.log(response2); 

  }  

  return (
    <div class="container">
    <header>New Team</header>

    <form action="#" onSubmit={(e)=>onSubmit(e)}>
        <div class="form first">
            
            <div class="details ID">
                <span class="title">Team Details</span>

                <div class="fields">
                    <div class="input-field">
                        <label>Team Name</label>
                        <input type="text" placeholder='Google, Facebook etc' required></input>
                    </div>

                    <div class="input-field">
                        <label>Team Country</label>
                        <input type="text" placeholder='USA, UK etc' required></input>
                    </div>

                    <div class="input-field">
                        <label>Percentage of success (evaluated)</label>
                        <input type="text" defaultValue={0} disabled></input>
                    </div>

                    <div class="input-field">
                        <label>Confidence level (evaluated)</label>
                        <input type="text" defaultValue={0} disabled></input>
                    </div>

                    {employees && <>
                        <div class="input-field">
                        <label>Team Owner</label>
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

                        <div class="input-field">
                        <label>Team Members</label>
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

export default NewTeamForm ; 