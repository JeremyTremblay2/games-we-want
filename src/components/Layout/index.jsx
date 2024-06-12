import { useContext, useEffect, useState } from "react"
import { Link, Outlet, useNavigate } from "react-router-dom"
import Menu from "@mui/material/Menu"
import { AppBar, Toolbar, Button, Container, Typography, MenuItem, IconButton } from "@mui/material"
import Box from "@mui/material/Box"
import AccountCircle from "@mui/icons-material/AccountCircle"
import InputBase from "@mui/material/InputBase"
import SearchIcon from "@mui/icons-material/Search"
import { handleDisconnect } from "../../hooks/useAuthenticate"
import { UserContext, useUserInfo } from "../UserContext/index.jsx"
import { useIsLoading } from "../LoadingContext/index.jsx"
import ScrollTop from "./ScrollTop"
import LinearProgress from "@mui/material/LinearProgress"
import { SearchContext } from "../SearchContext/index.jsx"

const Layout = () => {
  const userInfo = useUserInfo()
  const [anchorEl, setAnchorEl] = useState(null)

  const navigate = useNavigate()

  const userContext = useContext(UserContext)
  const { isLoading } = useIsLoading()

  const { searchTerm, setSearchTerm, setIsSearching } = useContext(SearchContext)

  useEffect(() => {
    if (userInfo === null) {
      userContext.setRefreshUser(true)
    }
  }, [userInfo])

  const handleMenu = event => {
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

  const handleSearchChange = event => {
    setSearchTerm(event.target.value)
  }

  const handleValidateSearch = e => {
    e.preventDefault()
    setIsSearching(true)
  }

  return (
    <>
      <Box>
        <AppBar position="static" id="top-anchor">
          <Toolbar sx={{ alignItems: "center" }}>
            <Typography variant="h6" component="div">
              <Link to="/" style={{ textDecoration: "none", color: "unset" }}>
                Games we Want
              </Link>
            </Typography>
            {userInfo ? (
              <div style={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
                <form
                  onSubmit={handleValidateSearch}
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    borderRadius: "50px",
                    backgroundColor: "rgba(255, 255, 255, 0.15)",
                    "&:hover": {
                      backgroundColor: "rgba(255, 255, 255, 0.25)",
                    },
                    padding: "0 10px",
                    gap: 0,
                    flexGrow: 0.3,
                    margin: "auto",
                  }}
                >
                  <SearchIcon sx={{ fontSize: 22 }} />
                  <InputBase
                    name="search"
                    placeholder="Search…"
                    inputProps={{ "aria-label": "search" }}
                    sx={{
                      color: "inherit",
                      paddingLeft: "6px",
                      flexGrow: 1,
                    }}
                    onChange={handleSearchChange}
                    value={searchTerm}
                  />
                </form>
                <div style={{ alignItems: "end" }}>
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
                      vertical: "bottom",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={Boolean(anchorEl)}
                    onClose={() => setAnchorEl(null)}
                  >
                    <MenuItem onClick={handleClickProfile}>Profile</MenuItem>
                    <MenuItem onClick={handleClickDisconnect}>Disconnect</MenuItem>
                  </Menu>
                </div>
              </div>
            ) : (
              <Button color="inherit" onClick={() => navigate("/login")}>
                Login
              </Button>
            )}
          </Toolbar>
        </AppBar>
      </Box>
      {isLoading && <LinearProgress style={{ width: "100%" }} />}
      <Container maxWidth="xl" sx={{ paddingTop: "20px" }}>
        <Outlet />
      </Container>
      <ScrollTop />
    </>
  )
}

export default Layout
