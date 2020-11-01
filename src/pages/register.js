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
import { validateEmail, validatePassword } from '../utils/registerValidation'

const REGISTER_USER = gql`
  mutation register($email: String!, $password: String!, $nick: String!) {
    register(email: $email, password: $password, nick: $nick) {
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
 * Страница с регистрацией
 *
 * @returns { React.ReactElement }
 */
function Register() {
  const { register, handleSubmit, errors } = useForm({
    mode: 'onChange'
  })

  const Router = useRouter()
  const [registerUser, { loading, error }] = useMutation(REGISTER_USER, {
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
            Регистрация
          </Typography>
          <form>
            <TextField
              required
              fullWidth
              label="Имя"
              name="nick"
              variant="outlined"
              margin="normal"
              autoComplete="name"
              error={errors.nick}
              helperText={errors.nick && 'Имя должно быть длинее 5 символов'}
              inputRef={register({
                required: true,
                minLength: 5
              })}
            />
            <TextField
              required
              fullWidth
              label="Почта"
              name="email"
              variant="outlined"
              margin="normal"
              autoComplete="email"
              error={errors.email}
              helperText={errors.email && 'Неверная почта'}
              inputRef={register({
                required: true,
                validate: validateEmail
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
              helperText={
                errors.password &&
                'Пароль должен быть длиннее 8 символов, и может содержать латинские быквы, цифры, спецсимволы'
              }
              inputRef={register({
                required: true,
                validate: validatePassword
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
                registerUser({
                  variables: data
                }).then((response) => {
                  if (!response.errors) {
                    document.cookie = 'user=' + response.data.register.token
                    client.resetStore()
                    Router.push('/me')
                  }
                })
              )}
            >
              Зарегестрироваться
            </Button>
          </form>
          <Link href="/login">
            <Button fullWidth className={styles.button}>
              Есть аккаунт? Войдите
            </Button>
          </Link>
        </Paper>
      </Container>
    </div>
  )
}

Register.title = 'Регистрация'
Register.login = 'restricts'

export default Register
