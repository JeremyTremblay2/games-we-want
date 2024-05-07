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
    console.error('There was a problem while creating account, please retry.')
  } else {
    const jwt = await response.text()
    localStorage.setItem('jwt', jwt)
    return jwt
  }
  return null
}

export default useLogin