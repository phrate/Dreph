/****
* Map System - test 2
* -------------------
* This file contains and handles functions
* that serve, process, and output map data
****/

/**
* {function} __mapGetChunks(){}
* return array();
* -----------------------------
* "Map" -> "Get Chunk Data"
* Loads an array of the chunkMap data
* around the player, with floor & sprite tiles
* as its contents
*/
function _mapGetChunks() {
	chunks = __serverGetStaticData( 'chunkMap' );
	return chunks;
}
/* * * */

/**
* {function} __mapParseChunks( arr 'chunkData' ){}
* return array();
* -----------------------------
* "Map" -> "Parse Chunk Data"
* Parses through the loaded chunk data,
* loading clickmaps for each floor & sprite tile
*/
function _mapParseChunks( chunksData ) {
	// Loop through each chunk
	for(var chunkNum in chunksData) {	// Loop Chunk #
		_mapLoadChunk(chunkNum,chunksData);
	}
}
/* * * */

/**
* {function} __mapLoadChunk( int 'chunkNum', arr 'chunksData' ){}
* return array();
* -----------------------------
* "Map" -> "Parse Chunk Data"
* Parses through the loaded chunk data,
* loading clickmaps for each floor & sprite tile
*/
function _mapLoadChunk(chunkNum,chunksData) {
	_mapSaveChunk(chunkNum); // Save the chunk for data insertion
	chunkType = chunksData[chunkNum]; // Chunk type: Floor or obj (sprite)
	for(numType in chunkType) { // Loop Chunk type
		chunk = chunkType[numType];
		for(rowNum in chunk) {
			if(!chunkMap[chunkNum][rowNum])
				chunkMap[chunkNum][rowNum] = {};
			// Save chunkMap row
			row = chunk[rowNum];
			for(colNum in row) {
				if(!chunkMap[chunkNum][rowNum][colNum])
					chunkMap[chunkNum][rowNum][colNum] = {data:{'curZ':0},sprites:{}};
				col = row[colNum]; // [row][col] content
				_spriteLoadTile(col,numType,rowNum,colNum,chunkNum);
			}
		}
	}
	_mapPlaceChunk(chunkNum); // Place chunk with contents	
}
/* * * */

/**
* {function} __mapSaveChunk( int 'num' ){}
* return boolean;
* -----------------------------
* "Map" -> "Save Chunk Data"
* Saves data for a chunk
*/
function _mapSaveChunk( num ) {
	y = 300;
	x = 700;
	// Save / Cache
	data = {y:y,x:x};
	
	// {Final}
	chunkMap[num] = data;
}
/* * * */

/**
* {function} __mapPlaceChunk( int 'num' ){}
* return boolean;
* -----------------------------
* "Map" -> "Place Chunk Data"
* Places chunk based on data & contents
*/
function _mapPlaceChunk( num ) {
	// Chunk variables
	chunk = chunkMap[num];
	coord_y = chunk.y;
	coord_x = chunk.x;
	chunkHtmlId = 'chunk_'+num
	
	// Place "chunk" wrapper corresponding to data coordinates
	$(viewPortId).append( 
		htmlDiv(chunkHtmlId,
				'position: absolute; top: '+coord_y+'px; left: '+coord_x+'px;')
	);
	
	// {Iterate through chunk's contents and place}
	// Row loop
	initX  = 0;
	initY  = 0;
	for(row = 1; chunk[row]; row++) {
		// Initiate coordinates
		if(row == 1) {
			rowX = initX;
			rowY = initY;
		}
		// Col loop
		for(col = 1; chunk[row][col]; col++) {
			// Tile coordinate setup
			if(col == 1) {
				colX = rowX;
				colY = rowY;
			} else {
				colX += tileHeight;
				colY += (tileHeight/2);
			}
			
			colY -= 1;
			colX -= 2;
			
			// Tile data variables
			chunkMap[num][row][col]['data'][0]['curY'] = colY;
			chunkMap[num][row][col]['data'][0]['colX'] = colX;
			// Sprite loop {
			for(spriteId in chunkMap[num][row][col]['sprites']) {
				_spritePlaceOnTile(num,row,col,chunkMap[num][row][col]['sprites'][spriteId]);
			} // } Sprite loop
		} // } Col loop
		// Update coordinates for new row
		rowX -= tileHeight;
		rowX += 2;
		
		rowY += (tileHeight/2);
		rowY -= 1;
	} // } Row Loop
	
}
/* * * */