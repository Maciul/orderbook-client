'use strict';

let express = require( 'express' ),
    app = express(),
    http = require( 'http' ),
    path = require( 'path' ),
    port = process.env.PORT || 3000;

http.Server( app );

app.use( express.static( path.join( __dirname, 'public' ) ) );
app.use( express.static( path.join( __dirname, 'dist' ) ) );

app.get( '/', function( req, res ) {
    res.sendFile( __dirname + '/index.html' );
} );

app.listen( port, () => console.log( `Listening on ${port}` ) );