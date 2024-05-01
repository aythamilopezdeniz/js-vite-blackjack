import _ from 'underscore'
// import { crearDeck } from './usecases/crear-deck'
// import { pedirCarta } from './usecases/pedir-carta'
// import { valorCarta } from './usecases/valor-carta'
// import crearDeck from "./usecases/crear-deck"
import { crearDeck, pedirCarta, valorCarta, turnoComputador, crearCartaHTML } from './usecases/'

/**
 * 2C = Two of Clubs
 * 2C = Two of Diaminds
 * 2C = Two of Hearts
 * 2C = Two of Spades
 */

let deck = []
const tipos = ['C', 'D', 'H', 'S']
const especiales = ['A', 'J', 'Q', 'K']

let puntosJugador = 0
let puntosComputadora = 0

// Referencias del HTML
const btnNuevo = document.querySelector('#btnNuevo')
const btnPedir = document.querySelector('#btnPedir')
const btnDetener = document.querySelector('#btnDetener')

const divCartasJugador = document.querySelector('#jugador-cartas')
const divCartasMaquina = document.querySelector('#maquina-cartas')
const puntosHTML = document.querySelectorAll('small')

deck = crearDeck(tipos, especiales)

// Eventos
btnPedir.addEventListener('click', () => {
  const carta = pedirCarta(deck)
  puntosJugador = puntosJugador + valorCarta(carta)
  puntosHTML[0].innerText = puntosJugador

  const imgCarta = crearCartaHTML(carta)
  divCartasJugador.append(imgCarta)

  if (puntosJugador > 21) {
    console.warn('Lo siento mucho, perdiste')
    btnPedir.disabled = true
    btnDetener.disabled = true
    turnoComputador(puntosJugador, puntosHTML[1], divCartasMaquina, deck)
  } else if (puntosJugador === 21) {
    console.warn('21, genial!')
    btnPedir.disabled = true
    btnDetener.disabled = true
    turnoComputador(puntosJugador, puntosHTML[1], divCartasMaquina, deck)
  }
})

btnDetener.addEventListener('click', () => {
  btnPedir.disabled = true
  btnDetener.disabled = true
  turnoComputador(puntosJugador, puntosHTML[1], divCartasMaquina, deck)
})

btnNuevo.addEventListener('click', () => {
  deck = []
  deck = crearDeck(tipos, especiales)

  puntosJugador = 0
  puntosComputadora = 0

  btnPedir.disabled = false
  btnDetener.disabled = false

  puntosHTML[0].innerText = 0
  puntosHTML[1].innerText = 0

  removeAllChild(divCartasJugador)
  removeAllChild(divCartasMaquina)
})

// remover todas las cartas
const removeAllChild = (parent) => {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild)
  }
}
