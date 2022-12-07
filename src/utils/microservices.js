const httpStatus = require('./status')

exports.validationErrorResponse = (res, errors) => {
    return res.status(httpStatus.INVALID_INPUTS).json({
        status: httpStatus.INVALID_INPUTS,
        message: "Validation errors",
        errors: errors.array(),
      });
}