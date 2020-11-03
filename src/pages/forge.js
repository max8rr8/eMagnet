import React, { useState } from 'react'
import Magnet from '../components/Magnet'
import icons from '../icons.json'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import GlobalLoading from '../components/GlobalLoading'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import CirclePicker from 'react-color/lib/Circle'
import { gql, useMutation } from '@apollo/client'

const CREATE_MAGNET = gql`
  mutation createMagnet(
    $mainColor: String!
    $secondColor: String!
    $icon: String!
    $name: String!
  ) {
    createMagnet(
      mainColor: $mainColor
      secondColor: $secondColor
      icon: $icon
      name: $name
    ) {
      id
    }
  }
`

const useStyles = makeStyles((theme) =>
  createStyles({
    iconsRoot: {
      display: 'flex',
      flexWrap: 'wrap'
    },
    icon: {
      width: '100px',
      textAlign: 'center',
      borderRadius: '5px',
      '&:hover': {
        background: theme.palette.grey[300]
      },
      margin: '2px'
    },
    selectedIcon: {
      background: [theme.palette.grey[400], '!important']
    },

    grid: {
      display: 'grid',
      gridTemplateColumns: '1fr min-content',
      gridTemplateRows: '1fr min-content',
      height: '100%'
    },
    colorPickerRoot: {
      gridRow: 1,
      gridColumn: 2,
      marginRight: 14
    },
    iconPickerRoot: {
      gridRow: '1/3',
      gridColumn: 1
    },
    magnetRoot: {
      gridRow: 2,
      gridColumn: 2,
      marginBottom: 8
    },
    title: {
      margin: 5
    },
    magnet: {
      height: 140,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    },
    scaler: {
      transform: 'scale(1.5)'
    }
  })
)

/**
 * Страница с инструментом для создания магнитов
 *
 * @returns {React.ReactElement}
 */
function Forge() {
  const [mainColor, setMainColor] = useState('#3f51b5')
  const [secondColor, setSecondColor] = useState('#ffeb3b')
  const [selectedIcon, setSelectedIcon] = useState('python')
  const [name, setName] = useState('')
  const [touchedName, setTouchedName] = useState(false)
  const styles = useStyles()
  const [createMagnet, { loading, error }] = useMutation(CREATE_MAGNET, {
    errorPolicy: 'all'
  })

  return (
    <>
      {loading && <GlobalLoading />}
      <div className={styles.grid}>
        <div className={styles.iconPickerRoot}>
          <Typography component="h1" variant="h5" className={styles.title}>
            1. Выберите иконку
          </Typography>
          <div className={styles.iconsRoot}>
            {icons.map((icon) => (
              <div
                key={icon}
                className={
                  styles.icon +
                  ' ' +
                  (selectedIcon === icon ? styles.selectedIcon : '')
                }
                onClick={() => setSelectedIcon(icon)}
              >
                <img width="80" height="80" src={`/icons/${icon}.svg`} />
                <br />
                {icon}
              </div>
            ))}
          </div>
        </div>

        <div className={styles.colorPickerRoot}>
          <Typography component="h1" variant="h5" className={styles.title}>
            2. Выберите цвета
          </Typography>

          <Typography component="h1" variant="h6" className={styles.title}>
            главный цвет
          </Typography>
          <CirclePicker
            color={mainColor}
            onChange={(color) => setMainColor(color.hex)}
          />

          <Typography component="h1" variant="h6" className={styles.title}>
            фоновый цвет
          </Typography>
          <CirclePicker
            color={secondColor}
            onChange={(color) => setSecondColor(color.hex)}
          />

          {mainColor === secondColor && (
            <Typography color="error">
              Нельзя использовать один и тот же цвет как главный и фоновый
              одновременно
            </Typography>
          )}
        </div>
        <div className={styles.magnetRoot}>
          <Typography component="h1" variant="h5" className={styles.title}>
            3. Сохраните магнит
          </Typography>
          <div className={styles.magnet}>
            <div className={styles.scaler}>
              <Magnet
                mainColor={mainColor}
                secondColor={secondColor}
                icon={selectedIcon}
              />
            </div>
          </div>
          <TextField
            required
            fullWidth
            label="Название"
            name="name"
            variant="outlined"
            margin="normal"
            value={name}
            error={name === '' && touchedName}
            onChange={(event) => {
              setName(event.target.value)
              setTouchedName(true)
            }}
          />

          {error && <Typography color="error">{error.message}</Typography>}
          <Button
            fullWidth
            color="primary"
            variant="contained"
            onClick={() => {
              createMagnet({
                variables: {
                  mainColor,
                  secondColor,
                  name,
                  icon: selectedIcon
                }
              })
            }}
          >
            Сохранить
          </Button>
        </div>
      </div>
    </>
  )
}

Forge.title = 'Кузня'
Forge.login = 'requires'

export default Forge
