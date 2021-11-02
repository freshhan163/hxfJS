const winston = require('winston');
const { format } = winston;
const { combine, printf, prettyPrint, label, colorize } = format;
const path = require('path');

// 1.自定义格式
const myFormat = printf(({ level, message, ...meta }) => {
    // console.log('tags = ', meta);
    return `${level}111: ${message}: ${JSON.stringify(meta)}`;
});
const logFormat = format.printf(info => `[${info.level}]: ${info.message}`);
const fileFormat = format.printf(info => {
    return `[${info.level}]: ${JSON.stringify(info.message)}`
});

// 2.自动美化

const logger = winston.createLogger({
    defaultMeta: { service: 'user-service' },
    // format: format.combine(
    //     format.label({ label: path.basename(process.mainModule.filename) }),
    //     format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    //     // Format the metadata object
    //     format.metadata({ fillExcept: ['message', 'level', 'timestamp', 'label'] })
    // ),
    transports: [
        new winston.transports.Console({
            format: combine(
                colorize(),
                format.splat(),
                logFormat,
            ),
        }),
        new winston.transports.File({
            filename: 'common.log',
            format: format.combine(
                format.splat(),
                fileFormat
            )
        })
    ],
});
 
//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
console.log('process.env.NODE_ENV =', process.env.NODE_ENV);
if (process.env.NODE_ENV !== 'production') {
//   logger.add(new winston.transports.Console({
//     format: winston.format.simple(),
//   }));
}

export default logger;
