import { Outlet, Navigate } from 'react-router-dom'

const PrivateRoute = () => {
  // TODO: Replace with token
  let auth = { 'token': false }

  return (
   auth.token ? <Outlet /> : <Navigate to='login' />
  )
}

export default PrivateRoute