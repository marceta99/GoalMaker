import React, { useEffect, useState } from 'react'; 
import { GridComponent, Inject, ColumnsDirective, ColumnDirective, 
  Search, Page, Toolbar } from '@syncfusion/ej2-react-grids';
import Header  from '../components/Header';
import { goalsGrid } from '../data/goalsTemplate';
import CircularBar from '../components/ProgressBar/CircularBar';
import { useNavigate, useParams } from "react-router-dom";
import '../../node_modules/@syncfusion/ej2-layouts/styles/material.css';
import "../App.css"; 


const OrganizationGoals = () => {
  const  [goals, setGoals] = useState();
  const  [leadershipTeam, setLeadershipTeam]= useState(); 
  const  [leadershipTeamOwner, setLeadershipTeamOwner]= useState(); 
  const  [teamMembers, setTeamMembers] = useState(); 
  const navigate = useNavigate();
  
  useEffect(()=>{
    const getData = async()=>{
      const response1 = await 
      fetch("https://localhost:5001/api/GoalMaker/GetOrganizationalTeamGoals?leadershipTeamId="+2006)  
      const data1 = await response1.json() ;
      data1.forEach(g => {
          g.percentageOfSuccess = Math.round(g.percentageOfSuccess);
      }); 
      setGoals(data1) ;
      console.log(data1);

      const response2 =
       await fetch("https://localhost:5001/api/GoalMaker/GetTeam?teamId="+2006)  
      const data2 = await response2.json() ; 
      setLeadershipTeam(data2) ;
      console.log(data2); 

      const response3 =
       await fetch("https://localhost:5001/api/GoalMaker/GetTeamOwner?teamId="+2006)  
      const data3 = await response3.json() ; 
      setLeadershipTeamOwner(data3) ;
      console.log("team owner :"); 
      console.log(data3); 

      const response4 =
      await fetch("https://localhost:5001/api/GoalMaker/GetTeamMembers?teamId="+2006);    
      const data4 = await response4.json() ; 
      setTeamMembers(data4) ;
      console.log(data4);
    }
    getData();
  },[]);  

  const onSelectGoal = (e)=>{
    const rowIndex = e.row.getAttribute('aria-rowindex') ; 
    const selectedGoal = goals[rowIndex]; 

    console.log(selectedGoal);
    navigate("/organizationGoal/"+selectedGoal.id) ; 
    

  }


  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl " style={{boxShadow:"5px 5px 5px 5px #6b8ce6"}}>

    {leadershipTeam && 
    <div className="myContainer">
      <div className='left'>
        <div style={{display : "flex"}}>
        <CircularBar percentage={Math.round(leadershipTeam.percentageOfSuccess)}/>
        </div>
      <Header category={leadershipTeam.organization.name} title={leadershipTeam.name} />

        <button class="nextBtn dugme" onClick={()=>{}}>
                    <span class="btnText">New Goal</span>
                    <i class="uil uil-navigator"></i>
        </button>
      </div>

      <div style={{display:"flex" , flexDirection:"column", width:"600px", margin:"10px"}}>
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
        
        
        
        
        </div>

        <div style={{display:"flex" , flexDirection:"row", justifyContent:"end"}}>   
              <button onClick={()=>{}} style={{margin:"5px"}} >
                <span class="btnText dugme">Edit Team</span>
                <i class="uil uil-navigator"></i>
              </button>
              <button onClick={()=>{}}   >
                <span class="btnText dugme" style={{backgroundColor:"red"}}>Delete Team</span>
                <i class="uil uil-navigator"></i>
              </button>
              
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
      rowSelected={(e)=>{onSelectGoal(e)}}
    >
      <ColumnsDirective>
        {goalsGrid.map((item, index) => <ColumnDirective key={index} {...item} />)}
      </ColumnsDirective>

      <Inject services={[Search, Page, Toolbar]} />

    </GridComponent>
    
  </div>
  )
}

export default OrganizationGoals; 