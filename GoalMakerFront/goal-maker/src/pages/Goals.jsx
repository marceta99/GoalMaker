import React, { useEffect, useState } from 'react';
import { GridComponent, Inject, ColumnsDirective, ColumnDirective, 
  Search, Page, Toolbar } from '@syncfusion/ej2-react-grids';
import Header  from '../components/Header';
import { goalsGrid } from '../data/goalsTemplate';
import CircularBar from '../components/ProgressBar/CircularBar';
import { useNavigate, useParams } from "react-router-dom";

const Goals = () => {
  const [goals, setGoals]=useState() ; 
  const [team, setTeam] = useState(); 
  const navigate = useNavigate();
  const {teamId} = useParams(); 

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
      }
      getData(); 
  },[])

  const onSelectGoal = (e)=>{
    const rowIndex = e.row.getAttribute('aria-rowindex') ; 
    const selectedGoal = goals[rowIndex]; 

    console.log(selectedGoal);
    navigate("/goal/"+selectedGoal.id) ; 
    

  }

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      {team &&<>
      <CircularBar percentage={team.percentageOfSuccess}/>
      <Header category={team.organization.name} title={team.name} />
      </>}
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