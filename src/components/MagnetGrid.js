import React, { useRef } from 'react'
import useComponentSize from '@rehooks/component-size'
import Magnet from './Magnet'

/**
 * Считает правильный marginTop для магнита
 *
 * @param {number} magnetsInRow Количество магниов в одном ряду(сверху и снизу вместе)
 * @param {number} i Номер магнита
 * @returns {number}
 */
function calculateTopMargin(magnetsInRow, i) {
  if (i < magnetsInRow) {
    return i % 2 === 1 ? 40 : 0
  }

  i %= magnetsInRow
  return i % 2 === 1 ? 8 : -32
}

/**
 * Один магнит в сетки
 *
 * @param {object} props Component props
 * @param {object} props.magnet Магнит который надо рендерить
 * @param {number} props.i Номер магнита
 * @param {Function} props.onClick Обработчик события нажатия
 * @param {boolean} props.selected Выбран ли на данный момент магнит
 * @param {number} props.magnetsInRow Количество магнитов в ряду
 * @returns {React.ReactElement}
 */
function MagnetGridPart({ magnet, i, magnetsInRow, onClick, selected }) {
  return (
    <div
      style={{
        marginLeft: -24,
        marginTop: calculateTopMargin(magnetsInRow, i),
        transformOrigin: 'center',
        transform: selected ? 'scale(1.05)' : '',
        zIndex: selected ? 0 : 1
      }}
      onClick={onClick}
    >
      <Magnet {...magnet} />
    </div>
  )
}

/**
 * Сетка(в виде сот) из магнитов
 *
 * @param {object} props Component props
 * @param {object[]} props.magnets  магниты
 * @param {Function} props.onClick Обработчик события нажатия на магнит
 * @param {number} props.selected ID выбраного магнита
 * @returns {React.ReactElement}
 */
export default function MagnetGrid({ magnets, onClick, selected }) {
  const rootRef = useRef()
  const size = useComponentSize(rootRef)
  const magnetsInRow = Math.floor((size.width - 24) / (115 - 24))

  onClick = onClick ? onClick : () => {}

  return (
    <div
      ref={rootRef}
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        paddingLeft: 24,
        minWidth: 250
      }}
    >
      {magnets.map((magnet, i) => (
        <MagnetGridPart
          key={magnet.id}
          magnet={magnet}
          i={i}
          selected={magnet.id === selected}
          magnetsInRow={magnetsInRow}
          onClick={() => onClick(magnet.id)}
        />
      ))}
    </div>
  )
}
