export default (path) => {
  return path.length ? path.join('-') : 'rt'
}