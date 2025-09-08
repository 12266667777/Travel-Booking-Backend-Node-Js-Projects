 
const bcrypt = require("bcryptjs");
const db = require("../config/database"); // your SQLite DB connection

// ==============================
// CREATE USER
// ==============================
async function createUser({ firstName, lastName, email, password, phone, dateOfBirth, passportNumber }) {
  try {
    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await db.run(
      `INSERT INTO users 
       (first_name, last_name, email, password_hash, phone, date_of_birth, passport_number)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [firstName, lastName, email, hashedPassword, phone || null, dateOfBirth || null, passportNumber || null]
    );

    return result.lastID; // returns user_id
  } catch (err) {
    if (err.message.includes("UNIQUE constraint failed: users.email")) {
      throw new Error("Email already registered");
    }
    throw new Error("Error creating user: " + err.message);
  }
}

// ==============================
// FIND USER BY EMAIL
// ==============================
async function findUserByEmail(email) {
  const user = await db.get(`SELECT * FROM users WHERE email = ?`, [email]);
  return user;
}

// ==============================
// VERIFY PASSWORD
// ==============================
async function verifyPassword(inputPassword, storedHash) {
  return await bcrypt.compare(inputPassword, storedHash);
}

module.exports = {
  createUser,
  findUserByEmail,
  verifyPassword
};
