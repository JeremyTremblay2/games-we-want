import { List, ListItem, ListItemIcon, ListItemText, Paper } from "@mui/material"
import { Link } from "react-router-dom"
import SportsEsportsIcon from "@mui/icons-material/SportsEsports"
import AndroidIcon from "@mui/icons-material/Android"
import AppleIcon from "@mui/icons-material/Apple"
import LaptopIcon from "@mui/icons-material/Laptop"
import DevicesOtherIcon from "@mui/icons-material/DevicesOther"
import VideogameAssetIcon from "@mui/icons-material/VideogameAsset"
import GamepadIcon from "@mui/icons-material/Gamepad"
import PropTypes from "prop-types"

const PlatformList = ({ platforms, companies }) => {
  function getPlatformIcon(platform, name) {
    console.log(platform, name)
    switch (platform) {
      case "Console":
        return <SportsEsportsIcon />
      case "PortableConsole":
        return <VideogameAssetIcon />
      case "OperatingSystem":
        if (name === "Android") {
          return <AndroidIcon />
        } else if (name === "iOS") {
          return <AppleIcon />
        } else if (name === "Mac") {
          return <AppleIcon />
        } else {
          return <LaptopIcon />
        }
      case "Arcade":
        return <GamepadIcon />
      default:
        return <DevicesOtherIcon />
    }
  }

  return (
    <>
      {platforms && platforms.length > 0 && (
        <Paper elevation={8}>
          <h2
            style={{
              fontSize: "24px",
              textAlign: "center",
              paddingBottom: 0,
            }}
          >
            Platforms
          </h2>
          <List>
            {platforms.map((platform, index) => (
              <Paper
                key={index}
                elevation={index % 2 === 0 ? 8 : 4}
                square
                style={{ border: "none", boxShadow: "none" }}
              >
                <Link
                  to={platform.url}
                  target="_blank"
                  rel="noreferrer"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <ListItem button key={index}>
                    <ListItemIcon sx={{ fontSize: "40rem" }}>
                      {getPlatformIcon(platform.category, platform.name)}
                    </ListItemIcon>
                    <ListItemText primary={platform.name} />
                  </ListItem>
                </Link>
              </Paper>
            ))}
          </List>
        </Paper>
      )}
    </>
  )
}

export default PlatformList

PlatformList.propTypes = {
  platforms: PropTypes.array,
  companies: PropTypes.array,
}

PlatformList.defaultProps = {
  platforms: [],
  companies: [],
}
