import React, { createContext, useContext, useState } from 'react';

const StateContext = React.createContext() ; 

const initialState = {
    chart : false , 
    chat : false , 
    userProfile : false , 
    notifications : false  
}

export const ContextProvider = ({children})=>{
    const [activeMenu, setActiveMenu] = useState(true) ; 
    const [isClicked, setIsClicked] = useState(initialState); 
    const [screenSize, setScreenSize] = useState(undefined);

    //argument clicked is string ("chart", "chat" , "userProfile", "notifications" )
    const handleClick = (clicked)=>{
        //with this, only what is clicked will get true value, and what is not clicked will be false
        setIsClicked({...initialState, [clicked] : true}); 
    }

    return (
        <StateContext.Provider value={{
            activeMenu : activeMenu ,
            setActiveMenu : setActiveMenu, 
            isClicked : isClicked, 
            setIsClicked : setIsClicked, 
            handleClick : handleClick,
            screenSize: screenSize, 
            setScreenSize : setScreenSize
        }}> 
            {children}
        </StateContext.Provider>
    );
}

export const useStateContext = ()=> useContext(StateContext); 