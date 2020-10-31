export function httpError(err, req, res, next) {

  let statusCode = 500;
  const body = { message : null };

  if (err.isJoi) {
    statusCode = 400; // Bad request
    body.message = err.details && err.details[0] && err.details[0].message;
  } else if (err.isBoom) {
    statusCode = err.output.payload.statusCode;
    body.message = err.output.payload.message;
  } else if (err && err.name === 'SequelizeUniqueConstraintError') {
    statusCode = 409; // Conflict
    body.message = err.errors && err.errors[0] && err.errors[0].message;
  } else {
    body.message = process.env.NODE_ENV !== 'production' && err.toString ? err.toString() : 'Internal server error';
  }

  res.status(statusCode).send(body);
}
