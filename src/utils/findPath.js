export default (paths, pathname) => {
  let path
  let pathId
  // find current path
  paths.forEach((pathEval, index) => {
    if (`/messages/${pathEval.str}` === pathname) {
      pathId = index
      path = pathEval
    }
  })
  return {
    pathId,
    path,
    paths
  }
}
