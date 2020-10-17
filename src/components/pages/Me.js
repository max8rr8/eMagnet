import { gql, useQuery } from '@apollo/client'
import React from 'react'
import { Redirect } from 'react-router-dom'

const GET_ME = gql`
  query GetMe {
    me {
      id
      nick
      email
    }
  }
`
export default function Me() {
  const { loading, error, data } = useQuery(GET_ME)

  if (loading) return 'Loading...'
  if (error) {
    if (error?.graphQLErrors[0]?.extensions?.code === 'UNAUTHENTICATED')
      return <Redirect to="/register" />
    console.error(error)
    return `Error!`
  }

  return <>{JSON.stringify(data)}</>
}
