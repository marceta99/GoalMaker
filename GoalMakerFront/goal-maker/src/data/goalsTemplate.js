import { GrLocation } from 'react-icons/gr';
import ProgressBar from '../components/ProgressBar/ProgressBar';

const gridGoalOwner = (props) => (
    <div className="flex items-center gap-2">
      <img
        className="rounded-full w-10 h-10"
        src="https://picsum.photos/200/300?random=2"
        alt="team"
      />
      <p>{props.goalOwner.firstName}</p>
      <p>{props.goalOwner.lastName}</p>
    </div>
  );

  const gridPercentageGoal = (props)=>(
    <div className="flex items-center justify-center gap-2">
      <ProgressBar percentage={props.percentageOfSuccess} />
      <span>{props.percentageOfSuccess}%</span>
    </div>
  );

  const gridStartDate = (props)=>(
    <div className="flex items-center justify-center gap-2">
      <span>{props.startDate.substring(0,10)}</span>
    </div>
  );
  const gridEndDate = (props)=>(
    <div className="flex items-center justify-center gap-2">
      <span>{props.endDate.substring(0,10)}</span>
    </div>
  );
export const goalsGrid = [
    { headerText: 'Goal Owner',
      width: '150',
      template: gridGoalOwner,
      textAlign: 'Center' },
    { field: 'name',
      headerText: '',
      width: '0',
      textAlign: 'Center',
    },
    { field: 'name',
      headerText: 'Goal',
      width: '170',
      textAlign: 'Center',
    },      
    { field: 'confidenceLevel',
      headerText: 'Confidence Level',
      width: '100',
      textAlign: 'Center',
    },
    { headerText: 'Success %',
      template: gridPercentageGoal,
      width: '170',
      textAlign: 'Center',
    },
    { headerText: 'Start Date',
      template: gridStartDate,
      width: '170',
      textAlign: 'Center',
    },
    { headerText: 'End Date',
      template: gridEndDate,
      width: '170',
      textAlign: 'Center',
    },
    
    
  ];