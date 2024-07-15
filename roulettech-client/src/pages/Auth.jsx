import {useEffect} from 'react'
import { useOutlet, useLocation, useNavigate } from 'react-router-dom'

const Auth = () => {

  const outlet = useOutlet()
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    if(location.pathname === '/'){
      navigate('/app')
    }
  }, [])


  return (
    <div>
      {outlet}
    </div>
  )
}

export default Auth
