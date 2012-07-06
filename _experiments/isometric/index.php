<html>
    <head>
        <title>Isometric Test</title>
        <script src="src/js/jquery.js"></script>
        <script src="src/js/init.js"></script>
        <style type="text/css">
			body {
				background-color: black;	
			}
		
			#debug {
				font-family: Calibri;
				font-size: 15px;
				color: white;
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
			
			.title {
				font-size: 17px;
				font-weight: bold;
				letter-spacing: 5px;	
				padding: 5px;
			}
			
			#objViewer {
				border: 2px solid white;
				height: 200px;
				width: 150px;
				position: absolute;
				left: 300px;
				top: 100px;
				z-index: 1000;
				background-color: black;
				color: white;
				display: none;
			}
			
			#objExit { 
				position: absolute;
				left: 135px;
				font-family: "Courier New", Courier, monospace;
				cursor: pointer;
			}
			
			#objImageWrap {
				position: absolute;
				left: 10px;
				top: 10px;
				border-bottom: 1px solid white;
				height: 100px;
				width: 130px;
			}
			
			#objImage {
				position: relative;
				top: 10px;
				left: 37px;	
			}
			
			#objImageDesc { 
				position: absolute;
				top: 115px;
				font-family: Calibri;
				left: 10px;
				width: 130px;
				text-align: center;
			}
		</style>
    </head>
    <body>
    	<div id="debug"></div>
        <div id="map"></div>
        <div id="objViewer">
        	<div id="objExit" onClick="document.getElementById('objViewer').style.display='none'">X</div>
        	<div id="objImageWrap"><div id="objImage"></div></div>
            <div id="objImageDesc">Default</div>
        </div>
    </body>
</html>