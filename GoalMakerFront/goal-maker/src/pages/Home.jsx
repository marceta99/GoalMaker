import React, { useEffect, useState } from 'react' ; 
import { GridComponent, Inject, ColumnsDirective, ColumnDirective, Search, Page, Toolbar } from '@syncfusion/ej2-react-grids';

import { teamsGrid } from '../data/template';
import Header  from '../components/Header';
import { useNavigate } from 'react-router-dom';
import NewTeamForm from '../components/Forms/NewTeamForm';

const Home = () => {
  const [organization, setOrganization]= useState();  
  const [teams, setTeams] = useState();
  const [activeNewTeam, setActiveNewTeam] = useState(false);  
  const navigate = useNavigate(); 

  useEffect(()=>{
    const getData = async()=>{
      const response1 = await fetch("https://localhost:5001/api/GoalMaker/GetOrganization?orgId=1")  
      const data1 = await response1.json() ; 
      setOrganization(data1) ; 

      const response2 = await 
          fetch("https://localhost:5001/api/GoalMaker/GetOrganizationTeamsWithId?organizationId=1")
      const data2 = await response2.json() ;
      data2.forEach(team => {
        team.percentageOfSuccess = Math.round(team.percentageOfSuccess); 
      });
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
  if(activeNewTeam)return <NewTeamForm organization={organization} 
          setActiveNewTeam={setActiveNewTeam} setTeams={setTeams}/>

  return (
    <div>

    {organization && 
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
    <button class="nextBtn dugme" onClick={()=>setActiveNewTeam(true)}>
            <span class="btnText">New Team</span>
            <i class="uil uil-navigator"></i>
      </button>
      <Header category= {organization ? "Organization -  " + organization.name : ""} 
      title={organization ? organization.name + "'s Teams" : ""} />
      {teams && <>
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
      </>}  
      
    </div>}



    </div>
  )
}

export default Home