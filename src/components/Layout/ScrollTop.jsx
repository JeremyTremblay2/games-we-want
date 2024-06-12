import { Box, Fab, useScrollTrigger } from "@mui/material"
import Fade from "@mui/material/Fade"
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp"

const ScrollTop = () => {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 800,
  })

  const handleClick = event => {
    const anchor = (event.target.ownerDocument || document).querySelector("#top-anchor")

    if (anchor) {
      anchor.scrollIntoView({
        block: "center",
        behavior: "smooth",
      })
    }
  }

  return (
    <Fade in={trigger}>
      <Box
        onClick={handleClick}
        role="presentation"
        sx={{ position: "fixed", bottom: 16, right: 16 }}
      >
        <Fab aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </Box>
    </Fade>
  )
}

export default ScrollTop
