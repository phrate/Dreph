<html>
    <head>
        <title>Isometric Test 2</title>
        <script src="src/js/jquery.js"></script>
        <!--//-->
        <script src="src/js/_tempCache.js"></script>
        <script src="src/js/_spriteCache.js"></script>
        <script src="src/js/config.js"></script>
        <script src="src/js/server_js.js"></script>
        <script src="src/js/init.js"></script>
        <script src="src/js/map.js"></script>
        <script src="src/js/sprite.js"></script>
        <style type="text/css">
			body {
				background-color: black;
				color: white;	
			}
		
			#debug {
				font-family: Calibri;
				font-size: 15px;
				color: white;
				position: absolute;
				top: 200px;
				left: 400px;
			}
			
			#viewport {
				width: 500px;
				height: 500px;
				border: 1px solid black;
			}
			
			#cursor {
				display: none;
				background-image:url('img/tile/cursor.gif');
				position: absolute;
				height: 32px;
				width: 64px;
				z-index: 3;
				opacity: 0.5;
			}
		</style>
    </head>
    <body>
    	<div id="debug">
        	<button id="move">Move</button><br>
        	<button id="add">Add</button> <button id="stopAdd" disabled='disabled'>Stop Adding</button><br>
            <button id="delete" disabled="disabled">Delete</button><br>
            Sprite count: <span id="spriteCount">0</span>
        </div>
        <div id="map"></div>
    </body>
</html>