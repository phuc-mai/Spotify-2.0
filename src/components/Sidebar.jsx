import { NavLink } from "react-router-dom";
import { RiCloseLine } from 'react-icons/ri'
import { HiOutlineMenu } from 'react-icons/hi'
import { useState } from "react";

import { logo } from '../assets'
import { links } from '../assets/constants'


const NavLinks = ({ handleClick }) => (
  <div className="mt-10">
    {links.map((item) => (
      <NavLink
        key={item.name}
        to={item.to}
        className="flex flex-row justify-start items-center text-gray-400 font-medium text-sm my-8"
        onClick={() => {}}
      >
        <item.icon className='w-6 h-6 mr-2'/>
        {item.name}
      </NavLink>
    ))}
  </div>
)

const Sidebar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <>
      <div className="md:flex hidden flex-col w-[240px] py-10 px-4 bg-[#191624]">
        <img src={logo} alt='logo' className="w-full h-14 object-contain"/>
        <NavLinks />
      </div>

      {/* Mobile Sidebar */}
      <div className="absolute md:hidden block top-6 right-3">
        {!mobileMenuOpen ?
          <HiOutlineMenu 
            className='w-6 h-6 mr-2 text-white'
            onClick={() => setMobileMenuOpen(true)}
          />
          :
          <RiCloseLine
            className='w-6 h-6 mr-2 text-white'
            onClick={() => setMobileMenuOpen(false)}
          />
        }
      </div>

      <div className={`absolute h-screen w-2/3 bg-gradient-to-tl from-white/10 to-[#483D8B] backdrop-blur-lg z-10 p-6 md:hidden smooth-transition ${mobileMenuOpen ? 'left-0' : '-left-full'}`}
      >
        <img src={logo} alt='logo' className="w-full h-14 object-contain"/>
        <NavLinks handleClick={() => setMobileMenuOpen(false)} />
      </div>
    </>
  )
}

export default Sidebar;
