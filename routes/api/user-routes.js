const router = require('express').Router();
const { User } = require('../../models');

// Router for creating a new user
router.post('/signup', async (req, res) => {
  try {
    const alreadyTaken = await User.findOne({where: { email: req.body.email }});
    if (alreadyTaken) {
      return res.status(400).json({message: "That email address is already taken."});
    }

    const usersData = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    });

    if (!usersData) {
      return res
        .status(400)
        .json({
          message: "Failed to create new user. Password must be at least 8 characters long."
        });
    }

    // Create session variables based on the new in user
    req.session.user_id = usersData.id;
    req.session.logged_in = true;  
    req.session.save((err) => {
      if (err) {
        return res.status(500).json({
          user: usersData,
          message: 'You are now registered! Although an error occurred trying to automatically log you in. Try logging in with your new credentials.'
        });
      }

      return res.json({
        user: usersData,
        message: 'You are now logged in and registered.'
      });
    });

  } catch (err) {
    console.error(err);
    err.message = err.message ?? 'An error occurred while creating your account.';
    res.status(400).json(err);
  }
});

// Router for logging in as an existing user
router.post('/login', async (req, res) => {
  try {
    // Find the user who matches the posted e-mail address
    const usersData = await User.findOne({ where: { email: req.body.email } });

    if (!usersData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, try again' });
      return;
    }

    // Verify the posted password with the password store in the database
    const goodPassword = await usersData.checkPassword(req.body.password);

    if (!goodPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, try again' });
      return;
    }

    // Create session variables based on the logged in user
    req.session.user_id = usersData.id;
    req.session.logged_in = true;
    req.session.save((err) => {
      if (err) {
        return res.status(500).json({ 
          message: 'An error occurred when logging in.'
        });
      }
      return res.json({ 
        user: usersData,
        message: 'Now logged in!'
      });
    });

  } catch (err) {
    err.message = err.message ?? 'An error occurred when logging in.';
    res.status(400).json(err);
  }
});

//Router for logging out as a user
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    // Remove the session variables
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;