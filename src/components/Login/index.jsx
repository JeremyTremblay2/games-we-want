import { useContext, useEffect, useState } from "react"
import propTypes from "prop-types"
import { useAuthenticate } from "../../hooks/useAuthenticate"
import { Link, useNavigate } from "react-router-dom"
import { Container, FormHelperText, TextField } from "@mui/material"
import LoadingButton from "@mui/lab/LoadingButton"
import "./index.css"
import { UserContext, useRefreshUserData } from "../UserContext/index.jsx"

const Login = ({ isRegister }) => {
  const navigate = useNavigate()

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

  const userContext = useContext(UserContext)

  const { isAuthenticated, isAuthenticating, setIsAuthenticating } = useAuthenticate(user, isRegister)
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/")
      userContext.setRefreshUser(true)
    } else if (!isAuthenticating && isAuthenticated === false) {
      setIsError({
        username: true,
        password: true,
        text: true
      })
    }
  }, [isAuthenticated, isAuthenticating])


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
      setIsAuthenticating(true)
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
      isAuthenticating(true)
    }
  }

  const signInUpString = isRegister ? "Sign Up" : "Sign In"

  return (
    <div style={{ maxHeight: "100%" }}>
      <Container>
        <form onSubmit={isRegister ? handleRegister : handleLogin} method="post">
          <h1>{signInUpString}</h1>
          <TextField
            error={isError.username}
            name="username"
            label="Username"
            value={user.username}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            error={isError.password}
            type="password"
            name="password"
            label="Password"
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
          <LoadingButton type="submit" variant="contained" loading={isAuthenticating}>{signInUpString}</LoadingButton>
          {isRegister ? (
            <p>You already have an account? <Link to="/login">Sign In</Link></p>
          ) : (
            <p>You don’t have an account? <Link to="/register">Sign Up</Link></p>
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