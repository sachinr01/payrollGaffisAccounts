module.exports = {
  apps: [
    {
      name: "frontend",
      script: "npm start",
      args: "start",
      cwd: "/root/gaffisAccounts2/frontend",
      env: {
        PORT: 3000,
        NODE_ENV: "production"
      }
    }
  ]
};
