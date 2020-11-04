import React, { useRef } from 'react'
import useComponentSize from '@rehooks/component-size'
import Magnet from './Magnet'

/**
 * Считает количество магнитов в чётных и нечётных рядах
 *
 * @param {number} maxPos ширина сектки магнитов
 * @returns {number[]}
 */
function calculateGrid(maxPos) {
  const firstRowNumber = Math.floor((maxPos + 64) / (115 + 64))
  const secondRowNumber = Math.floor((maxPos + 64 - 90) / (115 + 64))

  return [firstRowNumber, firstRowNumber + secondRowNumber]
}

/**
 * Один магнит в сетки
 *
 * @param {object} props Component props
 * @param {object} props.magnet Магнит который надо рендерить
 * @param {number} props.i Номер магнита
 * @param {number[]} props.posses Количество магнитов в чётных и нечётных рядах
 * @param {number[]} props.rightMargins свободное место в чётных и не чйтных рядах
 * @returns {React.ReactElement}
 */
function MagnetGridPart({
  magnet,
  i,
  posses,
  rightMargins,
  onClick,
  selected
}) {
  let margin = 64
  if (i % posses[1] === 0) margin = 0
  if (i % posses[1] === posses[0]) margin = 90

  let marginRight = 0
  if (i % posses[1] === posses[0] - 1) marginRight = rightMargins[0]
  if (i % posses[1] === posses[1] - 1) marginRight = rightMargins[1]

  return (
    <div
      style={{
        marginLeft: margin,
        marginTop: -38,
        marginRight,
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
 * @returns {React.ReactElement}
 */
export default function MagnetGrid({ magnets, onClick, selected }) {
  const rootRef = useRef()
  const size = useComponentSize(rootRef)
  const posses = calculateGrid(size.width)
  const rightMargins = [
    Math.max(size.width - 5 + 64 - posses[0] * (115 + 64), 0),
    Math.max(size.width - 95 + 64 - (posses[1] - posses[0]) * (115 + 64), 0)
  ]
  console.log(posses)
  onClick = onClick ? onClick : () => {}

  return (
    <div
      ref={rootRef}
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        paddingTop: 38,
        minWidth: 250
      }}
    >
      {magnets.map((magnet, i) => (
        <MagnetGridPart
          onClick={() => onClick(magnet.id)}
          key={magnet.id}
          magnet={magnet}
          i={i}
          selected={magnet.id == selected}
          rightMargins={rightMargins}
          posses={posses}
        />
      ))}
    </div>
  )
}
