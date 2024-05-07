import { Box, Button, Container, TextField } from "@mui/material"
import { useState } from "react"
import useLogin from "../../hooks/useLogin.jsx"
import { API_BASE_URL, API_USER_REGISTER } from "../../utils/constants.js"

const Register = () => {
  const [user, setUser] = useState({
    username: "",
    password: "",
    confirmationPassword: ""
  })

  const handleChange = (e) => {
    setUser((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = async () => {
    useLogin(`${API_BASE_URL}${API_USER_REGISTER}`, user)
  }

  return (
    <div style={{maxHeight: "100%"}}>
      <Container>
        <Box sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          placeItems: "center",
          height: "100%",
          width: "300px",
          margin: "auto"
        }}>
          <h1>Connexion</h1>
          <TextField fullWidth name="username" label="Identifiant" value={user.username} onChange={handleChange} />
          <TextField type="password" fullWidth name="password" label="Mot de passe" value={user.password} onChange={handleChange} />
          <TextField type="password" fullWidth name="confirmationPassword" label="Confirmation du mot de passe"
                     value={user.confirmationPassword} onChange={handleChange} />
          <Button variant="contained" onClick={handleSubmit}>Connexion</Button>
        </Box>
      </Container>
    </div>
  )
}

export default Register