import React, { useEffect, useState } from 'react' ; 
import { GridComponent, Inject, ColumnsDirective, ColumnDirective, Search, Page, Toolbar } from '@syncfusion/ej2-react-grids';

import { teamsGrid } from '../data/template';
import Header  from '../components/Header';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [organization, setOrganization]= useState();  
  const [teams, setTeams] = useState(); 
  const navigate = useNavigate(); 

  useEffect(()=>{
    const getData = async()=>{
      const response1 = await fetch("https://localhost:5001/api/GoalMaker/GetOrganization?orgId=1")  
      const data1 = await response1.json() ; 
      setOrganization(data1) ; 

      const response2 = await 
          fetch("https://localhost:5001/api/GoalMaker/GetOrganizationTeamsWithId?organizationId=1")
      const data2 = await response2.json() ;
      setTeams(data2) ; 
      console.log(data2);  
      }
    getData() ;
           
  },[]);

  const onSelectTeam = (e)=>{
    const rowIndex = e.row.getAttribute('aria-rowindex') ; 
    const selectedTeam = teams[rowIndex]; 

    console.log(selectedTeam);
    navigate("/team/"+selectedTeam.id) ; 
    

  }

  return (
    <div>

    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Organization" title={organization ? organization.name + "'s Teams :" : ""} />
      <GridComponent
        dataSource={teams}
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



    </div>
  )
}

export default Home