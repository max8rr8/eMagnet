import React, { useState, useEffect } from 'react'
import MagnetGrid from '../../components/MagnetGrid'
import icons from '../../icons.json'

/**
 * Странийа для дебага магнитов
 *
 * @returns {React.ReactElement}
 */
function Index() {
  const [magnets, setMagnets] = useState([])

  useEffect(() => {
    const randomColors = [
      'red',
      'blue',
      'green',
      'purple',
      'grey',
      'pink',
      'brown',
      'orange',
      'yellow'
    ]
    const timer = setTimeout(
      () => {
        if (magnets.length < 128) {
          setMagnets([
            ...magnets,
            {
              id: magnets.length,
              mainColor:
                randomColors[Math.floor(Math.random() * randomColors.length)],
              secondColor:
                randomColors[Math.floor(Math.random() * randomColors.length)],
              icon: icons[Math.floor(Math.random() * icons.length)]
            }
          ])
        }

        return () => clearTimeout(timer)
      },
      magnets.length < 32 ? 500 : 250
    )
  })

  return <MagnetGrid magnets={magnets} />
}

Index.title = 'ДЕБАГ: Сетка магнитов'
Index.login = 'ignore'

export default Index
