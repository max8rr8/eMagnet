import React, { useState } from 'react'
import Link from 'next/link'
import { gql, useMutation } from '@apollo/client'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import { useRouter } from 'next/router'

const REGISTER_USER = gql`
  mutation register($email: String!, $password: String!, $nick: String!) {
    register(email: $email, password: $password, nick: $nick) {
      token
    }
  }
`

/**
 * Страница с регистрацией
 *
 * @returns { React.ReactElement }
 */
function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const Router = useRouter()
  const [register, { loading, error }] = useMutation(REGISTER_USER)

  if (loading) return <p>Loading...</p>
  if (error) return <p>An error occurred</p>

  return (
    <div>
      <TextField
        label="Имя"
        value={name}
        onChange={(element) => setName(element.target.value)}
      />
      <TextField
        label="Почта"
        value={email}
        onChange={(element) => setEmail(element.target.value)}
      />
      <TextField
        label="Пароль"
        value={password}
        onChange={(element) => setPassword(element.target.value)}
      />
      <Button
        onClick={() => {
          register({
            variables: {
              email,
              nick: name,
              password
            }
          }).then((response) => {
            document.cookie = 'user=' + response.data.register.token
            Router.push('/me')
          })
        }}
      >
        Register
      </Button>
      <Link href="/login">
        <Button>Login instead</Button>
      </Link>
    </div>
  )
}

Register.title = 'Вход'
Register.login = 'restricts'

export default Register
