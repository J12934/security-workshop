const Sequelize = require('sequelize');
const bcrypt = require('bcryptjs');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite',
});

const Model = Sequelize.Model;
class User extends Model {}
User.init(
  {
    username: {
      type: Sequelize.STRING,
    },
    password: {
      type: Sequelize.STRING,
    },
  },
  {
    sequelize,
    modelName: 'user',
    timestamps: false,
  }
);

async function main() {
  await User.sync({ force: true });

  await sequelize.query(
    `INSERT INTO USERS (username, password)
     VALUES ('jannik', '${await bcrypt.hash('password1234', 10)}');`
  );

  const loggedIn = await login('jannik', 'password1234');

  console.log(`Logged in? ${loggedIn}`);
}

main();

async function login(username, password) {
  const user = await User.findOne({ where: { username } });

  if (!user) {
    return false;
  }

  return bcrypt.compare(password, user.password);
}
