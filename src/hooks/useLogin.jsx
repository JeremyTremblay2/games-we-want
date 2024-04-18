import { API_BASE_URL, API_USER_LOGIN } from "../utils/constants.js"

const useLogin = (body) => {
  return fetch(
    `${API_BASE_URL}${API_USER_LOGIN}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    }
  ).then(response => {
    return response.text()
  }).then(jwt => {
    localStorage.setItem("jwt", jwt)
    return jwt
  }).catch(error => {
      console.error(error)
    })
}

export default useLogin