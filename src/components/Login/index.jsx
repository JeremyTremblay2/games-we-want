import { useEffect, useState } from "react"
import { Container, TextField, FormHelperText } from "@mui/material"
import LoadingButton from "@mui/lab/LoadingButton"
import { API_BASE_URL, API_USER_LOGIN } from "../../utils/constants.js"
import useLogin from "../../hooks/useLogin.jsx"
import { useNavigate } from "react-router-dom"

const Login = () => {
  const [user, setUser] = useState({
    username: "",
    password: ""
  })
  const [isError, setIsError] = useState({
    username: false,
    password: false,
    text: false,
  })
  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate()

  const handleChange = (e) => {
    setUser((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
    if (isError[e.target.name]) {
      setIsError(prev => ({
        ...prev,
        [e.target.name]: false
      }))
    }
  }


  const handleSubmit = async e => {
    e.preventDefault()
    if (!user.username || !user.password) {
      setIsError({
        username: !user.username,
        password: !user.password,
        text: false
      })
    } else {
      setIsError({
        username: false,
        password: false,
        text: false
      })
      setIsLoading(true)
      const response = await useLogin(`${API_BASE_URL}${API_USER_LOGIN}`, user)
      console.log("response", response)
      setIsLoading(false)
      if (response) {
        navigate("/")
      } else {
        setIsError({
          username: true,
          password: true,
          text: true
        })
      }
    }
  }

  return (
    <div style={{maxHeight: "100%"}}>
      <Container>
        <form onSubmit={handleSubmit} method="post" style={{
          display: "flex",
          flexDirection: "column",
          gap: 20,
          placeItems: "center",
          height: "100%",
          width: "400px",
          margin: "auto"
        }}>
          <h1>Connexion</h1>
          <TextField error={isError.username} name="username" label="Identifiant" value={user.username}
                     onChange={handleChange} />
          <TextField error={isError.password} type="password" name="password" label="Mot de passe"
                     value={user.password}
                     onChange={handleChange} />
          {isError.text &&
            (
              <FormHelperText error>Votre identifiant ou mot de passe est incorrect</FormHelperText>
            )}
          <LoadingButton type="submit" variant="contained" loading={isLoading}>Connexion</LoadingButton>
        </form>
      </Container>
    </div>
  )
}

export default Login