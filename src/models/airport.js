const db = require('../config/database');

// Get airports with optional search
exports.getAirports = (search) => {
    return new Promise((resolve, reject) => {
        let query = `SELECT code, name, city, country FROM airports`;
        let params = [];

        if (search) {
            query += ` WHERE city LIKE ? OR name LIKE ?`;
            params = [`%${search}%`, `%${search}%`];
        }

        db.all(query, params, (err, rows) => {
            if (err) return reject(err);
            resolve(rows);
        });
    });
};
