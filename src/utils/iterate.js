import _ from 'lodash'

const iterate = (base, onString, onObject, path = []) => {
  const current = path.length ? _.get(base, path) : base
  if (current) {
    if (typeof current === 'string') {
      return onString(path, current, false)
    } else if (typeof current === 'object') {
      const subs = Object.keys(current)
      if (subs.length) {
        const deeper = () => {
          return subs.map(
            (subPath) => iterate(base, onString, onObject, [...path, subPath])
          )
        }
        return onObject(path, current, deeper)
      } else {
        return onObject(path, current, false)
      }

    }
  } else {
    return onString(path, "", false)
  }
}

export default iterate
