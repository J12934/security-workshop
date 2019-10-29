const Sequelize = require('sequelize');
const md5 = require('md5');

function hash(password) {
  return md5(password);
}

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite',
});

async function main() {
  await sequelize.query(`DROP TABLE users`);
  await sequelize.query(
    'CREATE TABLE IF NOT EXISTS users (`id` INTEGER PRIMARY KEY AUTOINCREMENT, `username` VARCHAR(255), `password` VARCHAR(255));'
  );

  await sequelize.query(
    `INSERT INTO users (username, password)
     VALUES ('jannik', '${await hash('password1234')}');`
  );

  const loggedIn = await login(`jannik`, `passwort1234`);

  console.log();
  console.log();
  console.log(`Logged in? ${loggedIn}`);
}

main();

async function login(username, password) {
  const result = await sequelize.query(
    `SELECT * FROM USERS WHERE
     username = '${username}' AND password = '${hash(password)}'`
  );

  return result[0].length >= 1 ? true : false;
}
