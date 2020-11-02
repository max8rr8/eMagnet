import React from 'react'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import MUIAppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Brightness6Icon from '@material-ui/icons/Brightness6'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import Link from 'next/link'
import { gql, useQuery, useApolloClient } from '@apollo/client'

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

const USER_NAME = gql`
  query {
    me {
      nick
    }
  }
`

/**
 * Компонент который отвечает за рендер верхней панели
 *
 * @param {object} props Component props
 * @param {string} props.title Загаловок страницы
 * @param {Function} props.toggleTheme Переклчить тему
 * @returns {React.ReactElement}
 */
export default function AppBar({ title, toggleTheme }) {
  const styles = useStyles()
  const client = useApolloClient()
  const { data, loading } = useQuery(USER_NAME)

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

        <Link href="/login">
          <Button
            color="inherit"
            onClick={() => {
              if (data.me) {
                document.cookie = 'user='
                client.resetStore()
              }
            }}
          >
            {loading ? 'Loading' : data.me ? 'Выйти' : 'Войти'}
          </Button>
        </Link>
      </Toolbar>
    </MUIAppBar>
  )
}
