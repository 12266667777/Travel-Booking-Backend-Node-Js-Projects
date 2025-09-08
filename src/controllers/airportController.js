const Airport = require('../models/airport');

// GET /api/airports
exports.getAirports = async (req, res, next) => {
    try {
        const { search } = req.query;
        const airports = await Airport.getAirports(search);

        res.status(200).json({
            success: true,
            airports
        });
    } catch (error) {
        next(error);
    }
};
