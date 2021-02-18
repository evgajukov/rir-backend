module.exports = {
  development: {
    dialect: process.env.DB_DIALECT_DEVELOPMENT,
    username: process.env.DB_USERNAME_DEVELOPMENT,
    password: process.env.DB_PASSWORD_DEVELOPMENT,
    host: process.env.DB_HOST_DEVELOPMENT,
    port: process.env.DB_PORT_DEVELOPMENT,
    database: process.env.DB_DATABASE_DEVELOPMENT
  },
  production: {
    dialect: process.env.DB_DIALECT_PRODUCTION,
    username: process.env.DB_USERNAME_PRODUCTION,
    password: process.env.DB_PASSWORD_PRODUCTION,
    host: process.env.DB_HOST_PRODUCTION,
    port: process.env.DB_PORT_PRODUCTION,
    database: process.env.DB_DATABASE_PRODUCTION
  }
};