export function catchError(fn, io) {
  if (io) {
    return (req, res, next) => {
      fn(req, res, io).catch(next);
    }
  }
  return (req, res, next) => fn(req, res).catch(next);
}