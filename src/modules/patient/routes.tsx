import { Outlet } from 'react-router-dom';
import AddPatient from './pages/AddPatient';

export default [
  {
    path: '/patient',
    element: <Outlet />,
    children: [
      {
        index: true,
        element: <AddPatient />
      },
      {
        path: 'add-patient',
        element: <AddPatient />
      },
    ]
  }
];
