const agencyvalidate = (schema) => async (req, res, next) => {
    try {
        const parseBody = await schema.parseAsync(req.body);
        req.body = parseBody; // Only if validation is successful
        next();
    } catch (err) {
        const status = 422;
        const message = "Fill the input properly";

        // Check if 'err.errors' is an array and map over it to extract messages
        const extraDetails = Array.isArray(err.errors)
            ? err.errors.map((error) => error.message)
            : ['Validation failed, but error details are not available'];

        const error = {
            status,
            message,
            extraDetails,
        };

        console.log("These are the extraDetails", extraDetails);
        console.log(error);

        next(error);
    }
};

module.exports = agencyvalidate;
