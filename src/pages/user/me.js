import React from 'react'
import { gql, useQuery } from '@apollo/client'
import { User, USER_FRAGMENT } from '../../components/User'
import GlobalLoading from '../../components/GlobalLoading'

const GET_ME = gql`
  query {
    me {
      ...UserInfo
    }
  }
  ${USER_FRAGMENT}
`

/**
 * Страница с информацией о залогиненом юзере
 *
 * @returns {React.ReactElement}
 */
function Me() {
  const { data, loading, error } = useQuery(GET_ME, {
    pollInterval: 1000
  })
  if (loading) return <GlobalLoading />
  if (error) return <p>Error</p>

  return <User user={data.me} />
}

Me.title = 'О мне'
Me.login = 'requires'

export default Me
