import { Outlet } from 'react-router-dom';
import PeopleList from './pages/PeopleList';

export default [
  {
    path: '/star-wars',
    element: <Outlet />,
    children: [
      {
        index: true,
        element: <PeopleList />
      },
      {
        path: 'people-list',
        index: true,
        element: <PeopleList />
      }
    ]
  }
];
