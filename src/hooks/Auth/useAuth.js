import { useContext } from 'react'
import { ContextAll } from '../../contextApi/ContextApi'

const useAuth = () => {
  const auth = useContext(ContextAll)
  return auth
}

export default useAuth