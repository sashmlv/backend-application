'use strict';

const Express = require( 'express' ),
   expressPinoLogger = require( 'express-pino-logger' ),
   bodyParser = require( 'body-parser' ),
   helmet = require( 'helmet' ),
   db = require( '@application/db-sql' ),
   logger = require( '@application/logger' ),
   app = Express(),
   { UsersError, notFound } = require( '../modules/users.error' ),
   // groupsRouter = require( '../components/groups/groups.router' ),
   // permissionsRouter = require( '../components/permissions/permissions.router' ),
   // statusRouter = require( '../components/status/status.routers' ),
   usersRouter = require( '../components/users/users.router' );

/* load libs */
app.use( expressPinoLogger )({

   logger: logger.logLib
}));
app.use( bodyParser.json());
app.use( bodyParser.urlencoded());
app.use( helmet());

/* routes */
app.use([

   // groupsRouter,
   // permissionsRouter,
   // statusRouter,
   usersRouter,
]);

/* success response */
app.use(( req, res, next ) => {

	if( ! res.locals.data ) {

		return next( notFound );
	}

	const data = res.locals.data;

	return res.json({

		data: data && data.rows && ( data.rows.length === 1 && data.rows[ 0 ] || data.rows ) || data, // unwrap data,
		rowCount: data && data.rowCount,
		success: ( data && data.success ) === undefined && true || data.success,
		status:	( data && data.status ) === undefined && 200 || data.status,
	});
});

/* error response */
app.use( async ( error, req, res, next ) => {

   error.status = error.status || 500;
   error.message = error.message || 'An error occurred';

	const response = {

		success: false,
		message: error.message,
		code: error.code,
		status: error.status,
		data: error.data,
	};

	logger.log( error );

	if( res.headersSent ) { // headers already sent

		return next( error );
	}

	return res.status( error.status ) // send error to client
     .json( response );
});

// await db.migrate.latest();
// logger.log( `Current migration version: ${ await db.migrate.currentVersion()}` );

module.exports = app;
