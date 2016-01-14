var express = require( 'express' );
var server = express();
var bodyParser = require( 'body-parser' );

//Middleware
server.use( express.static( 'public' ) );
server.use(bodyParser.urlencoded({ extended: true}));
var buzzWords = [];

server.get( '/', function( req, res ) {
});

server.get( '/buzzwords', function( req, res ) {
  res.send( { 'buzzWords' : buzzWords });
});

server.route( '/buzzword' )
  .post( function( req, res ) {
    if( req.body.buzzWord !== '' && req.body.points !== '' && req.body.heard !== '' ) {
    buzzWords.push( {'buzzWord' : req.body.buzzWord,
      'points' : parseInt(req.body.points),
      'heard' : JSON.parse(req.body.heard)
    });
    res.send( { 'success' : true } );
    } else {
      res.send( { 'success' : false } );
    }
  })

  .put( function( req, res ) {
    var modifyThis = req.body.heard;
    modifyThis = !JSON.parse( req.body.heard );
    buzzWords[0].heard = modifyThis;
    res.send( { 'success' : true,
      newScore : parseInt( req.body.points )
    });
  })

  .delete( function( req, res ) {
    res.send( { 'succes' : true } );
  });

server.post( '/reset', function( req, res ) {
});

var server = server.listen( 8080, function() {
  var host = server.address().address;
  var port = server.address().port;

  console.log( 'Example app listening at http://%s:%s', host, port );
});