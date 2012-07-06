/**
* Client Handling
*/
   
	// Variables
	var socket = io.connect('http://localhost:8000');
	
	$(document).ready(function() { // Successfully connected
		
		//
		
		/**********************
		* Default Debug Control
		***********************/
		var debug  = document.getElementById('debug');
			var debug_preText   = "[Debug Log]";
			var debug_delimiter = "<br>";
		debug.innerHTML = debug_preText || 'ss';
		socket.on("debug",function(msg){
			if(debug.innerHTML == debug_preText)
				debug.innerHTML = msg;
			else
				debug.innerHTML += msg+debug_delimiter;
		});
		/********************
		* * * * * * * * * * *
		*********************/
	
	});