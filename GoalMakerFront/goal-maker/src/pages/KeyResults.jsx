import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { keyResultsGrid } from '../data/keyResultsTemplate';
import { GridComponent, Inject, ColumnsDirective, ColumnDirective, 
  Search, Page, Toolbar } from '@syncfusion/ej2-react-grids';
import Header  from '../components/Header';
import CircularBar from '../components/ProgressBar/CircularBar';
import { useNavigate } from "react-router-dom";


const KeyResults = () => {
  const { goalId } = useParams(); 
  const [keyResults, setKeyResults]= useState();  
  const [goal, setGoal] = useState(); 
  const navigate = useNavigate() ; 

  useEffect(()=>{
    const getData = async()=>{
        const response1 =
         await fetch("https://localhost:5001/api/GoalMaker/GetGoalKeyResults?goalId="+goalId);  
        const data1 = await response1.json() ; 
        setKeyResults(data1) ;
        console.log(data1); 

        const response2 =
         await fetch("https://localhost:5001/api/GoalMaker/GetGoal?goalId="+goalId);  
        const data2 = await response2.json() ; 
        setGoal(data2) ;
        console.log(data2); 
        }
        getData(); 
  },[]) ;

  const onSelectKeyResult = (e)=>{
    const rowIndex = e.row.getAttribute('aria-rowindex') ; 
    const selectedKeyResult = keyResults[rowIndex]; 

    console.log(selectedKeyResult);
    navigate("/keyResult/"+selectedKeyResult.id) ; 
    

  }

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      {goal && <>
      <CircularBar percentage={goal.percentageOfSuccess}/>
      <Header category={goal.team.name} title={goal.name} />
      </>
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
    </div>
  )
}

export default KeyResults