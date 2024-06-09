import { useContext, useEffect, useState } from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import AccountCircle from '@mui/icons-material/AccountCircle'
import MenuItem from '@mui/material/MenuItem'
import Menu from '@mui/material/Menu'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { Button, Container } from "@mui/material"
import { useDisconnect } from "../../hooks/useAuthenticate"
import { UserContext, useUserInfo } from "../UserContext/index.jsx"

const Layout = () => {
  const userInfo = useUserInfo()
  const [anchorEl, setAnchorEl] = useState(null)

  const navigate = useNavigate()

  const userContext = useContext(UserContext)

  useEffect(() => {
    if (userInfo === null) {
      userContext.setRefreshUser(true)
    }
  }, [userInfo])


  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleDisconnect = () => {
    setAnchorEl(null)
    useDisconnect(navigate)
    userContext.setRefreshUser(true)
  }

  return (
    <Box sx={{ display: "grid", gridTemplateRows: "auto 1fr", height: "100vh" }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link to="/" style={{ textDecoration: "none", color: "unset" }}>
              Games we Want
            </Link>
          </Typography>
          {userInfo ? (
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right'
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right'
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleDisconnect}>Disconnect</MenuItem>
              </Menu>
            </div>) : (
            <Button color="inherit" onClick={() => navigate("/login")}>Login</Button>
          )}
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg" sx={{ paddingTop: "20px" }}>
        <Outlet />
      </Container>
    </Box>
  )
}

export default Layout