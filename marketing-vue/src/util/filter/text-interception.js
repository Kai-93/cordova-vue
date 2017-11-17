export function textInterception (value, limitLength) {
  let temp = parseInt(limitLength)
  if (value.length > temp) {
    return value.substring(0, temp - 1) + '...'
  }
  return value
}
