import PropTypes from 'prop-types'
import { Navigate, useLocation } from 'react-router-dom'
import useAuth from '../hooks/Auth/useAuth';


const PrivetRoutes = ({children}) => {
    const { user, loading } = useAuth()
    const location = useLocation()
  
    if (loading) return 'Loading...'
    if (user) return children
    return <Navigate to='/login' state={location.pathname} replace='true' />
};

export default PrivetRoutes;

PrivetRoutes.propTypes = {
    children: PropTypes.element,
  }