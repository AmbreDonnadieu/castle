
var http = require('https');

var url = process.argv[2];

http.get(url, function(request) {
  //var result = "";
  var list = new Array();
  var nom="";
  var type= "";
  request.setEncoding("utf8");
  request.on("data", function(data) 
	{ 
	nom = data.getElementsById("name");
	type = data.getElementsById("type");
	list.push(nom);
	//result += data; 
	});
  request.on("end", function() { console.log(list.length); console.log(list);});
});


// trouver comment avoir juste les éléments "markers"
// Une fois qu'on a juste la liste des "markers, on recupère juste les noms et les types (restaurant ou hotel/restau)
// ensuite on ne garde que les hotel/restau
// 