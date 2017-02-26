var restify = require('restify');
var fs = require('fs');
var path = require('path');


//=========================================================
// load menus
//=========================================================

//dynamically load all menu modules in ./menus

var requireDir = function (dir) {
    var aret = new Array();
    fs.readdirSync(dir).forEach(function (library) {
        var isLibrary = library.split(".").length > 0 && library.split(".")[1] === 'js',
            libName = library.split(".")[0].toLowerCase();
        if (isLibrary) {
            var p = path.join(__dirname, dir);
            aret[libName] = require(path.join(p, library));
        }
    });
    return aret;
}

var menus = requireDir("menus");
//console.log(menus)

//=========================================================

// Setup Restify Server
var server = restify.createServer();

server.get('/menu/:name', function (req, res, next) {
    var name = req.params['name'];
    //console.log("get: " + name);
    menus[name].menu((result) => res.send(200, result));
});

server.listen(8080, function () {
    console.log('%s listening to %s', server.name, server.url);
});