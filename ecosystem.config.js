module.exports = {
  apps : [{
    name: 'SSE',
    script: './bin/www',
    // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }],
  deploy : {
    production : {
      user : 'root',
      host : '212.83.163.1',
      ref  : 'origin/master',
      repo : 'git@github.com:xl07097/SSE.git',
      path : '/home/xueliang/SSE',
      'post-deploy' : 'npm install && pm2 restartOrReload ecosystem.config.js --env production'
    }
  }
};

// [root@iZ94wb7tioqZ option_analysis]# pm2 save 
// ​[root@iZ94wb7tioqZ option_analysis]# pm2 startup centos 
// ​[PM2] Generating system init script in /etc/init.d/pm2-init.sh
// [PM2] Making script booting at startup...
// [PM2] /var/lock/subsys/pm2-init.sh lockfile has been added
// [PM2] -centos- Using the command:
//       su -c "chmod +x /etc/init.d/pm2-init.sh; chkconfig --add pm2-init.sh" 
// ​[PM2] Done.
// [root@iZ94wb7tioqZ option_analysis]# pm2 save 
// ​[PM2] Dumping processes

