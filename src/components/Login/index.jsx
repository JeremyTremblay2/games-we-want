import { Box, Button, Container, TextField } from "@mui/material"
import { useState } from "react"
import { API_BASE_URL, API_USER_LOGIN } from "../../utils/constants.js"
import useLogin from "../../hooks/useLogin.jsx"
const Login = () => {
  const [user, setUser] = useState({
    username: "",
    password: ""
  })

  const handleChange = (e) => {
    setUser((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = async () => {
    useLogin(user)
  }

  return (
    <div style={{maxHeight: "100%"}}>
      <Container>
        <Box sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          placeItems: "center",
          height: "100%"
        }}>
          <h1>Connexion</h1>
          <TextField name="username" label="Identifiant" value={user.username} onChange={handleChange} />
          <TextField name="password" label="Mot de passe" value={user.password} onChange={handleChange} />
          <Button variant="contained" onClick={handleSubmit}>Connexion</Button>
        </Box>
      </Container>
    </div>
  )
}

export default Login