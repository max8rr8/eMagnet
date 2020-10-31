import React from 'react'
import { gql, useQuery } from '@apollo/client'

const GET_ME = gql`
  query {
    me {
      email
      nick
    }
  }
`

/**
 * Страница с информацией о залогиненом юзере
 *
 * @returns {React.ReactElement}
 */
function Me() {
  const { data, loading, error } = useQuery(GET_ME)
  if (loading) return <p>Loading</p>
  if (error) return <p>Error</p>
  return (
    <div>
      Имя: {data.me.nick} <br />
      Почта: {data.me.email}
    </div>
  )
}

Me.title = 'О мне'
Me.login = 'requires'

export default Me
