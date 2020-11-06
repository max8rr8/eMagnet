import React from 'react'
import Link from 'next/link'
import { gql, useMutation, useApolloClient } from '@apollo/client'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Paper from '@material-ui/core/Paper'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import GlobalLoading from '../components/GlobalLoading'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'

const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`

const useStyles = makeStyles((theme) =>
  createStyles({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: 4
    },
    button: {
      marginTop: 4
    }
  })
)

/**
 * Страничка со входом
 *
 * @returns {React.ReactElement}
 */
function Login() {
  const { register, handleSubmit, errors } = useForm({
    mode: 'onChange'
  })

  const Router = useRouter()
  const [loginUser, { loading, error }] = useMutation(LOGIN_USER, {
    errorPolicy: 'all'
  })
  const client = useApolloClient()
  const styles = useStyles()

  return (
    <div>
      {loading && <GlobalLoading />}
      <Container maxWidth="xs">
        <Paper elevation={3} className={styles.paper}>
          <Typography component="h1" variant="h5">
            Вход
          </Typography>
          <form>
            <TextField
              required
              fullWidth
              label="Почта"
              name="email"
              variant="outlined"
              margin="normal"
              autoComplete="email"
              error={errors.email}
              inputRef={register({
                required: true
              })}
            />
            <TextField
              required
              fullWidth
              label="Пароль"
              name="password"
              variant="outlined"
              margin="normal"
              type="password"
              autoComplete="current-password"
              error={errors.password}
              inputRef={register({
                required: true
              })}
            />
            {error && error && (
              <Typography color="error">{error.message}</Typography>
            )}
            <Button
              fullWidth
              color="primary"
              variant="contained"
              className={styles.button}
              onClick={handleSubmit((data) =>
                loginUser({
                  variables: data
                }).then((response) => {
                  console.log(response)
                  if (!response.errors) {
                    document.cookie = 'user=' + response.data.login.token
                    client.resetStore()
                    Router.push('/user/me')
                  }
                })
              )}
            >
              Войти
            </Button>
          </form>
          <Link href="/register">
            <Button fullWidth className={styles.button}>
              Нет аккаунта? Зарегистрируйтесь
            </Button>
          </Link>
        </Paper>
      </Container>
    </div>
  )
}

Login.title = 'Вход'
Login.login = 'restricts'

export default Login
