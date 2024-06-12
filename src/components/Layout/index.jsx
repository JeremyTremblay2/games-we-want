import { useContext, useEffect, useState } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import Menu from '@mui/material/Menu'
import {
  AppBar,
  Toolbar,
  Button,
  Container,
  Typography,
  MenuItem,
  IconButton
} from "@mui/material"
import AccountCircle from '@mui/icons-material/AccountCircle'
import { handleDisconnect } from "../../hooks/useAuthenticate"
import { UserContext, useUserInfo } from "../UserContext/index.jsx"
import { useIsLoading } from "../LoadingContext/index.jsx"
import ScrollTop from "./ScrollTop"
import LinearProgress from "@mui/material/LinearProgress"

const Layout = () => {
  const userInfo = useUserInfo()
  const [anchorEl, setAnchorEl] = useState(null)

  const navigate = useNavigate()

  const userContext = useContext(UserContext)
  const { isLoading } = useIsLoading()

  useEffect(() => {
    if (userInfo === null) {
      userContext.setRefreshUser(true)
    }
  }, [userInfo])


  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClickProfile = () => {
    navigate("/profile")
    setAnchorEl(null)
  }

  const handleClickDisconnect = () => {
    setAnchorEl(null)
    handleDisconnect(navigate)
    userContext.setRefreshUser(true)
  }

  return (
    <>
      <AppBar position="static" id="top-anchor">
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
                onClose={() => setAnchorEl(null)}
              >
                <MenuItem onClick={handleClickProfile}>Profile</MenuItem>
                <MenuItem onClick={handleClickDisconnect}>Disconnect</MenuItem>
              </Menu>
            </div>) : (
            <Button color="inherit" onClick={() => navigate("/login")}>Login</Button>
          )}
        </Toolbar>
      </AppBar>
      {isLoading && (
        <LinearProgress style={{ width: "100%" }} />
      )}
      <Container maxWidth="xl" sx={{ paddingTop: "20px" }}>
        <Outlet />
      </Container>
      <ScrollTop />
    </>
  )
}

export default Layout