/**
* Client Handling
*/
   
	// Variables
	var socket = io.connect('http://localhost:8000');
	
	$(document).ready(function() { // Successfully connected
	
		socket.emit('getConnected');
		socket.on('isConnected',function(){
			$("#scan").removeAttr('disabled');
		});
		
		$("#scan").click(function(){
			socket.emit('scanDown');
		});
		
		socket.on('scanDown',function(){
			scanDown();
		});
		
		socket.on('scan_phase',function(data){
			phase   = data['phase'];
			newSeconds = data['seconds'];
			
			debug.innerHTML += " $! <b>"+(newSeconds-seconds)+"</b>ms unsynch'd<br>";
			if((newSeconds - seconds) >= 500) // Only boost counter if a certain amount of unsynch'd
				stopScan(phase,newSeconds);
		});
	
	});