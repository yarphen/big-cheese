module.exports = {
  port: parseInt(process.env.PORT, 10) || 8888,
  postgres: {
    host: process.env.DB_TEST_HOST || 'localhost',
    port: parseInt(process.env.DB_TEST_PORT, 10) || 5432,
    db: process.env.DB_TEST_NAME,
    username: process.env.DB_TEST_USERNAME,
    password: process.env.DB_TEST_PASSWORD,
  },
};
