import { enqueueSnackbar } from "notistack"

const useLogin = async (url, body) => {
  const response = await fetch(
    url,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    }
  )
  if (!response.ok) {
    const error = await response.text()
    switch (response.status) {
      case 400:
        enqueueSnackbar(error, {variant: 'error'})
        break
      case 500:
        enqueueSnackbar('Server error', {variant: 'error'})
        break
      default:
        enqueueSnackbar('Unknown error', {variant: 'error'})
    }
  } else {
    const jwt = await response.text()
    localStorage.setItem('jwt', jwt)
    return jwt
  }
  return null
}

export default useLogin