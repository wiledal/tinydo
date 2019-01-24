import React from 'react'

import { TinyItem } from './TinyItem'

export function TinyList (props) {
  return (
    <div className='tiny-list'>
      {props.items.map((item, i) => <TinyItem key={i} changeItem={props.changeItem} item={item} />)}
    </div>
  )
}