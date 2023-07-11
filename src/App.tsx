import { useRoutes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { ClerkProvider } from "@clerk/clerk-react";

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
import Projects from 'src/pages/Dashboard/Projects';
import Project from 'src/pages/Dashboard/Projects/Project';
import Settings from 'src/pages/Dashboard/Settings';
import Preferences from 'src/pages/Dashboard/Settings/Preferences';
import Register from 'src/pages/Auth/Register'
import Landing from 'src/pages/Home/Landing'
import ProtectedRoute from 'src/components/ProtectedRoute'
import ClerkProtectedHOC from './components/ClerkProtectedHOC';

if (!process.env.REACT_APP_CLERK_PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}

const clerkPubKey = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;

function App() {
  const routes = useRoutes([
    { path: '/', element: <Landing /> },
    { path: '/login', element: <Login /> },
    { path: '/register', element: <Register /> },
    { path: '/forgot-password', element: <ResetPassword /> },
    // { element: <ProtectedRoute />, 
    { path: '/dashboard',
      children : [
          // { path: '/dashboard', children: [
          { index: true, element:  <ClerkProtectedHOC children={<Dashboard />} />},
          { path: 'clients/:id', element: <ClerkProtectedHOC children={<Client />} /> },
          { path: 'clients/add-client', element: <ClerkProtectedHOC children={<AddClient />} /> },
          { path: 'timesheets', element: <ClerkProtectedHOC children={<Timesheets />} /> },
          { path: 'timesheets/:id', element: <ClerkProtectedHOC children={<Timesheet />} /> },
          { path: 'timesheets/add-timesheet', element: <ClerkProtectedHOC children={<AddTimesheet />} /> },
          { path: 'consultants/', element: <ClerkProtectedHOC children={<Consultants />} /> },
          { path: 'consultants/add-consultant', element: <ClerkProtectedHOC children={<AddConsultant />} /> },
          { path: 'consultants/:id', element: <ClerkProtectedHOC children={<Consultant />} /> },
          { path: 'projects/', element: <ClerkProtectedHOC children={<Projects />} /> },
          { path: 'projects/:id', element: <ClerkProtectedHOC children={<Project />} /> },
          { path: 'settings', element: <ClerkProtectedHOC children={<Settings />} /> },
          { path: 'settings/preferences', element: <ClerkProtectedHOC children={<Preferences />} /> },
        ]},
    { path: '*', element: <h1>Page not found</h1> },
  ]);

  return (
    <>
      <ClerkProvider publishableKey={clerkPubKey}>
        {routes}
        <Toaster />
      </ClerkProvider>
    </>
  );
}

export default App;