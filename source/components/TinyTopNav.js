import React, { useState } from 'react'

const style = {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  height: '40px',
  borderBottom: '1px solid #fff'
}

export function TinyTopNav (props) {
  const [ inputValue, setInputValue ] = useState('')

  function handleSubmit (event) {
    event.preventDefault()

    let title = inputValue
    let tag = null

    const res = /(#([\w]+)) (.+)/gi.exec(inputValue)
    if (res) {
      title = res[3]
      tag = res[2]
    }

    props.addItem({
      title,
      tag
    })

    setInputValue('')
  }

  return (
    <div className='tiny-top-nav'>
      <div className="grab-bar" style={{webkitAppRegion: 'drag'}}>
        <span onClick={props.showAbout}>tinydo</span>
      </div>
      <form onSubmit={handleSubmit}>
        <input placeholder="new todo" type="text" value={inputValue} onChange={(evt) => { setInputValue(evt.target.value) }} />
        <button style={{display: 'none'}}></button>
      </form>
    </div>
  )
}