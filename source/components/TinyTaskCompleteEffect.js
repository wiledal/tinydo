import React, { useRef, useEffect } from 'react'

import { onAppEvent } from '../lib/app-events'

import emojiImages from '../images/*.png'
const emojiImagesArray = Object.keys(emojiImages).map(key => {
  var img = new Image() 
  img.src = emojiImages[key]
  return img  
})

export function TinyTaskCompleteEffect (props) {
  const canvas = useRef()

  useEffect ( () => {
    const ctx = canvas.current.getContext('2d')
    let emojis = []
    let isUpdating = false

    function burst (amount) {
      const img = emojiImagesArray[Math.floor(Math.random() * emojiImagesArray.length)]

      for (var i = 0 ; i < amount; i++) {
        const size = 20 + Math.random() * 40

        emojis.push({
          x: -size + Math.random() * canvas.current.width,
          y: -size * 2,
          rot: Math.random() * Math.PI * 2,
          size,
          bounce: Math.random() * .3 + .6,
          xs: Math.random() * 4 - 2,
          ys: Math.random() * 20 - 10,
          rs: Math.random() * (4 - 2) * .1,
          img
        })
      }

      if (!isUpdating) {
        isUpdating = true
        update()
      }
    }

    function resize () {
      canvas.current.width = window.innerWidth
      canvas.current.height = window.innerHeight
    }

    resize()

    function update () {
      if (emojis.length) {
        requestAnimationFrame(update)
      } else {
        isUpdating = false
      }
      ctx.clearRect(0,0,canvas.current.width, canvas.current.height)

      const newEmojis = []
      emojis.forEach(emoji => {
        emoji.ys += 1
        emoji.y += emoji.ys
        emoji.x += emoji.xs
        emoji.rot += emoji.rs

        if (emoji.y > canvas.current.height) {
          if (emoji.ys < 10) return
          emoji.y = canvas.current.height
          emoji.ys = -emoji.ys * emoji.bounce
        }
        if (emoji.x > canvas.current.width || emoji.x < 0) {
          emoji.xs = -emoji.xs * .9
        }

        ctx.save()
        ctx.translate(emoji.x + emoji.size, emoji.y + emoji.size)
        ctx.rotate(emoji.rot)
        ctx.drawImage(emoji.img, -emoji.size / 2, -emoji.size / 2, emoji.size, emoji.size)
        ctx.restore()
        newEmojis.push(emoji)
      })
      emojis = newEmojis
    }

    onAppEvent('task:complete', () => {
      burst(Math.random() > .9 ? 100 : 10)
    })
    
  }, [])
  
  return (
    <div className='tiny-complete-effect'>
      <canvas ref={canvas}></canvas>
    </div>
  )
}