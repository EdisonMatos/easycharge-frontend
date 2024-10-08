import { Icon } from '@chakra-ui/react';
import { signOut } from 'next-auth/react';
import {
  MdBarChart,
  MdPerson,
  MdHome,
  MdLock,
  MdOutlineShoppingCart,
  MdSend,
  MdLogout,
} from 'react-icons/md';

// Admin Imports
// import MainDashboard from './pages/admin/default';
// import NFTMarketplace from './pages/admin/nft-marketplace';
// import Profile from './pages/admin/profile';
// import DataTables from './pages/admin/mySubmissions';
// import RTL from './pages/rtl/rtl-default';

// Auth Imports
// import SignInCentered from './pages/auth/sign-in';
import { IRoute } from 'types/navigation';

const routes: IRoute[] = [
  {
    name: 'Painel',
    layout: '/admin',
    path: '/default',
    icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
  },
  {
    name: 'Solicitar',
    layout: '/admin',
    path: '/nft-marketplace',
    icon: <Icon as={MdSend} width="20px" height="20px" color="inherit" />,
    secondary: true,
  },
  {
    name: 'Meus Envios',
    layout: '/admin',
    icon: <Icon as={MdBarChart} width="20px" height="20px" color="inherit" />,
    path: '/data-tables',
  },
  {
    name: 'Admin',
    layout: '/admin',
    path: '/profile',
    icon: <Icon as={MdPerson} width="20px" height="20px" color="inherit" />,
  },
  {
    name: 'Sair',
    layout: '/auth',
    path: '/sign-in',
    icon: <Icon as={MdLogout} width="20px" height="20px" color="inherit" onClick={()=>{
      signOut({
        callbackUrl: "/auth/sign-in",
        redirect: true
      })
    }}/>,
  },
  // {
  //   name: 'RTL Admin',
  //   layout: '/rtl',
  //   path: '/rtl-default',
  //   icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
  // },
];

export default routes;
