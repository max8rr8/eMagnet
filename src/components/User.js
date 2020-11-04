import React, { useState } from 'react'
import { gql } from '@apollo/client'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import AddIcon from '@material-ui/icons/AddCircle'
import MagnetGrid from './MagnetGrid'
import MagnetGivingDialog from './MagnetGivingDialog'

export const USER_FRAGMENT = gql`
  fragment UserInfo on User {
    id
    userMagnets {
      edges {
        node {
          magnet {
            id
            icon
            mainColor
            secondColor
          }
        }
      }
      total
    }
    authoredMagnets {
      total
      edges {
        node {
          id
          icon
          mainColor
          secondColor
        }
      }
    }
    nick
    email
  }
`

/**
 * Компонентс информацией о юзере
 *
 * @param {object} props Component props
 * @param {object} props.user Пользователь
 * @returns {React.ReactElement}
 */
export function User({ user }) {
  const [addingMagnet, setAddingMagnet] = useState(false)

  return (
    <div>
      <Typography component="h1" variant="h4">
        {user.nick}
      </Typography>

      <Typography color="textSecondary">{user.email}</Typography>

      <Typography component="h1" variant="h5">
        Создал магниты
      </Typography>
      <MagnetGrid
        magnets={user.authoredMagnets.edges.map((magnet) => magnet.node)}
      />

      <Typography component="h1" variant="h5">
        Получил магниты
        <IconButton color="primary" aria-label="add to shopping cart">
          <AddIcon onClick={() => setAddingMagnet(true)} />
        </IconButton>
      </Typography>
      <MagnetGrid
        magnets={user.userMagnets.edges
          .map((magnet) => magnet.node.magnet)
          .reverse()}
      />
      {addingMagnet && (
        <MagnetGivingDialog
          userId={user.id}
          close={() => setAddingMagnet(false)}
        />
      )}
    </div>
  )
}
