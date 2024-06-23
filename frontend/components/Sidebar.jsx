import React, { useState } from 'react';
import Link from 'next/link';
import { CiSquareQuestion } from "react-icons/ci";
import { RxSketchLogo, RxDashboard, RxPerson } from 'react-icons/rx';
import { AiOutlineProject } from "react-icons/ai";
import { MdAppRegistration } from "react-icons/md";



const Tooltip = ({ text, position }) => {
  const tooltipStyles = {
    position: 'absolute',
    top: position.top + 30, // Adjust position as needed
    left: position.left + 40, // Adjust position as needed
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    color: 'white',
    padding: '0.5rem',
    borderRadius: '4px',
    zIndex: '999',
  };

  return (
    <div style={tooltipStyles}>
      {text}
    </div>
  );
};

const Sidebar = ({ children }) => {
  const [tooltip, setTooltip] = useState({ visible: false, text: '', position: { top: 0, left: 0 } });

  const handleMouseEnter = (text, event) => {
    const position = {
      top: event.target.offsetTop,
      left: event.target.offsetLeft,
    };
    setTooltip({ visible: true, text, position });
  };

  const handleMouseLeave = () => {
    setTooltip({ visible: false, text: '', position: { top: 0, left: 0 } });
  };

  return (
    <div className='flex'>
      <div className='fixed w-20 h-screen p-4 bg-white border-r-[1px] flex flex-col justify-between'>
        <div className='flex flex-col items-center relative'>
          <Link href="/">
            <div 
              className='bg-purple-800 text-white p-3 rounded-lg inline-block relative'
              onMouseEnter={(e) => handleMouseEnter('Home', e)}
              onMouseLeave={handleMouseLeave}
            >
              <RxSketchLogo size={20}/>
            </div>
          </Link>
          {tooltip.visible && tooltip.text === 'Home' && <Tooltip text={tooltip.text} position={tooltip.position} />}
          <span className=' border-b-[1px] border-gray-200 w-full p-2'></span>
         
          <Link href="/Employees">
            <div 
              className='bg-gray-100 hover:bg-gray-200 cursor-pointer my-4 text-black p-3 rounded-lg inline-block relative'
              onMouseEnter={(e) => handleMouseEnter('Employees', e)}
              onMouseLeave={handleMouseLeave}
            >
              <RxPerson size={20}/>
            </div>
          </Link>
          {tooltip.visible && tooltip.text === 'Employees' && <Tooltip text={tooltip.text} position={tooltip.position} />}
		  <Link href="/ARequests">
            <div 
              className='bg-gray-100 hover:bg-gray-200 cursor-pointer my-4 text-black p-3 rounded-lg inline-block relative'
              onMouseEnter={(e) => handleMouseEnter('Approval Requests', e)}
              onMouseLeave={handleMouseLeave}
            >
              <MdAppRegistration size={20}/>
            </div>
          </Link>
          {tooltip.visible && tooltip.text === 'Approval Requests' && <Tooltip text={tooltip.text} position={tooltip.position} />}
          <Link href="/Requests">
            <div 
              className='bg-gray-100 hover:bg-gray-200 cursor-pointer my-4 text-black p-3 rounded-lg inline-block relative text-xs'
              onMouseEnter={(e) => handleMouseEnter('Leave Requests', e)}
              onMouseLeave={handleMouseLeave}
            >
              <CiSquareQuestion size={20}/>
            </div>
          </Link>
          {tooltip.visible && tooltip.text === 'Leave Requests' && <Tooltip text={tooltip.text} position={tooltip.position} />}
          <Link href="/Projects">
            <div 
              className='bg-gray-100 hover:bg-gray-200 cursor-pointer my-4 text-black p-3 rounded-lg inline-block relative z-50'
              onMouseEnter={(e) => handleMouseEnter('Projects', e)}
              onMouseLeave={handleMouseLeave}
            >
              <AiOutlineProject size={20}/>
            </div>
          </Link>
          {tooltip.visible && tooltip.text === 'Projects' && <Tooltip text={tooltip.text} position={tooltip.position} />}
        </div>
      </div>
      <main className='ml-20 w-full'>{children}</main>
    </div>
  );
};

export default Sidebar;
