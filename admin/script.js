import { io } from 'https://cdn.socket.io/4.4.1/socket.io.esm.min.js'
const socket = io('/', { auth: { role: 'admin' } })
const dot = document.getElementById('dot')
const tol = 1

socket.on('movement', (data) => {
  if (Array.isArray(data[0])) {
    data.forEach(updateDom)
  } else updateDom(data)
})

function updateDom([x, y, z]) {
  const translateX = (+(dot.getAttribute('x') ?? 0) + x) / tol
  const translateY = (+(dot.getAttribute('y') ?? 0) + y) / tol
  const translateZ = (+(dot.getAttribute('z') ?? 0) + z) / tol

  console.log(x, y, z)
  dot.style.transform = `translateX(${translateX}px) translateY(${translateY}px) scale(${1})`

  dot.setAttribute('x', translateX)
  dot.setAttribute('y', translateY)
  dot.setAttribute('z', translateZ)
}
