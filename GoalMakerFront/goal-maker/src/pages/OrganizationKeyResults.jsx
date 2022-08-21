import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { keyResultsGrid } from '../data/keyResultsTemplate';
import { GridComponent, Inject, ColumnsDirective, ColumnDirective, 
  Search, Page, Toolbar } from '@syncfusion/ej2-react-grids';
import Header  from '../components/Header';
import CircularBar from '../components/ProgressBar/CircularBar';
import { useNavigate } from "react-router-dom";
import { goalsGrid } from '../data/goalsTemplate';
import { teamsGrid } from '../data/template';
import NewKeyResultForm from '../components/Forms/NewKeyResultForm';
import GoalEditForm from '../components/Forms/GoalEditForm';

const OrganizationKeyResults = () => {
  const [keyResults, setKeyResults] = useState();
  const [organizationGoal, setOrganizationGoal] = useState(); 
  const [goalOwner, setGoalOwner] = useState();  
  const { goalId } = useParams(); 
  const navigate = useNavigate(); 
  const [contributeGoals, setContributeGoals] = useState() ; 
  const [contributeTeams, setContributeTeams] = useState(); 

  useEffect(()=>{
    const getData = async()=>{
      const response1 =
      await fetch("https://localhost:5001/api/GoalMaker/GetOrganizationalGoalKeyResults?goalId="+goalId);  
      const data1 = await response1.json() ; 
      data1.forEach(kr => {
        kr.percentageOfSuccess = Math.round(kr.percentageOfSuccess); 
      });
      setKeyResults(data1) ;
      console.log(data1);

      const response2 =
         await fetch("https://localhost:5001/api/GoalMaker/GetOrganizationalGoal?goalId="+goalId);  
        const data2 = await response2.json() ; 
        setOrganizationGoal(data2) ;
        console.log(data2); 

        const response3 = 
        await fetch("https://localhost:5001/api/GoalMaker/GetUser?userId="+data2.goalOwnerId);  
        const data3 = await response3.json() ; 
        setGoalOwner(data3) ; 
        console.log(data3);

        const response4 = 
        await fetch("https://localhost:5001/api/GoalMaker/GetGoalsThatContributeToOrgGoal?organizationGoalId="+goalId);  
        const data4 = await response4.json() ; 
        data4.forEach(g => {
          g.percentageOfSuccess = Math.round(g.percentageOfSuccess); 
        });
        setContributeGoals(data4) ; 
        console.log(data4);

        const response5 = 
        await fetch("https://localhost:5001/api/GoalMaker/GetTeamsThatContributeToOrgGoal?organizationGoalId="+goalId);  
        const data5 = await response5.json() ; 
        data5.forEach(t => {
          t.percentageOfSuccess = Math.round(t.percentageOfSuccess); 
        });
        setContributeTeams(data5) ; 
        console.log(data5);
    }
    getData() ; 
  },[]);

  const onSelectKeyResult = (e)=>{
    const rowIndex = e.row.getAttribute('aria-rowindex') ; 
    const selectedKeyResult = keyResults[rowIndex]; 

    console.log(selectedKeyResult);
    navigate("/organizationKeyResult/"+selectedKeyResult.id) ; 
    
  }
  const onSelectGoal = (e)=>{
    const rowIndex = e.row.getAttribute('aria-rowindex') ; 
    const selectedGoal = contributeGoals[rowIndex]; 

    console.log(selectedGoal);
    navigate("/goal/"+selectedGoal.id) ; 
    

  }
  const onSelectTeam = (e)=>{
    const rowIndex = e.row.getAttribute('aria-rowindex') ; 
    const selectedTeam = contributeTeams[rowIndex]; 

    console.log(selectedTeam);
    navigate("/team/"+selectedTeam.id) ; 
    

  }
  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl" style={{boxShadow:"5px 5px 5px 5px #6b8ce6"}}>
        {organizationGoal && 
      <div className="myContainer">
        <div className='left'>
        <div style={{display : "flex"}}>
        <CircularBar percentage={Math.round(organizationGoal.percentageOfSuccess)}/>
        </div>
        <Header category={organizationGoal.leadershipTeam.name} title={"Goal-"+organizationGoal.name} />
        <button class="nextBtn dugme" onClick={()=>{}}>
                      <span class="btnText">New Key Result</span>
                      <i class="uil uil-navigator"></i>
          </button>
        </div>

      <div style={{display:"flex" , flexDirection:"column",width:"600px", margin:"10px"}}>
      <div className="e-card right" id="basic">
          <div className="e-card-header">
            <div className="e-card-header-caption">
              <div className="e-card-title">Goal Description</div>
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
                <span class="btnText dugme">Edit Goal</span>
                <i class="uil uil-navigator"></i>
              </button>
              <button onClick={()=>{}}   >
                <span class="btnText dugme" style={{backgroundColor:"red"}}>Delete Goal</span>
                <i class="uil uil-navigator"></i>
              </button>
              
        </div>
      </div>


    </div>
    }   
      <div style={{margin:"10px"}}>
        <h1>Organizational key results :</h1>
      </div>

      <GridComponent
        dataSource={keyResults}
        width="auto"
        allowPaging
        allowSorting
        toolbar={['Search']}
        rowSelected={(e)=>onSelectKeyResult(e)}
      >
        <ColumnsDirective>
          {keyResultsGrid.map((item, index) => <ColumnDirective key={index} {...item} />)}
        </ColumnsDirective>

        <Inject services={[Search, Page, Toolbar]} />

      </GridComponent>
    
      <div style={{margin:"10px"}}>
        <h1>Goals that contribute to this organizational goal :</h1>
      </div>

      <GridComponent
        dataSource={contributeGoals}
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
    
      <div style={{margin:"10px"}}>
        <h1>Teams that contribute to this organizational goal :</h1>
      </div>

      <GridComponent
        dataSource={contributeTeams}
        width="auto"
        allowPaging
        allowSorting
        toolbar={['Search']}
        rowSelected={(e)=>onSelectTeam(e)}
      >
        <ColumnsDirective>
          {teamsGrid.map((item, index) => <ColumnDirective key={index} {...item} />)}
        </ColumnsDirective>

        <Inject services={[Search, Page, Toolbar]} />

      </GridComponent>
    
    </div>
  )
}

export default OrganizationKeyResults;