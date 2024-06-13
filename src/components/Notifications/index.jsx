import React from "react"
import PropTypes from "prop-types"
import { styled } from "@mui/material"
import { SnackbarProvider } from "notistack"
import { MaterialDesignContent } from "notistack"

const NotificationsProvider = ({ prefersDarkMode = true }) => {
  // const { notifications } = useSelector((state) => state.notifications);
  const notifications = []
  const StyledMaterialDesignContent = styled(MaterialDesignContent)(({ theme }) => ({
    "&.notistack-MuiContent": {
      backgroundColor: prefersDarkMode ? "#FAFAFA" : "#323232",
      color: prefersDarkMode ? "#323232" : "#FAFAFA",
      borderRadius: 15,
    },
    "&.notistack-MuiContent-success": {
      backgroundColor: theme.palette.success.main,
    },
    "&.notistack-MuiContent-error": {
      backgroundColor: theme.palette.error.main,
    },
  }))

  return (
    <SnackbarProvider
      Components={{
        default: StyledMaterialDesignContent,
        success: StyledMaterialDesignContent,
        error: StyledMaterialDesignContent,
      }}
    />
  )
}

export default NotificationsProvider

NotificationsProvider.propTypes = {
  prefersDarkMode: PropTypes.bool,
}
