import PropTypes from "prop-types"
import { Navigate } from "react-router-dom"
import { useUserInfo } from "../UserContext/index.jsx"

const PrivateRoute = ({ children }) => {
  const userInfo = useUserInfo()
  if (!userInfo || !localStorage.getItem('jwt')) {
    return <Navigate to="/login" replace />
  }

  return children
}

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired
}

PrivateRoute.defaultProps = {
  children: null
}

export default PrivateRoute
