import React, { useEffect, useState } from 'react';
import { GridComponent, Inject, ColumnsDirective, ColumnDirective, 
  Search, Page, Toolbar } from '@syncfusion/ej2-react-grids';
import Header  from '../components/Header';
import { goalsGrid } from '../data/goalsTemplate';
import CircularBar from '../components/ProgressBar/CircularBar';
import { useNavigate, useParams } from "react-router-dom";
import '../../node_modules/@syncfusion/ej2-layouts/styles/material.css';
import "../App.css"; 
import {BiEdit} from "react-icons/bi"; 
import TeamEditForm from '../components/Forms/TeamEditForm';
import NewGoalForm from '../components/Forms/NewGoalForm';

const Goals = () => {
  const [goals, setGoals]=useState() ; 
  const [team, setTeam] = useState(); 
  const navigate = useNavigate();
  const {teamId} = useParams(); 
  const [activeForm, setActiveForm] = useState(false) ; 
  const [activeNewGoal, setActiveNewGoal] = useState(false) ; 
  const [teamOwner, setTeamOwner] = useState() ; 
  const [teamEmployees, setTeamEmployees] = useState(); 

  useEffect(()=>{
    const getData = async()=>{
      const response1 =
       await fetch("https://localhost:5001/api/GoalMaker/GetTeamGoals?teamId="+teamId)  
      const data1 = await response1.json() ; 
      setGoals(data1) ;
      console.log(data1); 

      const response2 =
       await fetch("https://localhost:5001/api/GoalMaker/GetTeam?teamId="+teamId)  
      const data2 = await response2.json() ; 
      setTeam(data2) ;
      console.log(data2); 

      const response3 =
       await fetch("https://localhost:5001/api/GoalMaker/GetTeamOwner?teamId="+teamId)  
      const data3 = await response3.json() ; 
      setTeamOwner(data3) ;
      console.log(data3); 

      const response4 =
       await fetch("https://localhost:5001/api/GoalMaker/GetTeamMembers?teamId="+teamId)  
      const data4 = await response4.json() ; 
      setTeamEmployees(data4) ;
      console.log(data4); 

      }
      getData(); 
  },[])

  const onSelectGoal = (e)=>{
    const rowIndex = e.row.getAttribute('aria-rowindex') ; 
    const selectedGoal = goals[rowIndex]; 

    console.log(selectedGoal);
    navigate("/goal/"+selectedGoal.id) ; 
    

  }
  if(activeForm)return <TeamEditForm team={team} setActiveForm={setActiveForm}
                       setTeam={setTeam} teamOwner={teamOwner} teamEmployees={teamEmployees}/>

  if(activeNewGoal)return <NewGoalForm team={team} setActiveForm={setActiveForm} setTeam={setTeam}/>

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl ">

      {team && 
      <div className="myContainer">
        <div className='left'>
          <div style={{display : "flex"}}>
          <CircularBar percentage={team.percentageOfSuccess}/>
          </div>
        <Header category={team.organization.name} title={team.name} />

          <button class="nextBtn dugme" onClick={()=>setActiveNewGoal(true)}>
                      <span class="btnText">New Goal</span>
                      <i class="uil uil-navigator"></i>
          </button>
        </div>

        <div className="e-card right" id="basic" style={{marginLeft :"10px"}}>
          <div className="e-card-header">
            <div className="e-card-header-caption">
              <div className="e-card-title">Team Description</div>
            </div>
          </div>
          <div className="e-card-content">
            Communicating with Windows 10 and Other Apps, the second in a five-part series written by Succinctly series
            author Matteo Pagani. To download the complete white paper, and other papers in the series, visit
            the White Paper section of Syncfusion’s Technology Resource Portal.
            </div>
            <div className="e-card-actions e-card-vertical">
              
            <button onClick={()=>setActiveForm(true)} 
            className="e-card-btn" style={{color : "blue"}}>Edit Team</button>
            <button className="e-card-btn">Delete Team</button>
            </div>
      </div>

    </div>
    }
      <GridComponent
        dataSource={goals}
        width="auto"
        allowPaging
        allowSorting
        toolbar={['Search']}
        rowSelected={(e)=>onSelectGoal(e)}
      >
        <ColumnsDirective>
          {goalsGrid.map((item, index) => <ColumnDirective key={index} {...item} />)}
        </ColumnsDirective>

        <Inject services={[Search, Page, Toolbar]} />

      </GridComponent>
      
    </div>
  );
};
export default Goals;