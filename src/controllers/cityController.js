const City = require('../models/city');

// GET /api/cities
exports.getCities = async (req, res, next) => {
    try {
        const cities = await City.getCities();

        res.status(200).json({
            success: true,
            cities
        });
    } catch (error) {
        next(error);
    }
};
