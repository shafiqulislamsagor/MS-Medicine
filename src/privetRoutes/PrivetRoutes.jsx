import PropTypes from 'prop-types'
import { Navigate, useLocation } from 'react-router-dom'
import useAuth from '../hooks/Auth/useAuth';


const PrivetRoutes = ({children}) => {
    const { user } = useAuth()
    const location = useLocation()
    if(user){
        return children
    }
    return <Navigate to='/join-us' state={location.pathname} replace='true' />

};

export default PrivetRoutes;

PrivetRoutes.propTypes = {
    children: PropTypes.object.isRequired,
  }