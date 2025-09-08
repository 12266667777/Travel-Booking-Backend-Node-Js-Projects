const db = require('../config/database');

// Get popular cities for hotels
exports.getCities = () => {
    return new Promise((resolve, reject) => {
        const query = `SELECT id, name, country FROM cities ORDER BY popularity DESC`;

        db.all(query, [], (err, rows) => {
            if (err) return reject(err);
            resolve(rows);
        });
    });
};
