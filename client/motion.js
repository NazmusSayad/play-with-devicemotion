const queue = []
function calculateQueue() {
  const total = queue.reduce(
    ([ox, oy, oz], [x, y, z]) => {
      return [ox + x, oy + y, oz + z]
    },
    [0, 0, 0]
  )

  return total
}

window.ondevicemotion = (event) => {
  const { x, y, z } = event.accelerationIncludingGravity
  queue.push([x, y, z])
}

export default (resolve) => {
  function runInterval() {
    if (!queue.length) return
    resolve(calculateQueue())
    queue.length = 0
  }

  setInterval(runInterval, 333)
  runInterval()
}
