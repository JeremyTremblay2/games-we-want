import { createContext, useContext, useEffect, useState } from "react"
import PropTypes from "prop-types"
import useUserData from "../../hooks/useUserData"
import { useRenewToken } from "../../hooks/useAuthenticate"

export const UserContext = createContext()
let tokenTimeout

export function UserContextProvider({ children = null }) {
  const { userInfo, setUserInfo, isLoading, setRefreshUser } = useUserData()
  const [favoriteGames, setFavoriteGames] = useState([])

  useEffect(() => {
    if (userInfo) {
      setFavoriteGames(userInfo.favorites)
    }
  }, [userInfo])

  useRenewToken()

  return (
    <UserContext.Provider
      value={{
        userInfo,
        setUserInfo,
        favoriteGames,
        setFavoriteGames,
        isLoading,
        setRefreshUser,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export function useUserInfo() {
  const { userInfo } = useContext(UserContext)
  return userInfo
}

export function useSetUserInfo() {
  const { setUserInfo } = useContext(UserContext)
  return setUserInfo
}

export function useRefreshUserData() {
  const { setRefreshUser } = useContext(UserContext)
  setRefreshUser(true)
}

export function useUserIsLoading() {
  const { isLoading } = useContext(UserContext)
  return isLoading
}

export function useFavoriteGames() {
  const { favoriteGames, setFavoriteGames } = useContext(UserContext)
  return { favoriteGames, setFavoriteGames }
}

UserContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
}
