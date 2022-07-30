import React, { useEffect } from 'react'
import "./TeamEditForm.css"; 

const NewTeamForm = ({setActiveNewTeam, organization, setTeams}) => {

  const onSubmit = async (e)=>{
    setActiveNewTeam(false); 
    console.log(e); 
    const newTeam = {
        "name": e.target[0].value,
        "teamCountry": e.target[1].value,
        "percentageOfSuccess":e.target[2].value,
        "confidenceLevel": e.target[3].value
      };
    const response = await fetch("https://localhost:44344/api/GoalMaker/NewTeam?organizationId="+organization.id,{
        method: "POST", 
        body : JSON.stringify(newTeam),
        headers: {
            'Content-type': 'application/json'
        }
    })
    console.log(response);

    const response2 = await 
          fetch("https://localhost:5001/api/GoalMaker/GetOrganizationTeamsWithId?organizationId="+organization.id)
      const data2 = await response2.json() ;
      setTeams(data2) ;
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