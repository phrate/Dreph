/* Init File */

	/**
	* Variables
	*/
		// Engine
		var tiles = {};
		var land  = {
			'1-1' : 'grass',
			'1-2' : 'grass',
			'1-3' : 'grass',
			'1-4' : 'grass',
			'2-1' : 'grass',
			'2-2' : 'grass',
			'2-3' : 'grass',
			'2-4' : 'grass',
			'3-1' : 'grass',
			'3-2' : 'grass',
			'3-3' : 'grass',
			'3-4' : 'grass',
			
			'7-1' : 'red',
			'7-2' : 'red',
			'7-3' : 'red',
			'7-4' : 'red',
			'6-4' : 'red',
			'6-5' : 'red',
			'6-6' : 'red',
			'8-4' : 'red',
			'8-5' : 'red',
			'8-6' : 'red',
			'7-6' : 'red'
		};
		var objects = {
			'2-3'  : {file:'small_tower',width:56,height:57},
			'13-5' : {file:'tower',width:56,height:74},
			'13-6' : {file:'small_tower',width:56,height:57}
		};
	
		// Display settings
		var topRight       = {x:750,y:200};
		var viewPortHeight = 15;
		var viewPortWidth  = 10;
		var tileHeight     = 32;
		var tileWidth      = 64;
	/* * * */

	// Document loaded
	
	$(document).ready(function() {
		// Initialize map
		mapInit();
		
		// Load map area
		mapLoad();
		
		/* Cursor Handling */
		$(".tile, .object").mouseover(function(){
			cellName = this.getAttribute('cell');
			bottomTile = tiles[cellName];
			cursorX = bottomTile.x;
			cursorY = bottomTile.y;
			$("#debug").html("Cursor on cell <i>'"+cellName+"'</i> - X: <b>"+cursorX+"</b>, Y: <b>"+cursorY+"</b>");
			$("#cursor")
			.css("display","block")
			.css("top",cursorY)
			.css("left",cursorX);
		});
		$(".object").click(function(){
			imageUrl = this.style.backgroundImage.split('url(')[1].split(')')[0];
			$("#objImage").html('<img src="'+imageUrl+'" />');
			$("#objImageDesc").html(this.getAttribute('objectType')+'<br>'+
			'width: '+this.style.width+'<br>height: '+this.style.height);
			
			$("#objViewer").css('display','block');
		});
		/* * * */
		
	});
	// * * *
	
	/**
	* Map Functions
	*/
		
		function initCursor() {
			$("body").append('<div id="cursor"></div>');	
		}
		
		// Load map area (array)
		function mapLoad() {
			drawArea();
			drawObjects();
		}
		
		function drawArea() {
			if(land) {
				for(cell in land) {
					content = land[cell];
					tile = tiles[cell];
					x = tile.x;
					y = tile.y;
					names = cell.split('-');
					row   = names[0];
					col   = names[1];
					//$("#debug").append("Drawing tile: <b>"+content+"</b>, <b>"+x+"</b>, <b>"+y+"</b>, <b>"+row+"</b>, <b>"+col+"</b><hr>");
					drawTile(content,x,y,row,col);	
				}
			}	
		}
		
		function drawObjects() {
			if(objects) {
				for(cell in objects) {
					object = objects[cell];
					tile   = tiles[cell];
					names = cell.split('-');
					row   = names[0];
					col   = names[1];
					drawObject(object,tile,row,col);
				}
			}
		}
		// * * *
		
		// Initialize map (load blank tile slots)
		function mapInit() {
			initCursor();
			initX = topRight.x;
			initY = topRight.y;
			var rowX; var rowY;
			for(row = 1; row <= viewPortHeight; row ++) {
				if(row == 1) {
					rowX = initX;
					rowY = initY;	
				}
				//$("#debug").append("<hr>Row "+row+" - x:<b>"+rowX+"</b>, y:<b>"+rowY+"</b> <br>");
				for(col = 1; col <= viewPortWidth; col ++) {
					//$("#debug").append("&nbsp; - Col "+col);
					if(col == 1) {
						curX = rowX;
						curY = rowY;
					} else {
						curX += tileHeight;
						curY += (tileHeight/2);
					}
					makeTile(curX,curY,row,col);
					
				}
				rowX -= tileHeight;
				rowY += ((tileHeight)/2);
			}
		}
		// * * *
		
		function makeTile(x,y,row,col) {
			tiles[row+'-'+col] = {x:x,y:y};
			drawTile('blank',x,y,row,col);
		}
		
		function drawTile(file,x,y,row,col) {
			if(file == 'blank') {
				$("#map").append('<div id="tile_'+row+'-'+col+'" cell="'+row+'-'+col+'" class="tile" style="background-image:url(\'./img/tile/'+file+'.gif\'); position: absolute; left: '+x+'px; top: '+y+'px; height: 32px; width: 64px; opacity: .2; z-index: 1;"></div>');
			} else {
				height = 32;
				width  = 64;
				$("#map").append('<div class="tile" cell="'+row+'-'+col+'" style="background-image:url(\'./img/tile/'+file+'.gif\'); position: absolute; left: '+x+'px; top: '+y+'px; height: '+height+'px; width: '+width+'px; z-index: 2"></div>');
			}
		}
		
		var objZ = 4;
		
		function drawObject(object,tile,row,col) {
			file   = object.file;
			width  = object.width;
			height = object.height;
			zIndex = objZ;
				// Determine x and y to place on
				placeX = (tile.x + (Math.round(tileWidth/width)*4));
				placeY = (tile.y - height + tileHeight - 1);
			
			//$("#debug").
			//append("<hr>Draw object '"+file+"' (width: "+width+", height: "+height+") : <br>").
			//append("On cell (x: "+tile.x+", y: "+tile.y+") at (x: "+placeX+", y: "+placeY+")");
			
			// Map appending
			$("#map").append('<div class="object" objectType="'+file+'" cell="'+row+'-'+col+'" style="background-image:url(\'./img/obj/'+file+'.gif\'); position: absolute; height: '+height+'px; width: '+width+'px; top: '+placeY+'px; left: '+placeX+'px; z-index: '+zIndex+';"></div>');
			objZ ++;
		}
		
	/* * * */