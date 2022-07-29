import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { GridComponent, ColumnsDirective, ColumnDirective, Resize, Sort, ContextMenu, Filter, Page,
    ExcelExport, PdfExport, Edit, Inject } from '@syncfusion/ej2-react-grids';
 import Header  from '../components/Header';
 import { initiativesGrid } from '../data/InitiativesGrid';
import CircularBar from '../components/ProgressBar/CircularBar';

const KeyResult = () => {
    const { keyResultId } = useParams(); 
    const [initiatives, setInitiatives] = useState();  
    const [keyResult, setKeyResult] = useState(); 

useEffect(()=>{
    
    const getData = async()=>{
        const response1 =
        await fetch("https://localhost:5001/api/GoalMaker/GetKeyResultInitiatives?keyResultId="+keyResultId);  
        const data1 = await response1.json() ; 
        setInitiatives(data1) ;
        console.log(data1);
        
        const response2 =
        await fetch("https://localhost:5001/api/GoalMaker/GetKeyResult?keyResultId="+keyResultId);  
        const data2 = await response2.json() ; 
        setKeyResult(data2) ;
        console.log(data2); 
        }
        getData(); 
}, []); 

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      {keyResult && <>
      <CircularBar percentage={keyResult.percentageOfSuccess}/>
      <Header category={keyResult.goal.name} title={keyResult.name}/>
      </>
      }
      <GridComponent id='gridcomp' dataSource={initiatives} allowPaging allowSorting
        allowExcelExport allowPdfExport>
        <ColumnsDirective>
          {initiativesGrid.map((item, index)=>(
            <ColumnDirective key={index} {...item}/>
          ))}
        </ColumnsDirective>

        <Inject services={[Resize, Sort, ContextMenu, Filter, Page, ExcelExport, PdfExport, Edit]}/>
      
      </GridComponent>
    </div>
  )
}

export default KeyResult; 