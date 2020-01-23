const pig = "Piglet"
exports.handler = (event, context, callback) => {
    callback(null, {
        statusCode: 200,
        body: `Hello there: env = ${pig}`,
    });
};