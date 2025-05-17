import NavbarHomePage from '../components/Navbar/NavbarHomePage';
import { Outlet } from 'react-router-dom';

export default function HomeLayout() {
  return (
    <>
      <NavbarHomePage />
      <Outlet />
    </>
  );
}
