const { Repair } = require('../models/repair.model');
const { User } = require('../models/user.model');

const { catchAsync } = require('../utils/catchAsync');
const { AppError } = require('../utils/appError');

const validateSession = catchAsync(async (req, res, next) => {
    const user = req.sessionUser;

    if (!user) {
        return next(
            new AppError('You need to log in to see this endpoint', 401)
        );
    }

    next();
});

const validateRole = catchAsync(async (req, res, next) => {
    const user = req.sessionUser;

    if (user.role !== 'employee') {
        return next(
            new AppError(
                'Only employees can access this endpoint, log in with an account with employee role',
                401
            )
        );
    }

    next();
});

const repairExists = catchAsync(async (req, res, next) => {
    const { id } = req.params;

    const repair = await Repair.findOne({
        where: { id, status: 'pending' },
        include: [{ model: User }],
    });

    if (!repair) {
        return next(
            new AppError(
                'No repair found with the given ID or status pending',
                404
            )
        );
    }

    req.repair = repair;
    next();
});

module.exports = {
    repairExists,
    validateSession,
    validateRole,
};
