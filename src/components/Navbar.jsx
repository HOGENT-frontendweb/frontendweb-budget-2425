// src/components/Navbar.jsx
import {NavLink} from 'react-router-dom';
import {useTheme} from '../contexts/theme';
import {IoMoonSharp, IoSunny} from 'react-icons/io5';
import {useAuth} from '../contexts/auth';
import {Link} from 'react-router-dom';

export default function Navbar() {
  const {theme, toggleTheme} = useTheme();
  const {isAuthed} = useAuth();
  return (
    <nav className="sticky w-full flex space-x-4 *:py-2">
      {/*<nav className={`navbar sticky-top bg-${theme} text-bg-${theme} mb-4`}>*/}
      {/*  <div className='container-fluid flex-column flex-sm-row align-items-start align-items-sm-center'>*/}
      <NavLink className='nav-link' to='/transactions'>
        Transactions
      </NavLink>
      <NavLink className='nav-link' to='/places'>
        Places
      </NavLink>
      <NavLink className='nav-link' to='/about'>
        About us
      </NavLink>
      <div className='grow-1'></div>
      {
        isAuthed ? (
          <Link className='nav-link' to='/logout' data-cy="logout_btn">
            Logout
          </Link>
        ) : (
          <>
            <Link className='nav-link' to='/login'>
              Login
            </Link>
            <Link className="nav-link" to="/register" data-cy='logout_btn'>Register</Link>
          </>
        )
      }
      <button
        className='py-2 px-2.5 rounded-md bg-gray-700 hover:bg-gray-600'
        type='button'
        onClick={toggleTheme}
      >
        {theme === 'dark' ? <IoMoonSharp/> : <IoSunny/>}
      </button>
      {/*</div>*/}
    </nav>
  );
}
