var net = require('net');

var chatServer = net.createServer();
var clientList = [];

chatServer.on('connection', function(client)
{
	client.write('Hallo!\n');

	clientList.push(client);

	client.on('data', function(data)
	{
		console.log(data.toString());
		for(var i = 0; i < clientList.length; i++)
		{
			clientList[i].write(data);
		}
	});

});

chatServer.listen(9000);