// firebase/verifyToken.js
const admin = require("firebase-admin");
require("dotenv").config();

const path = process.env.FIREBASE_ADMIN_KEY_PATH;   // <— NEW
if (!path) throw new Error("FIREBASE_ADMIN_KEY_PATH env var not set");
const serviceAccount = require(path); 

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = verifyToken;
