const gridInitiativeOwner = (props) => (
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


  const gridInitiatveState = (props) => (
    <button
      type="button"
      style={{ background: props.initiativeState === 0 ? "red" 
      : props.initiativeState === 1 ? "blue" : "green"}}
      className="text-white py-1 px-2 capitalize rounded-2xl text-md"
    >
      {props.initiativeState === 0 ? "Non started" : "" }
      {props.initiativeState === 1 ? "In progress" : "" }
      {props.initiativeState === 2 ? "Done" : "" }
    </button>
  );

export const initiativesGrid = [
    { headerText: 'Initiative Owner',
      width: '150',
      template: gridInitiativeOwner,
      textAlign: 'Center' },
    { field: 'name',
      headerText: '',
      width: '0',
      textAlign: 'Center',
    },
    { field: 'name',
      headerText: 'initiaitve',
      width: '170',
      textAlign: 'Center',
    }, 
    { field: 'comments',
      headerText: 'comments',
      width: '170',
      textAlign: 'Center',
    },   
    {
      headerText: 'State',
      template: gridInitiatveState,
      textAlign: 'Center',
      width: '120',
    }
  ];