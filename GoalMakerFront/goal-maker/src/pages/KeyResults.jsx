import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { keyResultsGrid } from '../data/keyResultsTemplate';
import { GridComponent, Inject, ColumnsDirective, ColumnDirective, 
  Search, Page, Toolbar } from '@syncfusion/ej2-react-grids';
import Header  from '../components/Header';
import CircularBar from '../components/ProgressBar/CircularBar';
import { useNavigate } from "react-router-dom";
import NewKeyResultForm from '../components/Forms/NewKeyResultForm';
import GoalEditForm from '../components/Forms/GoalEditForm';
import { teamsGrid } from '../data/template';


const KeyResults = () => {
  const { goalId } = useParams(); 
  const [keyResults, setKeyResults]= useState();  
  const [goal, setGoal] = useState(); 
  const [activeNewKeyResult, setActiveNewKeyResult] = useState(false); 
  const [activeEditGoal, setActiveEditGoal] = useState(false) ;
  const [goalOwner, setGoalOwner] = useState() ; 
  const navigate = useNavigate() ; 
  const [dependedTeams, setDependedTeams]= useState();

  useEffect(()=>{
    console.log("REFRESHHHH");
        const getData = async()=>{
        const response1 =
         await fetch("https://localhost:5001/api/GoalMaker/GetGoalKeyResults?goalId="+goalId);  
        const data1 = await response1.json() ; 
        data1.forEach(kr => {
          kr.percentageOfSuccess = Math.round(kr.percentageOfSuccess); 
        });
        setKeyResults(data1) ;
        console.log(data1); 

        const response2 =
         await fetch("https://localhost:5001/api/GoalMaker/GetGoal?goalId="+goalId);  
        const data2 = await response2.json() ; 
        setGoal(data2) ;
        console.log(data2); 

        const response3 = 
        await fetch("https://localhost:5001/api/GoalMaker/GetUser?userId="+data2.goalOwnerId);  
        const data3 = await response3.json() ; 
        setGoalOwner(data3) ; 
        console.log(data3);

        const response4 = 
        await fetch("https://localhost:5001/api/GoalMaker/GetGoalDependedTeams?goalId="+goalId);  
        const data4 = await response4.json() ;
        data4.forEach(t => {
          t.percentageOfSuccess = Math.round(t.percentageOfSuccess); 
        }); 
        setDependedTeams(data4) ; 
        console.log(data4);
        }
        getData(); 
  },[]) ;

  const onSelectKeyResult = (e)=>{
    const rowIndex = e.row.getAttribute('aria-rowindex') ; 
    const selectedKeyResult = keyResults[rowIndex]; 

    console.log(selectedKeyResult);
    navigate("/keyResult/"+selectedKeyResult.id) ; 
    

  }
  const onSelectTeam = (e)=>{
    const rowIndex = e.row.getAttribute('aria-rowindex') ; 
    const selectedTeam = dependedTeams[rowIndex]; 

    console.log(selectedTeam);
    navigate("/team/"+selectedTeam.id) ; 
    

  }

  if(activeEditGoal)return <GoalEditForm goal={goal} setActiveEditGoal={setActiveEditGoal}
                            goalOwner={goalOwner} setGoalOwner={setGoalOwner} setGoal={setGoal}
                            dependedTeams={dependedTeams} setDependedTeams={setDependedTeams}/>

  if(activeNewKeyResult)return <NewKeyResultForm goal={goal} setActiveNewKeyResult={setActiveNewKeyResult}
                              setKeyResults={setKeyResults}/>

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl" style={{boxShadow:"4px 4px 4px 4px #6b8ce6"}}>
       {goal && 
      <div className="myContainer">
        <div className='left'>
        <div style={{display : "flex"}}>
        <CircularBar percentage={Math.round(goal.percentageOfSuccess)}/>
        </div>
        <Header category={goal.team.name} title={"Goal-"+goal.name} />
        <button class="nextBtn dugme" onClick={()=>setActiveNewKeyResult(true)}>
                      <span class="btnText">New Key Result</span>
                      <i class="uil uil-navigator"></i>
          </button>
        </div>

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
            <div className="e-card-actions e-card-vertical">
              
            <button className="e-card-btn" style={{color : "blue"}} 
            onClick={()=>setActiveEditGoal(true)}>Edit Goal</button>
            <button className="e-card-btn">Delete Goal</button>
            </div>
      </div>

    </div>
    }
       
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
        <h1>Teams on which this goal depends :</h1>
      </div>

      {dependedTeams && <>
        <GridComponent
        dataSource={dependedTeams}
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
      </>}  



    </div>
  )
}

export default KeyResults