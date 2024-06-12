import { useEffect } from "react"
import { enqueueSnackbar } from "notistack"
import { useNavigate } from "react-router-dom"
import {
  API_BASE_URL,
  API_USER_DELETE
} from "../utils/constants.js"
import { useSetUserInfo } from "../components/UserContext"
import { handleDisconnect } from "./useAuthenticate"

export const useDeleteAccount = (isDeletingAccount) => {
  useEffect(() => {
    if (isDeletingAccount) handleDeleteAccount()
  }, [isDeletingAccount])

  const setUserInfo = useSetUserInfo()
  const navigate = useNavigate()


  const handleDeleteAccount = async () => {
    const response = await fetch(
      `${API_BASE_URL}${API_USER_DELETE}`,
      {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('jwt')}`
        }
      }
    )
    switch (response.status) {
      case 204:
        enqueueSnackbar('Your account has been successfully deleted', { variant: 'success' })
        setUserInfo(null)
        handleDisconnect(navigate)
        break
      case 401:
        enqueueSnackbar("Unauthorized", { variant: 'error' })
        break
      case 500:
        enqueueSnackbar('Server error', { variant: 'error' })
        break
      default:
        enqueueSnackbar('Unknown error', { variant: 'error' })
    }
  }

}

export default useDeleteAccount