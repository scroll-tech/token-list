export function isObject(x) {
  return Object.prototype.toString.call(x).slice(8, -1) === 'Object'
}

// assume everything in arr is string
export function noDuplicateStringInArray(arr) {
  if (!arr.length) return true
  return Boolean(
    arr.sort().reduce((a, b) => {
      if (!a) return false
      if (a === b) return false
      return b
    })
  )
}
