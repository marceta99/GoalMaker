import { AiOutlineAreaChart, AiOutlineBarChart, AiOutlineCalendar, AiOutlineStock } from 'react-icons/ai';
import { BiColorFill } from 'react-icons/bi';
import { BsBarChart, BsKanban } from 'react-icons/bs';
import { FiEdit, FiPieChart, FiShoppingBag } from 'react-icons/fi';
import { GiLouvrePyramid } from 'react-icons/gi';
import { GrLocation } from 'react-icons/gr';
import { RiStockLine } from 'react-icons/ri';
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
          icon: <FiShoppingBag />,
        },
        {
          name: 'my teams',
          icon: <FiShoppingBag />,
        },
      ],
    },
  
    {
      title: 'Pages',
      links: [
        {
          name: 'calendar',
          icon: <AiOutlineCalendar />,
        },
        {
          name: 'kanban',
          icon: <BsKanban />,
        },
        {
          name: 'editor',
          icon: <FiEdit />,
        },
        {
          name: 'color-picker',
          icon: <BiColorFill />,
        },
      ],
    },
    {
      title: 'Charts',
      links: [
        {
          name: 'line',
          icon: <AiOutlineStock />,
        },
        {
          name: 'area',
          icon: <AiOutlineAreaChart />,
        },
  
        {
          name: 'bar',
          icon: <AiOutlineBarChart />,
        },
        {
          name: 'pie',
          icon: <FiPieChart />,
        },
        {
          name: 'financial',
          icon: <RiStockLine />,
        },
        {
          name: 'color-mapping',
          icon: <BsBarChart />,
        },
        {
          name: 'pyramid',
          icon: <GiLouvrePyramid/>,
        },
        {
          name: 'stacked',
          icon: <AiOutlineBarChart />,
        },
      ],
    },
  ];
  