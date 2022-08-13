import { AiOutlineAreaChart, AiOutlineBarChart, AiOutlineCalendar, AiOutlineStock } from 'react-icons/ai';
import { BiColorFill } from 'react-icons/bi';
import { BsBarChart, BsKanban } from 'react-icons/bs';
import { FiEdit, FiPieChart, FiShoppingBag } from 'react-icons/fi';
import { GiLouvrePyramid } from 'react-icons/gi';
import { GrLocation } from 'react-icons/gr';
import { RiStockLine } from 'react-icons/ri';
import {AiOutlineTeam} from "react-icons/ai" ; 
import {GiStairsGoal} from "react-icons/gi" ; 
import {GrOrganization} from "react-icons/gr";
import ProgressBar from '../components/ProgressBar/ProgressBar';

const gridTeamProfile = (props) => (
    <div className="flex items-center gap-2">
      <img
        className="rounded-full w-10 h-10"
        src={"https://picsum.photos/200/300?random="+Math.floor(Math.random()*10)}
        alt="team"
      />
      <p>{props?.owner?.firstName}</p>
      <p>{props?.owner?.lastName}</p>
    </div>
  );

  const gridTeamCountry = (props) => (
    <div className="flex items-center justify-center gap-2">
      <GrLocation />
      <span>{props.teamCountry}</span>
    </div>
  );

  const gridPercentageTeam = (props)=>(
    <div className="flex items-center justify-center gap-2">
      <ProgressBar percentage={props.percentageOfSuccess} />
      <span>{props.percentageOfSuccess}%</span>
    </div>
  );


export const teamsGrid = [
    { headerText: 'Team Owner',
      width: '150',
      template: gridTeamProfile,
      textAlign: 'Center' },
    { field: 'name',
      headerText: '',
      width: '0',
      textAlign: 'Center',
    },
    { field: 'name',
      headerText: 'Team Name',
      width: '170',
      textAlign: 'Center',
    },      
    { field: 'confidenceLevel',
      headerText: 'Confidence Level',
      width: '100',
      textAlign: 'Center',
    },
    { headerText: 'Success %',
      template: gridPercentageTeam,
      width: '170',
      textAlign: 'Center',
    },
    { headerText: 'Country',
    width: '120',
    textAlign: 'Center',
    template: gridTeamCountry },
    
    
  ];



  export const links = [
    {
      title: 'Dashboard',
      links: [
        {
          name: 'home',
          route: 'home',
          icon: <GrOrganization />,
        },
        {
          name: 'my teams',
          route: 'myTeams',
          icon: <AiOutlineTeam />,
        },
        {
          name: 'organization goals',
          route: 'organizationGoals',
          icon: <GiStairsGoal />,
        },
      ],
    },
  
    {
      title: 'Pages',
      links: [
        {
          name: 'calendar',
          route: 'calendar',
          icon: <AiOutlineCalendar />,
        },
        {
          name: 'kanban',
          route: 'kanban',
          icon: <BsKanban />,
        },
        {
          name: 'editor',
          route: 'editor',
          icon: <FiEdit />,
        },
        {
          name: 'color-picker',
          route: 'colorPicker',
          icon: <BiColorFill />,
        },
      ],
    },
    {
      title: 'Charts',
      links: [
        {
          name: 'line',
          route: 'line',
          icon: <AiOutlineStock />,
        },
        {
          name: 'area',
          route: 'area',
          icon: <AiOutlineAreaChart />,
        },
  
        {
          name: 'bar',
          route: 'bar',
          icon: <AiOutlineBarChart />,
        },
        {
          name: 'pie',
          route: 'pie',
          icon: <FiPieChart />,
        },
        {
          name: 'financial',
          route: 'financial',
          icon: <RiStockLine />,
        },
        {
          name: 'color-mapping',
          route: 'color-mapping',
          icon: <BsBarChart />,
        },
        {
          name: 'pyramid',
          route: 'pyramid',
          icon: <GiLouvrePyramid/>,
        },
        {
          name: 'stacked',
          route: 'stacked',
          icon: <AiOutlineBarChart />,
        },
      ],
    },
  ];
  