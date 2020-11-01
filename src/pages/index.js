import React from 'react'
import { gql, useQuery } from '@apollo/client'

const GET_USERS = gql`
  query {
    users {
      edges {
        node {
          nick
          email
        }
      }
    }
  }
`
/**
 * Главная страница(пока ничего)
 *
 * @returns {React.ReactElement}
 */
function Index() {
  const { loading, data } = useQuery(GET_USERS)
  if (loading) return <h1>Loading</h1>
  return <h1>WOW!{JSON.stringify({ data })}</h1>
}

Index.title = 'Главная'
Index.login = 'ignore'

export default Index
