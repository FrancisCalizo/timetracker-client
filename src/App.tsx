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
import Landing from 'src/pages/Home/Landing'
import ProtectedRoute from 'src/components/ProtectedRoute'

function App() {
  const prodRoutes = useRoutes([
    { path: '/', element: <Landing /> },
    { path: '/login', element: <Login /> },
    { path: '/register', element: <Register /> },
    { path: '/forgot-password', element: <ResetPassword /> },
    // { element: <ProtectedRoute />, 
    { path: '/dashboard', 
      children : [
          // { path: '/dashboard', children: [
          { index: true, element: <Dashboard /> },
          { path: 'clients/:id', element: <Client /> },
          { path: 'clients/add-client', element: <AddClient /> },
          { path: 'timesheets', element: <Timesheets /> },
          { path: 'timesheets/:id', element: <Timesheet /> },
          { path: 'timesheets/add-timesheet', element: <AddTimesheet /> },
          { path: 'consultants/', element: <Consultants /> },
          { path: 'consultants/add-consultant', element: <AddConsultant /> },
          { path: 'consultants/:id', element: <Consultant /> },
        ]},
    { path: '*', element: <h1>Page not found</h1> },
  ]);

  const devRoutes = useRoutes([
    { path: '/', element: <Landing /> },
    { path: '/login', element: <Login /> },
    { path: '/register', element: <Register /> },
    { path: '/forgot-password', element: <ResetPassword /> },
    { element: <ProtectedRoute />, 
      children : [
          { path: '/dashboard', children: [
          { index: true, element: <Dashboard /> },
          { path: 'clients/:id', element: <Client /> },
          { path: 'clients/add-client', element: <AddClient /> },
          { path: 'timesheets', element: <Timesheets /> },
          { path: 'timesheets/:id', element: <Timesheet /> },
          { path: 'timesheets/add-timesheet', element: <AddTimesheet /> },
          { path: 'consultants/', element: <Consultants /> },
          { path: 'consultants/add-consultant', element: <AddConsultant /> },
          { path: 'consultants/:id', element: <Consultant /> },
        ]}]
    },
    { path: '*', element: <h1>Page not found</h1> },
  ]);
  return (
    <>
      {process.env.NODE_ENV === 'development' ? devRoutes : prodRoutes}
      <Toaster />
    </>
  );
}

export default App;