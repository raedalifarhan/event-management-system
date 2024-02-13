import { Link, NavLink } from 'react-router-dom';
import { useState } from 'react';
import PaddingContainer from '../../app/layout/padding-container';
import { useStore } from '../../app/stores/store';
import { observer } from 'mobx-react-lite';

const NavBar = () => {
  const { userStore: { user, logout } } = useStore();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleDropdownToggle = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div className='sticky top-0 left-0 right-0 bg-blue-800 text-white bg-opacity-80 border-b backdrop-blur-sm'>
      <PaddingContainer>
        <div className='flex items-center justify-between py-5'>
          <NavLink className='font-bold text-lg hover:text-yellow-500' to='/' >HRMS</NavLink>
          <nav className='flex items-center gap-4'>
            <NavLink className='font-bold text-lg hover:text-yellow-500' to='/departments'>Departments</NavLink>
            <NavLink className='font-bold text-lg hover:text-yellow-500' to='/errors'>Errors</NavLink>
          </nav>
          <nav className='flex flex-row gap-3 items-center'>
            <Link to={`/profile/${user?.username}`} className='text-white'>{user?.username}</Link>
            <ul className='flex items-center gap-4 relative'>
              <button className='rounded-full overflow-hidden focus:outline-none' onClick={handleDropdownToggle}>
                <img width={50} height={50} className='rounded-full border border-white' src={'/assets/user.png'} alt="Profile" />
              </button>
              {dropdownOpen && (
                <ul className='absolute top-14 right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none'>
                  <li>
                    <NavLink to={`/profile/${user?.username}`} className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900' onClick={() => setDropdownOpen(false)}>
                      {user?.username}'s Profile
                    </NavLink>
                  </li>
                  <li>
                    <button onClick={logout} className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left'>
                      Logout
                    </button>
                  </li>
                </ul>
              )}
            </ul>
          </nav>
        </div>
      </PaddingContainer>
    </div>
  );
};

export default observer(NavBar);
