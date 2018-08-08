const path = require( 'path' );

module.exports = {
    entry: './public/app.js',
    output: {
        path: path.resolve( __dirname, 'dist' ),
        filename: 'bundle.js',
        library: 'ob'
    }
};