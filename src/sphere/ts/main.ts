import * as style from '../scss/reset.scss'
import Game from './game'

const game = new Game()
document.body.appendChild(game.renderer.domElement)
