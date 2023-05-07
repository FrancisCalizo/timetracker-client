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
    try {
      const res = await axios.post('/isLoggedIn')
      
      if (res.data === 'Unauthorized') {        
        setIsAuthorized('UNAUTHORIZED')
        setUserInfo(null)
      } else {
        if (!userInfo) {          

          const user = res?.data?.user;

          if (user) {
            delete user.exp;
            delete user.iat;

            const o = user.email
            const tempName = o.substring(0, o.indexOf('@'))

              setUserInfo({
                id: 1,
                firstName: tempName,
                lastName: tempName,
                email: o,
                type: tempName
              })

            // const res = await axios.get(`/getUserInfo/${user.id}`)

            // if (res.status === 200) {
              
            //   setUserInfo({
            //     id: res.data.id,
            //     firstName: res.data.firstname,
            //     lastName: res.data.lastname,
            //     email: res.data.email,
            //     type: res.data.type
            //   })
            // }
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