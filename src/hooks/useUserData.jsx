import { useEffect, useState } from "react"
import { enqueueSnackbar } from "notistack"
import { API_BASE_URL, API_USER_DELETE, API_USER_INFO } from "../utils/constants.js"

const useUserData = () => {
  const [userInfo, setUserInfo] = useState(undefined)
  const [isLoading, setIsLoading] = useState(true)
  const [refreshUser, setRefreshUser] = useState(true)

  useEffect(() => {
    if (refreshUser) {
      const jwt = localStorage.getItem("jwt")
      if (jwt) {
        getUserInfo(jwt)
      } else {
        setUserInfo(null)
        setIsLoading(false)
      }
      setRefreshUser(false)
    }
  }, [refreshUser])

  async function getUserInfo(jwt) {
    setIsLoading(true)
    const response = await fetch(`${API_BASE_URL}${API_USER_INFO}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
    })
    if (!response.ok || response.status === 204) {
      const error = await response.text()
      switch (response.status) {
        case 204:
          setUserInfo(null)
          break
        case 400:
          enqueueSnackbar(error, { variant: "error" })
          break
        case 401:
          localStorage.removeItem("jwt")
          break
        case 500:
          enqueueSnackbar("Server error", { variant: "error" })
          break
        default:
          enqueueSnackbar("Unknown error", { variant: "error" })
      }
    } else {
      const data = await response.json()
      setUserInfo(data)
    }
    setIsLoading(false)
  }

  return { userInfo, setUserInfo, isLoading, setRefreshUser }
}

export default useUserData
