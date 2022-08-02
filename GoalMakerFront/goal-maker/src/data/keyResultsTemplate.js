import { GrLocation } from 'react-icons/gr';
import ProgressBar from '../components/ProgressBar/ProgressBar';

const gridKeyResultOwner = (props) => (
    <div className="flex items-center gap-2">
      <img
        className="rounded-full w-10 h-10"
        src={"https://picsum.photos/200/300?random="+Math.floor(Math.random()*10)}
        alt="team"
      />
      <p>{props.owner.firstName}</p>
      <p>{props.owner.lastName}</p>
    </div>
  );

  const gridPercentageKeyResult = (props)=>(
    <div className="flex items-center justify-center gap-2">
      <ProgressBar percentage={props.percentageOfSuccess} />
      <span>{props.percentageOfSuccess}%</span>
    </div>
  );

export const keyResultsGrid = [
    { headerText: 'Key Result Owner',
      width: '150',
      template: gridKeyResultOwner,
      textAlign: 'Center' },
    { field: 'name',
      headerText: '',
      width: '0',
      textAlign: 'Center',
    },
    { field: 'name',
      headerText: 'Key result',
      width: '170',
      textAlign: 'Center',
    },      
    { field: 'confidenceLevel',
      headerText: 'Confidence Level',
      width: '100',
      textAlign: 'Center',
    },
    { headerText: 'Success %',
      template: gridPercentageKeyResult,
      width: '170',
      textAlign: 'Center',
    },
    { field: 'description',
      headerText: 'description',
      width: '100',
      textAlign: 'Center',
    },
    
  ];