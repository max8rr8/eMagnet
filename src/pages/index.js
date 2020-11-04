import React from 'react'
import { gql, useQuery } from '@apollo/client'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Button from '@material-ui/core/Button'
import GlobalLoading from '../components/GlobalLoading'
import Link from 'next/link'

const GET_USERS = gql`
  query {
    users {
      edges {
        node {
          id
          email
          nick
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

  if (loading) return <GlobalLoading />
  return (
    <Table>
      <TableHead>
        <TableCell>Nick</TableCell>
        <TableCell>Email</TableCell>
        <TableCell align="right" />
      </TableHead>
      <TableBody>
        {data.users.edges.map((user) => (
          <TableRow key={user.node.id}>
            <TableCell>{user.node.nick}</TableCell>
            <TableCell>{user.node.email}</TableCell>
            <TableCell align="right">
              <Link href={`/user/${user.node.id}`}>
                <Button>Смотреть</Button>
              </Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

Index.title = 'Главная'
Index.login = 'ignore'

export default Index
