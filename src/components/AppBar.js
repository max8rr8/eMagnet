import React from 'react'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import MUIAppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Brightness6Icon from '@material-ui/icons/Brightness6'
import IconButton from '@material-ui/core/IconButton'

const useStyles = makeStyles((theme) =>
  createStyles({
    menuButton: {
      marginRight: theme.spacing(2)
    },
    title: {
      flexGrow: 1
    }
  })
)

export default function AppBar({ title, toggleTheme }) {
  const styles = useStyles()

  return (
    <MUIAppBar position="static">
      <Toolbar>
        {/* <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          className={styles.menuButton}
        >
          <MenuIcon />
        </IconButton> */}
        <Typography variant="h6" className={styles.title}>
          {title}
        </Typography>
        <IconButton color="inherit" onClick={() => toggleTheme()}>
          <Brightness6Icon />
        </IconButton>
      </Toolbar>
    </MUIAppBar>
  )
}
