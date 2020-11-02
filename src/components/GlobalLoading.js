import React from 'react'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import Dialog from '@material-ui/core/Dialog'
import CircularProgress from '@material-ui/core/CircularProgress'

const useStyles = makeStyles(() =>
  createStyles({
    paper: {
      overflow: 'hidden',
      padding: 4
    }
  })
)

/**
 * Загрузка на весь экран
 *
 * @returns {React.ReactElement}
 */
export default function GlobalLoading() {
  const styles = useStyles()
  return (
    <Dialog open scroll="body" PaperProps={{ className: styles.paper }}>
      <CircularProgress size={60} />
    </Dialog>
  )
}
