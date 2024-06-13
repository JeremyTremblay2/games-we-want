import PropTypes from "prop-types"
import { Navigate } from "react-router-dom"
import { useUserInfo, useUserIsLoading } from "../UserContext/index.jsx"
import { CircularProgress } from "@mui/material"
import { useIsLoading } from "../LoadingContext/index.jsx"
import { useEffect } from "react"

const PrivateRoute = ({ children = null }) => {
  const userInfo = useUserInfo()
  const isLoading = useUserIsLoading()
  const { setIsLoading } = useIsLoading()

  useEffect(() => {
    setIsLoading(isLoading)
  }, [isLoading])

  if (isLoading) {
    return null
  }

  if (!userInfo) {
    return <Navigate to="/login" replace />
  }

  return children
}

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
}

export default PrivateRoute
