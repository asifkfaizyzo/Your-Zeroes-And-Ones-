module.exports = {
  apps: [
    {
      name: "yourzerosandones",
      script: "node_modules/next/dist/bin/next",
      args: "start",
      cwd: "/var/www/yourzerosandones.com",
      instances: 1,
      exec_mode: "fork",
      autorestart: true,
      watch: false,
      max_memory_restart: "1G",
      env: {
        NODE_ENV: "production",
        PORT: 3000
      },
      error_file: "/var/www/yourzerosandones.com/logs/error.log",
      out_file: "/var/www/yourzerosandones.com/logs/output.log",
      time: true
    }
  ]
};
