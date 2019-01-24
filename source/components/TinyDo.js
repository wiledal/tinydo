import React, { useContext, useState, useEffect } from 'react'

import { triggerAppEvent } from '../lib/app-events'

import { TinyTopNav } from './TinyTopNav'
import { TinyList } from './TinyList'

import { TinyTaskCompleteEffect } from './TinyTaskCompleteEffect'

import '../css/app.scss'

const { remote } = window.require('electron')

function TinyDo (props) {
  const [ items, setItems ] = useState(localStorage.items ? JSON.parse(localStorage.items) : [])
  const [ showAbout, setShowAbout ] = useState(false)
  
  function saveList (newItems) {
    setItems(newItems)
    localStorage.items = JSON.stringify(newItems)
  }

  function addItem ({title, tag}) {
    items.unshift({
      title,
      tag,
      state: 'todo'
    })
    saveList(items)
  }

  function changeItem (item) {
    const index = items.indexOf(item)
    items[index] = item
    if (item.state === 'done') triggerAppEvent('task:complete')
    saveList(items)
  }

  function clearDone () {
    saveList(items.filter(item => item.state !== 'done'))
  }

  const hasDone = items.map(item => item.state).includes('done')

  return (
    <div style={{
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0
    }}>
      <TinyTopNav clearDone={clearDone} addItem={addItem} showAbout={() => { setShowAbout(true) }} />
      <TinyList changeItem={changeItem} items={items} />
      <div className='tiny-bottom-nav'>
        <button style={{opacity: hasDone ? 1 : .2 }} onClick={clearDone}>clear</button>
      </div>

      <TinyTaskCompleteEffect />

      <div className={`about ${showAbout ? 'show' : ''}`} onClick={ () => { setShowAbout(false) } }>
        <div>
          <h1>TinyDo</h1>
          <p>v{remote.app.getVersion()}</p>
          <p>by Hugo Wiledal</p>
          <p>@etthugo</p>
          <p>🍺😎</p>
        </div>
      </div>
    </div>
  )
}

export {
  TinyDo
}