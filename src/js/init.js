/****
* Initialization File - 2
* -------------------
* This file initiates and loads/processes
* the following steps, in order:
*   Key : [] = Incomplete, [O] = In progress, [L] = Done for temp cache , [X] = Done entirely
* 	[O]- Load the chunkMap data (area around player)
*		[L]- Load clickmaps for each floor & sprite tiles on chunk
*			[]- Place each tile & sprite on corresponding chunk-tile
*   []- Position each chunk accordingly on map
****/

/****
* Central Processing
****/
	/* *
	 * () ready document {
	/* */
	$(document).ready(function(){
	/* { */
	
		/**
		* [O]- Load the chunkMap data (area around player)
		**/
		// Get & parse
		chunks = _mapParseChunks( _mapGetChunks() );
		/* * * */
		
		var toRow = 1;
		var toCol = 0;
		$("#move").click(function(){
			
			toCol ++;
			if(toCol == 5) {
				toRow ++;
				toCol = 1;
			}
			
			if(toRow == 5) {
				toRow = 1;
			}
			
			_spriteMove( 'tow4', 1, toRow, toCol );
		});
		
		// - - - -
		var boxNum = 0;
		var boxNumCap = 1000;
		
		var preDoInterval = 100;
		var doInterval = preDoInterval;
		var doIntervalMin = 100;
		var animDuration = ((doInterval*16)*.5);
		
		var addOn  = false;
		var addRow = 1;
		var addCol = 0;
		var spriteCycle = 1;
		var revolutions = 0;
		var slideChunk = false;
		
		var deleteOn = false;
		
		$("#add").click(function(){
			addOn = true;
			$("#add").attr('disabled','disabled');
			$("#delete").attr('disabled','disabled');
			$("#stopAdd").removeAttr('disabled');
			addBox();
		});
		
		function addBox() {
			boxNum ++;
			if(boxNum <= boxNumCap) {
				$("#spriteCount").html(boxNum);
				addCol ++;
				if(addCol == 5) {
					addCol = 1;
					addRow ++;
				}
				
				if(addRow == 5) {
					addRow = 1;
					spriteCycle ++;
					slideChunk = true;
				}
				
				if(spriteCycle == 7) {
					spriteCycle = 1;
				}
				
				
				switch(spriteCycle) {
					case 1: type = 'filler'; height = 60; break;
					case 2: type = 'default'; height = 54; break;
					case 3: type = 'default'; height = 54; break;
					case 4: type = 'filler'; height = 60; break;
					case 5: type = 'default'; height = 47; break;
					case 6: type = 'default'; height = 47; break;
				}
				
				if(slideChunk) {
					if(doInterval != doIntervalMin)
						doInterval = (doInterval*.8);
					if(doInterval < doIntervalMin)
						doInterval = doIntervalMin;
					animDuration = (doInterval*.5);
					$("#chunk_1").animate({
						'top':'+='+(height*.7)+'px'
					},animDuration,'linear');
					slideChunk = false;
				}
				
				_spriteLoadAndPlace( 'box_'+boxNum, type, 1, addRow, addCol );
				if(addOn) {
					setTimeout(function(){
						addBox();
					},doInterval);
				}	
			} else $("#stopAdd").click();
		}
		
		$("#stopAdd").click(function(){
			addOn = false;
			$("#stopAdd").attr('disabled','disabled');
			$("#add").removeAttr('disabled');
			$("#delete").removeAttr('disabled');
		});
			
		$("#delete").click(function(){
			deleteOn = true;
			$("#delete").attr('disabled','disabled');
			$("#add").attr('disabled','disabled');
			$("#stopDelete").removeAttr('disabled');
			doInterval = preDoInterval;
			deleteBox();
		});
		
		$("#stopDelete").click(function(){
			deleteOn = false;
			$("#stopDelete").attr('disabled','disabled');
			$("#delete").removeAttr('disabled');
			$("#add").removeAttr('disabled');
		});
		
		function deleteBox() {
			if(boxNum >= 1) {
				_spriteRemove('box_'+boxNum);
				addCol --;
				if(addCol == 0) {
					addRow --;
					addCol = 0;
				}
				
				if(addRow == 0) {
					$("#stopDelete").click();
					addRow = 1;
					addCol = 0;
				} else {
					if(boxNum%16 == 0 && boxNum > 1) {
						if(doInterval != doIntervalMin)
							doInterval = (doInterval*.8);
						if(doInterval < doIntervalMin)
							doInterval = doIntervalMin;
						animDuration = (doInterval*.5);
						$("#chunk_1").animate({
							'top':'-='+(50*.7)+'px'
						},animDuration,'linear');
					}
					
					boxNum --;
					$("#spriteCount").html(boxNum);
					if(deleteOn) {
						setTimeout(function(){
							deleteBox();
						},doInterval);
					}
				}
			} else $("#stopDelete").click();
		}
	
	/* *
	 * () } ready document
	/* */
	});
	/* } */
/****/

/****
* Various Functions
****/
	function collect() {
	  var ret = {};
	  var len = arguments.length;
	  for (var i=0; i<len; i++) {
		for (p in arguments[i]) {
		  if (arguments[i].hasOwnProperty(p)) {
			  if(arguments[i][p] instanceof Object) {
				if(ret[p] !== undefined) {
					ret[p] = collect(ret[p],arguments[i][p]);
				} else {
					ret[p] = arguments[i][p];
				}
			  } else if(arguments[i][p] instanceof Array) {
				 ret[p] = arguments[i][p];
			  } else {
				 if(ret[p] && p == 0)
					ret[p] = ret[p]+","+arguments[i][p];
				 else
					ret[p] = arguments[i][p];
			  }
		  }
		}
	  }
	  return ret;
	}
	
	function htmlDiv(id) {
		str = '<div id="'+id+'"';
		if(arguments[1])
			str += ' style="'+arguments[1]+'"';
		if(arguments[2])
			str += ' '+arguments[2];
		str += '></div>';
		return str;
	}
	
	function htmlImg(id) {
		str = '<img id="'+id+'"';
		if(arguments[1])
			str += ' style="'+arguments[1]+'"';
		if(arguments[2])
			str += ' '+arguments[2];
		str += ' />';
		return str;
	}
/****/