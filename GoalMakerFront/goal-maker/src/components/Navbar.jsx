import React, { useEffect } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import { BsChatLeft } from 'react-icons/bs';
import { RiNotification3Line } from 'react-icons/ri';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';


import avatar from '../data/avatar.jpg';
import { useStateContext } from '../contexts/ContextProvider';

const NavButton = ({title, customFunc, icon , color, datColor })=>(

    <TooltipComponent content={title} position="BottomCenter"> 
        <button type='button' onClick={customFunc} style={{color}}
        className="relative text-xl rounded-full p-3 hover:bg-light-gray ">
          <span style={{backgroundClip : datColor}}
          className="absolute inline-flex rounded-full h-2 w-2 right-2 top-2"/>
            {icon}
          
        </button>
    </TooltipComponent>
); 

const Navbar = () => {
  const {activeMenu , setActiveMenu, isClicked, setIsClicked, handleClick, 
         screenSize , setScreenSize } = useStateContext() ; 
    
  useEffect(()=>{ 
    const handleResize =()=> setScreenSize(window.innerWidth); 

    //every time that window is resized we want handleResize function to be called 
    window.addEventListener("resize", handleResize);  
    
    //initialy we want handleResize function to be called to check initial width
    handleResize();

    //also in react every time that we use addEventListener we want to remove that eventListener
    return window.removeEventListener("resize", handleResize); 
  },[]);
  
  //we can have as many useEffects as we want 
  useEffect(()=>{
    if(screenSize <= 900){
      //if screen width is less that 900px we dont want to show sideBar menu because is too big 
      setActiveMenu(false); 
    }else {
      setActiveMenu(true);
    }
  },[screenSize]); 

  return (
    <div className="flex justify-between p-2 md:ml-6 md:mr-6 relative">
      <NavButton title="Menu" customFunc={()=>setActiveMenu(previous => !previous)} 
      color="blue" icon={<AiOutlineMenu/>} />

      <div className='flex'>
        <NavButton title="Chat" dotColor="blue" customFunc={() => handleClick('chat')} color="black" icon={<BsChatLeft />} />
        <NavButton title="Notification" dotColor="rgb(254, 201, 15)" customFunc={() => handleClick('notification')} color="black" icon={<RiNotification3Line />} />
      
        <TooltipComponent content="Profile" position="BottomCenter">
          <div className="flex items-center gap-2 cursor-pointer p-1
           hover:bg-light-gray rounded-lg"  onClick={() => handleClick('userProfile')}>
            <img
              className="rounded-full w-8 h-8"
              src={avatar}
              alt="user-profile"
            />
            <p>
              <span className="text-gray-400 text-14">Hi,</span>{' '}
              <span className="text-gray-400 font-bold ml-1 text-14">
                Michael
              </span>
            </p>
            <MdKeyboardArrowDown className="text-gray-400 text-14" />
           </div>
        </TooltipComponent>
      </div>

    </div>
  )
}

export default Navbar