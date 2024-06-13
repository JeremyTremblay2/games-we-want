import { API_BASE_URL, API_ADD_FAVORITE, API_REMOVE_FAVORITE } from "../utils/constants"
import { enqueueSnackbar } from "notistack"

export const addFavorite = async gameId => {
  const response = await fetch(`${API_BASE_URL}${API_ADD_FAVORITE}/${gameId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
  })
  switch (response.status) {
    case 204:
      enqueueSnackbar("Game successfully added to favorites!", { variant: "success" })
      return true
    case 409:
      enqueueSnackbar("Game already in favorites", { variant: "warning" })
      return false
    case 401:
      enqueueSnackbar("Unauthorized", { variant: "error" })
      throw new Error("Unauthorized")
    case 500:
      enqueueSnackbar("Server error", { variant: "error" })
      throw new Error("Server error")
    default:
      enqueueSnackbar("Unknown error", { variant: "error" })
      throw new Error("Unknown error")
  }
}

export const removeFavorite = async gameId => {
  const response = await fetch(`${API_BASE_URL}${API_REMOVE_FAVORITE}/${gameId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
  })
  console.log(response)
  switch (response.status) {
    case 204:
      enqueueSnackbar("Game successfully removed from favorites!", { variant: "success" })
      return true
    case 404:
      enqueueSnackbar("Game not found in favorites", { variant: "error" })
      return false
    case 401:
      enqueueSnackbar("Unauthorized", { variant: "error" })
      throw new Error("Unauthorized")
    case 500:
      enqueueSnackbar("Server error", { variant: "error" })
      throw new Error("Server error")
    default:
      enqueueSnackbar("Unknown error", { variant: "error" })
      throw new Error("Unknown error")
  }
}
