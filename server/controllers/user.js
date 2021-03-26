const bcrypt = require('bcryptjs');

module.exports = {
  register: async (req, res) => {
    const db = req.app.get('db');
    const { username, password } = req.body;
    try {
      const [userInfo] = await db.user.find_user_by_username(username);
      if (!userInfo) {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);

        const [newUser] = await db.user.create_user(username, hash, `https://robohash.org/${username}.png`);
        req.session.user = { ...{ username: newUser.username, profile_pic: newUser.profile_pic } };

        return res.status(200).send(newUser)
      } else {
        return res.status(409).send("The information you provided matches a user in our database. Please register using a new username and password or log in to continue.")
      };
    } catch (err) {
      console.log(err);
      return res.sendStatus(500);
    };
  },
  login: async (req, res) => {
    const db = req.app.get('db');
    const { username, password } = req.body;
    try {
      const [userInfo] = await db.user.find_user_by_username(username);
      if (userInfo) {
        if (bcrypt.compareSync(password, userInfo.password)) {
          req.session.user = { ...{id:userInfo.id, username: userInfo.username, profile_pic: userInfo.profile_pic } };
          return res.status(200).send(req.session.user);
        } else {
          return res.status(400).send('Incorrect password, please try again.');
        }
      } else {
        return res.status(400).send('No user was found given the provided credentials, please check your login information or errors or register for a new account. ')
      }
    } catch (err) {
      console.log(err);
      return res.Status(500);
    }

  },
  logout: (req, res) => {
    req.session.destroy()
    return res.status(200).send("You Have Been Logged Out, Thank You for Being a Member of the Helo Community.")
  },
  getUser: (req, res) => {
    const { user } = req.session;
    if (user) {
      return res.status(200).send(user);
    } else {
      return res.sendStatus(404);
    }
  }
};