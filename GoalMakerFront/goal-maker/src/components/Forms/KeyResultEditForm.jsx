import React, { useEffect, useState } from 'react'
import "./TeamEditForm.css"; 
import { CheckBoxComponent } from '@syncfusion/ej2-react-buttons';

const KeyResultEditForm = ({keyResult, setActiveEditKeyResult,setRefresh, keyResultOwner}) => {

  const [employees, setEmployees] = useState(); 
  const [selectedOwner, setSelectedOwner] = useState(); 
  const [mileStones, setMileStones] = useState();
  const [isResolvedValues, setIsResolvedValues] = useState(); 
  const [isFinished, setIsFinished] = useState(false);
  const [percentageOfSuccess, setPercentageOfSuccess] = useState(keyResult.percentageOfSuccess); 

  useEffect(()=>{
    setSelectedOwner(keyResultOwner.id); 
    const getData = async()=>{
        const response1 = 
        await fetch("https://localhost:5001/api/GoalMaker/GetTeamMembers?teamId="+keyResult.goal.teamId);  
        const data1 = await response1.json() ; 
        setEmployees(data1) ; 
        console.log(data1);

        if(keyResult.type == 1){ //if key result has milestones
            const response2 = 
        await fetch("https://localhost:5001/api/GoalMaker/GetKeyResultMilestones?keyResultId="+keyResult.id);  
        const data2 = await response2.json() ; 
        setMileStones(data2); 
        console.log(data2);
        
        const helperArray = [] ; 
        mileStones?.forEach(milestone => {
            helperArray.push(milestone.isResolved); 
        });
        console.log(helperArray);
        setIsResolvedValues([...helperArray]); 
        }
        
        if(keyResult.type == 2){ //if key result is type binary
            if(keyResult.percentageOfSuccess == 0)setIsFinished(false);
            else setIsFinished(true);
        }
        
       
        }
      getData() ;
  },[]);

  const onSubmit = async (e)=>{
    setActiveEditKeyResult(false); 
    console.log(e); 


    if(keyResult.type == 1){

        let countMilestones = mileStones.length ;  
        let countResolvedMilestones = 0; 
        for(let m of mileStones){
            if(m.isResolved)countResolvedMilestones = countResolvedMilestones + 1; 

            const response1 = await fetch("https://localhost:44344/api/GoalMaker/ResolveMilestone",{
            method: "PUT", 
            body : JSON.stringify(m),
            headers: {
                'Content-type': 'application/json'
            }
        })
        }
        const percentage = countMilestones !== 0 
        ? (countResolvedMilestones / countMilestones)*100 : 0 ; 
        console.log("percentage is")
        console.log(percentage);
        setPercentageOfSuccess(percentage);
        
        const updatedKeyResult = {
            "name": e.target[0].value,
            "percentageOfSuccess":percentage,
            "confidenceLevel": e.target[1].value,
            "description": e.target[2].value,
            "ownerId":selectedOwner,
            "goalId": keyResult.GoalId,
            "type": keyResult.type
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
    }else{
        const updatedKeyResult = {
            "name": e.target[0].value,
            "percentageOfSuccess":percentageOfSuccess,
            "confidenceLevel": e.target[1].value,
            "description": e.target[2].value,
            "ownerId":selectedOwner,
            "goalId": keyResult.GoalId,
            "type": keyResult.type
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
  }  

 const  onMilestoneChange = (m, index)=>{
        m.isResolved=!m.isResolved;
        const arr = [...isResolvedValues]; 
        arr[index] = m.isResolved;
        setIsResolvedValues([...arr]);
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
                   
                   {keyResult && keyResult.type == 0 ?
                        <div class="input-field">
                        <label>Percentage of success</label>
                        <input type="number" defaultValue={keyResult.percentageOfSuccess} required 
                        onChange={(e)=>{setPercentageOfSuccess(e.target.value)}}></input>
                        </div>
                    : keyResult.type == 1 ? 
                        <div style={{display:"flex",flexDirection:"column", margin:"20px"}}> 
                            <h2>Milestones:</h2>
                            {mileStones?.map((m, i)=>
                                <div style={{display:"flex",flexDirection:"row"}}>
                                <input type="checkbox" checked={isResolvedValues ?isResolvedValues[i]: m.isResolved}  
                                    onChange={(e)=>{
                                        onMilestoneChange(m , i);
                                        console.log(isResolvedValues[i]);
                                        console.log(mileStones);
                                        }}></input>
                                <label style={{margin: "3px"}}>{m.name}</label>
                                </div>)}
                        </div>
                    :<div>
                    <label>Key Result Finished </label>
                    <input type="checkbox" checked={isFinished}  
                        onChange={(e)=>{
                            let finished = e.target.value; 
                            console.log(finished);
                            if(isFinished)setPercentageOfSuccess(0); 
                            else{
                                setPercentageOfSuccess(100);
                            } 
                            setIsFinished(previous => !previous)
                            
                            }} ></input>
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