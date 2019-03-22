var midiConnector = require('midi-launchpad').connect(0);
var grid = [
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0]
]

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);


app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket) {
  console.log('a user connected');
});




var launchpadmain;
// wait for the connector to be ready
midiConnector.on("ready", function(launchpad) {
  http.listen(3000, function() {
    console.log('listening on *:3000');
  });

  launchpadmain = launchpad;
  launchpad.on("press", flasher);
  var colour = [
    //launchpad.colors.red.low,
    //launchpad.colors.red.medium,
    launchpad.colors.red.high,
    //launchpad.colors.green.low,
    //launchpad.colors.green.medium,
    launchpad.colors.green.high,
    //launchpad.colors.orange.low,
    //launchpad.colors.orange.medium,
    launchpad.colors.orange.high,
    //launchpad.colors.yellow.low,
    //launchpad.colors.yellow.medium,
    launchpad.colors.yellow.high
  ]

  console.log("Launchpad ready, let's do something");


  //getstate();
  setInterval(loop, 500);

});




function flasher(e) {
  x=e.x;
  y=e.y;
  for (var xd = 0 - x; xd < x; xd++) {
    for (var xu = 7 + x; xu >= x; xu--) {
      for (var yd = 0 - y; yd < y; yd++) {
        for (var yu = 7 + y; yu >= y; yu--) {
          try{
          launchpadmain.getButton(xd, yd).light(launchpadmain.colors.green.high)
        }
        catch(err) {
        }
        try{
          launchpadmain.getButton(xu, yu).light(launchpadmain.colors.green.high)
        }
        catch(err) {
        }
          sleep(100);

        }
      }
    }
  }
  flasherback(x,y);
}
function flasherback(x, y) {
  for (var xd = x; xd < 8; xd++) {
    for (var xu = x; xu >= 0; xu--) {
      for (var yd = y; yd < 8; yd++) {
        for (var yu = y; yu >= 0; yu--) {
          launchpadmain.getButton(xd, yd).light(launchpadmain.colors.red.high)
          launchpadmain.getButton(xu, yu).light(launchpadmain.colors.red.high)
          sleep(100);
        }
      }
    }
  }
}





function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}
