'use strict';

const pino = require( 'pino' );

const logger = pino();

const log = {
   info: logger.info.bind( logger ),
   warn: logger.warn.bind( logger ),
   error: logger.error.bind( logger ),
};

module.exports = log;
