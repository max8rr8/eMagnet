import React from 'react'
import { gql, useQuery } from '@apollo/client'
import { User, USER_FRAGMENT } from '../../components/User'
import GlobalLoading from '../../components/GlobalLoading'
import { useRouter } from 'next/router'

const GET_ME = gql`
  query($id: Int!) {
    user(id: $id) {
      ...UserInfo
    }
  }
  ${USER_FRAGMENT}
`

/**
 * Страница с информацией о юзере
 *
 * @returns {React.ReactElement}
 */
function UserPage() {
  const router = useRouter()
  const { data, loading, error } = useQuery(GET_ME, {
    pollInterval: 1000,
    variables: {
      id: Number.parseInt(router.query.id, 10)
    }
  })

  if (loading) return <GlobalLoading />
  if (error) return <p>Error</p>

  return <User user={data.user} />
}

UserPage.title = 'О пользователе'
UserPage.login = 'ignore'

export default UserPage
