const databaseConfig = {
  development: {
    database_srv: process.env.DATABASE_SRV,
    database_name: process.env.DATABASE_NAME,
  },
  production: {
    database_srv: process.env.DATABASE_SRV,
    database_user: process.env.DATABASE_USER,
    database_pwd: process.env.DATABASE_PWD,
    database_cluster: process.env.DATABASE_CLUSTER,
    database_name: process.env.DATABASE_NAME,
    database_opts: process.env.DATABASE_OPTS,
  },
};

module.exports = databaseConfig;
