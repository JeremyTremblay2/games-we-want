import { createContext, useContext } from 'react'
import PropTypes from "prop-types"
import useUserData from "../../hooks/useUserData"
import { useRenewToken } from "../../hooks/useAuthenticate"

export const UserContext = createContext()
let tokenTimeout

export function UserContextProvider({ children }) {
  const { userInfo, isLoading, setRefreshUser } = useUserData()
  useRenewToken()

  return (
    <UserContext.Provider value={{ userInfo, isLoading, setRefreshUser }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUserInfo() {
  const { userInfo } = useContext(UserContext)
  return userInfo
}

export function useRefreshUserData() {
  const { setRefreshUser } = useContext(UserContext)
  setRefreshUser(true)
}

UserContextProvider.propTypes = {
  children: PropTypes.node.isRequired
}

UserContextProvider.defaultProps = {
  children: null
}