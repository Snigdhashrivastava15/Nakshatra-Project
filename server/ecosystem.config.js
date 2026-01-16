// PM2 configuration for production
module.exports = {
  apps: [
    {
      name: 'planet-nakshatra-server',
      script: './dist/main.js',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
};
