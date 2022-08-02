import React, { useState } from 'react' ; 
import "../App.css";
import {BrowserRouter, Route, Routes} from "react-router-dom"; 
import {FiSettings} from "react-icons/fi" ; 
import {TooltipComponent} from "@syncfusion/ej2-react-popups" ;  
import { Navbar, Footer, Sidebar, ThemeSettings } from '../components/Index';
import { Home, Goals} from './Index';
import KeyResults from './KeyResults';
import KeyResult from './KeyResult';
import { useStateContext } from '../contexts/ContextProvider';

const Welcome = () => {
    const {activeMenu} = useStateContext() ;  
  return (
    <div>
        <div className='flex relative dark:bg-main-dark-bg'>
          <div className='fixed right-4 bottom-4' style={{zIndex : '1000'}}>
            <TooltipComponent content="Settings" position='Top'>
              <button type='button' className='text-3xl p3 hover:drop-shadow-xl hover:bg-light-gray
              text-white' style={{background : "black", borderRadius: "50%"}}>
                <FiSettings/>
              </button>
            </TooltipComponent>
          </div>
          {activeMenu ? (
            <div className='w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white'>
              <Sidebar/>
            </div>
          ) : (
            <div className='w-0 dark:bg-secondary-dark-bg '>
              <Sidebar/>
            </div>
          )}
          <div className={activeMenu ? "dark:bg-main-bg bg-main-bg min-h-screen w-full md:ml-72 " 
                                     : "dark:bg-main-bg bg-main-bg min-h-screen w-full flex-2 " }>

              <div className='fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full'>
                <Navbar/>
              </div>               
          

            <div>
            <Routes>
                {/* dashboard  */}
                <Route path="/" element={(<Home />)} />
                <Route path="/home" element={(<Home />)} />

                {/* pages  */}
                <Route path="/team/:teamId" element={<Goals />} />
                <Route path="/goal/:goalId" element={<KeyResults />} />
                <Route path="/keyResult/:keyResultId" element={<KeyResult />} />


                {/* apps  */}
                <Route path="/kanban" element={<h1>Kanban</h1>} />
                <Route path="/editor" element={<h1>Editor</h1>} />
                <Route path="/calendar" element={<h1>Calendar</h1>} />
                <Route path="/color-picker" element={<h1>ColorPicker</h1>} />

                {/* charts  */}
                <Route path="/line" element={<h1>line</h1>} />
                <Route path="/area" element={<h1>area</h1>} />
                <Route path="/bar" element={<h1>bar</h1>} />
                <Route path="/pie" element={<h1>pie</h1>} />
                <Route path="/financial" element={<h1>financial</h1>} />
                <Route path="/color-mapping" element={<h1>color-mapping</h1>} />
                <Route path="/pyramid" element={<h1>pyramid</h1>} />
                <Route path="/stacked" element={<h1>stacked</h1>} />

              </Routes>
            </div>

          </div>
        </div>
    </div>
  )
}

export default Welcome