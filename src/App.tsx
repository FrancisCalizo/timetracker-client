import { useRoutes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import Login from 'src/pages/Auth/Login';
import Dashboard from 'src/pages/Dashboard';
import ResetPassword from 'src/pages/Auth/ResetPassword';
import Timesheets from 'src/pages/Dashboard/Timesheets';
import Client from 'src/pages/Dashboard/Clients/Client';
import AddClient from 'src/pages/Dashboard/Clients/AddClient';
import Timesheet from 'src/pages/Dashboard/Timesheets/Timesheet';
import AddTimesheet from 'src/pages/Dashboard/Timesheets/AddTimesheet';
import Consultants from 'src/pages/Dashboard/Consultants';
import Consultant from 'src/pages/Dashboard/Consultants/Consultant';
import AddConsultant from 'src/pages/Dashboard/Consultants/AddConsultant';
import Register from 'src/pages/Auth/Register'


function App() {
  const router = useRoutes([
    { path: '/', element: <Login /> },
    { path: '/register', element: <Register /> },
    {
      path: '/dashboard',
      children: [
        { index: true, element: <Dashboard /> },
        { path: 'clients/:id', element: <Client /> },
        { path: 'clients/add-client', element: <AddClient /> },
        { path: 'timesheets', element: <Timesheets /> },
        { path: 'timesheets/:id', element: <Timesheet /> },
        { path: 'timesheets/add-timesheet', element: <AddTimesheet /> },
        { path: 'consultants/', element: <Consultants /> },
        { path: 'consultants/add-consultant', element: <AddConsultant /> },
        { path: 'consultants/:id', element: <Consultant /> },
      ],
    },
    { path: '/forgot-password', element: <ResetPassword /> },
    { path: '*', element: <h1>Page not found</h1> },
  ]);
  return (
    <>
      {router}
      <Toaster />
    </>
  );
}

export default App;