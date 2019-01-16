exports.succeed = (res, data) => {
    return res.json({
        ok: true,
        data: data
    })
}

exports.error = (res, err) => {
    return res.json({
        ok: false,
        error: err
    })
}

exports.validate = (validationResult, req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        exports.error(res, errors.array());
        return false;
    }
    return true;
}

exports.tryJson = async (res, func, ...args) => {
    try {
        const data = await func(...args);
        exports.succeed(res, data);
    } catch (error) {
        exports.error(res, error);
    }
}

exports.validateTryJson = async (req, res, validationResult, func, ...args) => {
    if (exports.validate(validationResult, req, res)) {
        exports.tryJson(res, func, ...args);
    }
}

exports.stringSchema = (where = 'query') => {
    return {
        in: [where],
        exists: {
            options: {
                checkFalsy: true
            }
        },
        trim: true
    }
}
