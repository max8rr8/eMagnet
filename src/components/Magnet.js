import React from 'react'
import { createStyles, makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() =>
  createStyles({
    magnetBorder: {
      width: 115,
      height: 80,
      background: (props) => props.main,

      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)'
    },
    magnetMain: {
      width: 100,
      height: 70,
      background: (props) => props.background,

      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)'
    },
    magnetIcon: (props) => ({
      width: 80,
      height: 50,
      background: props.main,
      maskImage: `url("/icons/${props.icon}.svg")`,
      maskSize: 'contain',
      maskRepeat: 'no-repeat',
      maskPosition: 'center'
    })
  })
)

/**
 * Компонент который отрисовывает магнит
 *
 * @param {object} props Component props
 * @param {string} props.mainColor Главный цвет(иконка и обводка)
 * @param {string} props.secondColor Цвет фона
 * @param {string} props.icon Иконка
 * @returns {React.ReactElement}
 */
export default function Magnet({ mainColor, secondColor, icon }) {
  const styles = useStyles({
    main: mainColor,
    background: secondColor,
    icon
  })

  return (
    <div className={styles.magnetBorder}>
      <div className={styles.magnetMain}>
        <div className={styles.magnetIcon} />
      </div>
    </div>
  )
}
