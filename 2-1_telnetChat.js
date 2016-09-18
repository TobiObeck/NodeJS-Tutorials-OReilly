var net = require('net');

var chatServer = net.createServer();
var clientList = [];

chatServer.on('connection', function(client)
{
	client.name = client.remoteAddress + ':' + client.remotePort;
	client.write('Hallo '+ client.name +'!\n');

	clientList.push(client);

	client.on('data', function(data)
	{
		console.log(client.name + ': ' +data.toString());
		broadcast(data, client);
	});

});

function broadcast(message, client)
{
	for(var i = 0; i < clientList.length; i++)
	{
		if(client !== clientList[i])
		{
			clientList[i].write(client.name + ': ' + message);
		}
	}
}

chatServer.listen(9000);