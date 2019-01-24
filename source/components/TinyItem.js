import React from 'react'

const buttonStyle = {
  borderRadius: '4px',
  padding: '8px'
}

function hashCode(str) { // java String#hashCode
  var hash = 0;
  for (var i = 0; i < str.length; i++) {
     hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return hash;
} 

function intToRGB(i){
  var c = (i & 0x00FFFFFF)
      .toString(16)
      .toUpperCase();

  return '#' + "00000".substring(0, 6 - c.length) + c;
}

export function TinyItem (props) {
  const tagColor = props.item.tag ? intToRGB(hashCode(props.item.tag)) : ''

  return (
    <div className='tiny-item' data-state={props.item.state}>
      <div className="hover-bg"></div>
      <div className='title'>
        {props.item.tag && <span style={{color: tagColor}} className='tag'>#{props.item.tag}</span>}
        <span>{props.item.title}</span>
      </div>

      <div className='buttons'>
        {props.item.state!=='doing' && <button className='doing' onClick={() => { props.item.state='doing'; props.changeItem(props.item) }}>doing</button>}
        {props.item.state!=='todo' && <button className='todo' onClick={() => { props.item.state='todo'; props.changeItem(props.item) }}>todo</button>}
        {props.item.state!=='done' && <button className='done' onClick={() => { props.item.state='done'; props.changeItem(props.item) }}>done</button>}
      </div>
    </div>
  )
}