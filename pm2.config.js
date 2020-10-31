module.exports = {
  apps: [
    {
      name: "logic.runner",
      script: "./src/logic/logic.runner.js",
      interpreter: "./node_modules/.bin/babel-node",
      env: {},
      env_production: {
        NODE_ENV: "production"
      },
      "log_date_format": "YYYY-MM-DD HH:mm:ss Z"
    }
  ]
};