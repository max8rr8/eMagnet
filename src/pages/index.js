import React from 'react'
import { gql, useQuery } from '@apollo/client'
import MagnetGrid from '../components/MagnetGrid'

const GET_MAGNETS = gql`
  query {
    magnets {
      edges {
        node {
          id
          mainColor
          secondColor
          icon
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
  const { loading, data } = useQuery(GET_MAGNETS)

  if (loading) return <h1>Loading</h1>
  return (
    <MagnetGrid magnets={data.magnets.edges.map((magnet) => magnet.node)} />
  )
}

Index.title = 'Главная'
Index.login = 'ignore'

export default Index
