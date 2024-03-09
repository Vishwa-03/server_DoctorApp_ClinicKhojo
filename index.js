
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Add CORS for development (remove for production)
const doctorRouter = require('./routes/doctors');
const authRouter = require('./routes/auth'); // Login and Signup routes
const firebase = require('firebase-admin');
const cookieParser = require("cookie-parser");
const app = express();

app.use(cookieParser());



// Replace with your Firebase project configuration
const firebaseConfig = {
    apiKey: "AIzaSyCQF0c5xnNXSVfdZMq_OCqVxyXoNuS5eag",
    authDomain: "clinickhojoserver.firebaseapp.com",
    projectId: "clinickhojoserver",
    storageBucket: "clinickhojoserver.appspot.com",
    messagingSenderId: "846894620649",
    appId: "1:846894620649:web:42e22614f34ac697787578",
    measurementId: "G-9ZQDF7KR9Z"
};

firebase.initializeApp(firebaseConfig);


// Connect to MongoDB
mongoose.connect('mongodb://0.0.0.0:27017/Doctor', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(cors()); // Enable CORS for development
app.use(express.json());

// Firebase Authentication Middleware
// app.use(async (req, res, next) => {
//   try {
//     const idToken = req.headers.authorization?.split(' ')[1]; // Assuming Bearer token format
//     const decodedToken = await firebase.auth().verifyIdToken(idToken);
//     req.uid = decodedToken.uid; // Store user ID for authorization
//     next();
//   } catch (error) {
//     console.error(error);
//     if (error.code === 'auth/id-token-revoked') {
//       res.status(401).json({ message: 'Unauthorized: Token revoked' });
//     } else {
//       res.status(401).json({ message: 'Unauthorized' });
//     }
//   }
// });

app.use('/auth', authRouter);  // Login and Signup routes
app.use('/doctors', doctorRouter); // Use doctor routes with authentication

app.listen(3000, () => console.log('Server listening on port 3000'));


