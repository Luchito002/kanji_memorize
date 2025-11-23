import NavbarHomePage from '../components/Navbar/NavbarHomePage';
import { Outlet } from 'react-router-dom';

export default function HomeLayout() {
  return (
    <div className='bg-[#111110]'>
      <NavbarHomePage />
      <Outlet />
    </div>
  );
}
