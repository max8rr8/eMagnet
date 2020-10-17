import React, { useState } from 'react'
import { useMutation, gql, useQuery } from '@apollo/client'
import { Redirect } from 'react-router-dom'

const REGISTER_USER = gql`
  mutation register($email: String, $password: String, $nick: String) {
    register(email: $email, password: $password, nick: $nick)
  }
`

const GET_ME = gql`
  query GetMe {
    me {
      id
      nick
      email
    }
  }
`

export default function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [login, { loading, error }] = useMutation(REGISTER_USER)
  const { loading: loadingMe, error: errorMe, refetch: refetchMe } = useQuery(
    GET_ME
  )

  if (loadingMe) return 'Loading...'
  if (errorMe?.graphQLErrors[0]?.extensions?.code !== 'UNAUTHENTICATED') {
    return <Redirect to="/" />
  }

  if (loading && loadingMe) return <p>Loading...</p>
  if (error) return <p>An error occurred</p>

  return (
    <div>
      Name:{' '}
      <input value={name} onChange={(event) => setName(event.target.value)} />
      <br />
      Email:{' '}
      <input value={email} onChange={(event) => setEmail(event.target.value)} />
      <br />
      Password:
      <input
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />
      <br />
      <button
        type="submit"
        onClick={() => {
          login({
            variables: {
              email,
              nick: name,
              password
            }
          }).then((response) => {
            document.cookie = 'user=' + response.data.register
            refetchMe()
          })
        }}
      >
        Send
      </button>
    </div>
  )
}
