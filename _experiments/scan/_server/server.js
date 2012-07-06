var io    = require('socket.io').listen(8000);

// open the socket connection
io.sockets.on('connection', function (socket) {
   
   	var base_url = 'mmo/_experiments/scan/src/php/';
   
   	socket.on('getConnected',function(){
		socket.emit('isConnected');
	});
   
	socket.on('scanDown',function(){
		socket.broadcast.emit('scanDown');	
	});
	
	socket.on('phase',function(data){
		ajaxDo('phase',data);
	});
   
   /********************
   * AJAX Shit
   *********************/
   function ajaxGet(url,params,operation,pushData) {
		var sys  = require('sys'),
			http = require('http');
		
		var connection = http.createClient(80, 'localhost'),
			request = connection.request('/'+url+'?'+params);
		
		connection.addListener('error', function(connectionException){
			sys.log(connectionException);
		});
		
		request.addListener('response', function(response){
			var data = '';
		
			response.addListener('data', function(chunk){ 
				data += chunk; 
			});
			response.addListener('end', function(){
				switch(operation) {
					case 'phase':
						if(data == '{stop_phase_'+pushData['phase']+'}')
							socket.broadcast.emit('scan_phase',{'phase':pushData['phase'],'seconds':pushData['seconds']});
					break;
					case 'debug':
						socket.emit('debug',data);
					break;
					default:
						// Do nothing
					break;
				}
			});
		});
		request.end();
   }
   
   function ajaxDo(command,data) {
	   params = '';
	   switch(command) {
			case 'phase':
				url       = 'phaseCheck.php';
				params    = 'phase='+data['phase']+'&turn='+data['turn'];
				operation = 'phase';
			break;
			case '_debug':
				url       = 'src/php/foo.php';
				params    = 'foo=bar';
				operation = 'debug';
			break;
	   }
	   ajaxGet(base_url+url,params,operation,data);
   }

   /********************
   * * * * * * * * * * *
   *********************/

});