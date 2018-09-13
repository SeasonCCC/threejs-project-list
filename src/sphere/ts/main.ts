import * as THREE from 'three'
import * as back from '../assets/back.png'
import * as style from '../scss/reset.scss'
import Game from './game'

const canvas = document.createElement('canvas')
canvas.id = 'Canvas'

const game = new Game({ el: '#Canvas' })

game.greet()

document.body.appendChild(canvas)

// const img = new Image()
// img.onload = function() {
//   canvas.className = style.container
//   const ctx = canvas.getContext("2d")
//   ctx.drawImage(img, 100, 100)
//
//   // document.body.appendChild(img)
// }
// img.src = '../' + back
