import React, { useEffect, useRef, useState } from 'react'
import "./TeamEditForm.css"; 
import { ListBoxComponent } from '@syncfusion/ej2-react-dropdowns';
import {BsPlusLg} from "react-icons/bs"; 
import {AiOutlineCheck} from "react-icons/ai"; 


const NewKeyResultForm = ({goal, setActiveNewKeyResult,setKeyResults}) => {

  const [employees, setEmployees] = useState(); 
  const [selectedOwner, setSelectedOwner] = useState(); 
  const [chosenType, setChosenType] = useState(0) ; 
  const [numberOfMileStones, setNumOfMileStones] = useState(1);
  const [isMileStone, setIsMileStone] = useState(false) ; 
  const types = [{value : 0 , name : "percentage"},{value : 1 , name : "milestones"},{value : 2 , name : "binary"}]
  const [mileStones, setMileStones] = useState([]); 
  const stones = [] ;
  const inputRef = useRef(); 

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
        "percentageOfSuccess":0,
        "confidenceLevel": 10,
        "description": e.target[3].value,
        "ownerId":selectedOwner,
        "goalId": goal.id,
        "type":chosenType
      };
    const response = await fetch("https://localhost:44344/api/GoalMaker/NewKeyResult",{
        method: "POST", 
        body : JSON.stringify(newKeyResult),
        headers: {
            'Content-type': 'application/json'
        }
    })
    console.log(response);
    const keyResultId = await response.json(); 
    
    const response1 =
       await fetch("https://localhost:5001/api/GoalMaker/GetGoalKeyResults?goalId="+goal.id)  
      const data1 = await response1.json() ; 
      setKeyResults(data1) ;
      console.log(data1); 

     
    if(isMileStone){
        for(let m of mileStones){
            m.keyResultId = keyResultId; 
    
            const response3 = await fetch("https://localhost:44344/api/GoalMaker/NewMilestone",{
            method: "POST", 
            body : JSON.stringify(m),
            headers: {
                'Content-type': 'application/json'
            }
        })
        console.log(response3); 
    }
    
    }
    
      
  }  

  const onTypeChange = (value)=>{
    setChosenType(value); 
    console.log(value)

    if(value ==1){
        setNumOfMileStones(1);
        setMileStones([]);
        setIsMileStone(true);
    } 
    else {
        setIsMileStone(false); 
        setNumOfMileStones(0); 
        setMileStones([]);
    }
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
                        <input type="number" placeholder='0%' required disabled></input>
                    </div>

                    <div class="input-field">
                        <label>Confidence level</label>
                        <input type="number" placeholder='from 0 to 10' required disabled ></input>
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

                    <div class="input-field">
                        <label>Key Result Type</label>
                        <select required 
                            onChange={(e)=>{
                                onTypeChange(e.target.value); 
                            }}>
                            <option disabled selected>Select type</option>
                            {types.map((type, index)=>(
                                <option key={index} value={type.value}>
                                    {type.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    {isMileStone && 
                    <>
                    <div class="input-field" >
                        <label>MileStone Name</label>
                        <div style={{display:"flex", flexDirection:"row", alignItems:"center"}}>
                        <input type="text" placeholder='name' required ref={inputRef}>
                        </input>
                        <BsPlusLg color='green' fontSize={20} onClick={()=>{
                             
                             const newStone = {
                                name: inputRef.current.value,
                                "isResolved": false
                            };
                             setMileStones(previous => [...previous, newStone]);   
                             inputRef.current.value = "";   
                        }}/>
                        </div>
                        <span>MileStones: </span>
                    </div>  
                    </>    
                    }
                    {mileStones.map((e,i)=>(
                        <div className = "e-card mileStone" key={i}>
                            {e.name}
                        </div>
                    ))}
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