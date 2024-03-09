const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');

// Replace with your service account credentials (**securely store!**)
// const serviceAccount = require('./serviceAccount.json'); // (create this file)

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: "https://your-project-id.firebaseio.com"
// });

router.post('/signup', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await admin.auth().createUser({
      email,
      emailVerified: false, // Set to false for email verification
      password
    });

    res.json({ message: 'User created successfully', uid: user.uid });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Failed to create user' });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await admin.auth().signInWithEmailAndPassword(email, password);
    const token = await user.getIdToken();

    res.json({ message: 'Login successful', token });
  } catch (error) {
    console.error(error);
    if (error.code === 'auth/wrong-password' || error.code === 'auth/user-not-found') {
      res.status(401).json({ message: 'Invalid email or password' });
    } else {
      res.status(400).json({ message: 'Failed to login' });
    }
  }
});

module.exports = router;
