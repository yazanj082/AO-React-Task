import { Outlet, createBrowserRouter } from 'react-router-dom';
import { getAllModulesRoutes } from './router-utils';
import Home from '../modules/home/pages/Home/Home';



const router = createBrowserRouter([
  {
    path: '',
    element: <Outlet />,
    children: [
      {
        index: true,
        element: <Home />
      },
      ...getAllModulesRoutes()
    ]
  }

]);

export default router;
