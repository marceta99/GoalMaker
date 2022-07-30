import React from 'react'
import "./TeamEditForm.css"; 

const TeamEditForm = ({team, setActiveForm, setTeam}) => {

  const onSubmit = async (e)=>{
    setActiveForm(false); 
    console.log(e); 
    const updatedTeam = {
        "name": e.target[0].value,
        "teamCountry": e.target[1].value,
        "percentageOfSuccess":e.target[2].value,
        "confidenceLevel": e.target[3].value
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