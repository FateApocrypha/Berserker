export default function initComputed(ber) {
  let computed = ber.options.computed
  if (!computed) return

  let descriptor, prop
  for (prop in computed) {
    descriptor = computed[prop]
    if (typeof descriptor === 'function') {
      descriptor = {
        get: descriptor
      }
      descriptor.enumerable = true
      descriptor.configurable = true

      Object.defineProperty(ber.options.data, prop, descriptor)
    }
  }
}