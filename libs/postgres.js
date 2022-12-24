const {Client} = require('pg');

async function getConnection(){
  const client = new Client({
    host:'localhost',
    port: 5432,
    user: 'Antonio',
    password: 'admin123',
    database: 'myDB'
  });
  await client.connect();
  return client;
}

module.exports = getConnection;
