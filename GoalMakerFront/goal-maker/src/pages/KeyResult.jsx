import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { GridComponent, ColumnsDirective, ColumnDirective, Resize, Sort, ContextMenu, Filter, Page,
    ExcelExport, PdfExport, Edit, Inject } from '@syncfusion/ej2-react-grids';
 import Header  from '../components/Header';
 import { initiativesGrid } from '../data/InitiativesGrid';
import CircularBar from '../components/ProgressBar/CircularBar';
import NewInitiativeForm from '../components/Forms/NewInitiativeForm';
import KeyResultEditForm from '../components/Forms/KeyResultEditForm';

const KeyResult = () => {
    const { keyResultId } = useParams(); 
    const [initiatives, setInitiatives] = useState();  
    const [keyResult, setKeyResult] = useState(); 
    const [activeNewInitiative, setActiveNewInitiative]=useState(false);
    const [activeEditKeyResult, setActiveEditKeyResult] = useState(false) ; 
    const [keyResultOwner, setKeyResultOwner] = useState() ; 
    const [refresh, setRefresh]= useState(false); 

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


        const response3 = 
        await fetch("https://localhost:5001/api/GoalMaker/GetUser?userId="+data2.ownerId);  
        const data3 = await response3.json() ; 
        setKeyResultOwner(data3) ; 
        console.log(data3);
        }
        getData(); 
}, [refresh]); 

  if(activeNewInitiative)return <NewInitiativeForm  setActiveNewInitiative={setActiveNewInitiative}
                                keyResult={keyResult} setRefresh={setRefresh}/>

  if(activeEditKeyResult)return <KeyResultEditForm setActiveEditKeyResult={setActiveEditKeyResult}
                                keyResult={keyResult} setRefresh={setRefresh} keyResultOwner={keyResultOwner}/>

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      {keyResult && <>
        <div className="myContainer">
        <div className='left'>
        <div style={{display : "flex"}}>
        <CircularBar percentage={Math.round(keyResult.percentageOfSuccess)}/>
        </div>
        <Header category="Key Result : " title={keyResult.name} />
        <button class="nextBtn dugme" onClick={()=>setActiveNewInitiative(true)}>
                      <span class="btnText">New Initiative</span>
                      <i class="uil uil-navigator"></i>
          </button>
        </div>

        <div className="e-card right" id="basic">
          <div className="e-card-header">
            <div className="e-card-header-caption">
              <div className="e-card-title">Key Result Description</div>
            </div>
          </div>
          <div className="e-card-content">
            Communicating with Windows 10 and Other Apps, the second in a five-part series written by Succinctly series
            author Matteo Pagani. To download the complete white paper, and other papers in the series, visit
            the White Paper section of Syncfusion’s Technology Resource Portal.
            </div>
            <div className="e-card-actions e-card-vertical">
              
            <button className="e-card-btn" style={{color : "blue"}} 
            onClick={()=>setActiveEditKeyResult(true)}>Edit Key Result</button>
            <button className="e-card-btn">Delete Key Result</button>
            </div>
      </div>

    </div>
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