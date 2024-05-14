import { useEffect, useState } from "react"
import propTypes from "prop-types"
import { Container, TextField, FormHelperText } from "@mui/material"
import LoadingButton from "@mui/lab/LoadingButton"
import { API_BASE_URL, API_USER_LOGIN, API_USER_REGISTER } from "../../utils/constants"
import useLogin from "../../hooks/useLogin"
import { useNavigate, Link } from "react-router-dom"
import "./index.css"

const Login = ({isRegister}) => {
  const [user, setUser] = useState({
    username: "",
    password: "",
    confirmationPassword: isRegister ? "" : undefined
  })
  const [isError, setIsError] = useState({
    username: false,
    password: false,
    confirmationPassword: false,
    text: false
  })
  const [isLoading, setIsLoading] = useState(false)

  const API_URL = isRegister ? API_USER_REGISTER : API_USER_LOGIN

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

  const handleLogin = async e => {
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

  const handleRegister = async e => {
    e.preventDefault()
    if (!user.username || !user.password || !user.confirmationPassword) {
      setIsError({
        username: !user.username,
        password: !user.password,
        confirmationPassword: !user.confirmationPassword,
        text: false
      })
    } else {
      if (user.password !== user.confirmationPassword) {
        setIsError({
          username: false,
          password: true,
          confirmationPassword: true,
          text: false
        })
        return
      }
      setIsError({
        username: false,
        password: false,
        text: false
      })
      setIsLoading(true)
      const response = await useLogin(`${API_BASE_URL}${API_USER_REGISTER}`, user)
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

  const signInUpString = isRegister ? "Inscription" : "Connexion"

  return (
    <div style={{maxHeight: "100%"}}>
      <Container>
        <form onSubmit={isRegister ? handleRegister : handleLogin} method="post">
          <h1>{signInUpString}</h1>
          <TextField
            error={isError.username}
            name="username"
            label="Identifiant"
            value={user.username}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            error={isError.password}
            type="password"
            name="password"
            label="Mot de passe"
            value={user.password}
            onChange={handleChange}
            fullWidth
          />
          {isRegister && (
            <TextField
              error={isError.confirmationPassword}
              type="password"
              name="confirmationPassword"
              label="Confirmation du mot de passe"
              helperText={isError.confirmationPassword && "Les mots de passe doivent être identiques"}
              value={user.confirmationPassword}
              onChange={handleChange}
              fullWidth
            />
          )}
          {isError.text && !isRegister &&
            (
              <FormHelperText error>Votre identifiant ou mot de passe est incorrect</FormHelperText>
            )}
          <LoadingButton type="submit" variant="contained" loading={isLoading}>{signInUpString}</LoadingButton>
          {isRegister ? (
            <p>Vous avez déjà un compte ? <Link to="/login">Connectez-vous</Link></p>
          ) : (
            <p>Vous n'avez pas de compte ? <Link to="/register">Inscrivez-vous</Link></p>
          )}
        </form>
      </Container>
    </div>
  )
}

export default Login

Login.propTypes = {
  isRegister: propTypes.bool
}

Login.defaultProps = {
  isRegister: false
}