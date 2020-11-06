import React, { useState } from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { gql, useQuery, useMutation } from '@apollo/client'
import MagnetGrid from './MagnetGrid'
import GlobalLoading from './GlobalLoading'

const GET_MAGNETS = gql`
  query {
    me {
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
    }
  }
`

const GIVE_MAGNET = gql`
  mutation($magnetId: Int!, $userId: Int!) {
    giveMagnet(magnetId: $magnetId, userId: $userId) {
      id
    }
  }
`

/**
 * Диалог выдачи магнита
 *
 * @param {object} props Component props
 * @param {Function} props.close Обработчик закрытия диалога
 * @param {number} props.userId ID юзера которому нужно дать магнит
 * @returns {React.ReactElement}
 */
export default function MagnetGivingDialog({ close, userId }) {
  const { data, loading } = useQuery(GET_MAGNETS)
  const [inputError, setInputError] = useState('')
  const [give, { givingLoading }] = useMutation(GIVE_MAGNET)
  const magnets = loading
    ? []
    : data.me.authoredMagnets.edges.map((edge) => edge.node)
  const [selected, setSelected] = useState(-1)

  if (givingLoading || loading) return <GlobalLoading />

  return (
    <Dialog open onClose={close}>
      <DialogTitle>Выдача магнита</DialogTitle>
      <DialogContent>
        <MagnetGrid
          selected={selected}
          magnets={magnets}
          onClick={(id) => setSelected(id)}
        />
        <Typography color="error">{inputError}</Typography>
      </DialogContent>

      <DialogActions>
        <Button onClick={close}>Отмена</Button>
        <Button
          color="primary"
          onClick={() => {
            if (selected === -1) {
              return setInputError('Пожалуйста выберете магнит')
            }

            setInputError('')

            give({
              variables: {
                magnetId: selected,
                userId
              }
            }).then(() => {
              close()
            })
          }}
        >
          Выдать
        </Button>
      </DialogActions>
    </Dialog>
  )
}
