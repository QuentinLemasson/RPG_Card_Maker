// React
import React from 'react'
// Style
import './AttributeDisplay.css'

interface Props {
    label: string,
    value: number | null,
}

const AttributeDisplay = (props: Props) => {
  return (
    <div className='attribute-container'>
        <label>{props.label}</label>
        <span className='attribute-value'>{props.value}</span>
    </div>
  )
}

export default AttributeDisplay;