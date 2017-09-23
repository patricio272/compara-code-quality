const logger = require('winston');
logger.configure({
    transports: [
        new (logger.transports.Console)({
            timestamp: function () {
                return new Date().toISOString();
            },
            level: 'info',
            formatter: function (options) {
                return options.timestamp() + ' [' + options.level.toUpperCase() + ']: ' +
                    (options.message ? options.message : '') +
                    (options.meta && Object.keys(options.meta).length ? '\n\t' + JSON.stringify(options.meta) : '');
            }
        })
    ]
});

module.exports = logger;