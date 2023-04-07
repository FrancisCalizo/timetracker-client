import * as React from 'react'
import axios from 'axios'
import { Outlet, Navigate } from 'react-router-dom'

import { useAppContext } from 'src/context/appContext'

type STATUS = 'AUTHORIZED' | 'UNAUTHORIZED' | 'PENDING'

const PrivateRoute = () => {
  const { userInfo, setUserInfo } = useAppContext()

  const [isAuthorized, setIsAuthorized] = React.useState<STATUS>('PENDING')

  React.useEffect(() => {
    handleCheckAuth()
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  const handleCheckAuth = async () => {
    let res

    try {
      res = await axios.post('/isLoggedIn')
      
      if (res.data === 'Unauthorized') {        
        setIsAuthorized('UNAUTHORIZED')
        setUserInfo(null)
      } else {
        if (!userInfo) {
          const user = res?.data?.user;

          if (user) {
            delete user.exp;
            delete user.iat;

            setUserInfo(res.data.user);
          }
        }

        setIsAuthorized('AUTHORIZED')
      }    
    } catch (err) {
      console.log(err)
    }
  }
  

  if(isAuthorized === 'PENDING'){
    return null
  }

  if (isAuthorized === 'UNAUTHORIZED'){
    return <Navigate to='login' />
  }

  return <Outlet /> 
}

export default PrivateRoute