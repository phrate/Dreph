/****
* Sprite System
* -------------------
* This file contains and handles functions
* that serve, process, and output sprite data
****/

/**
* {function} _spriteLoadAndPlace( str 'spriteId', str 'spriteType', int 'chunkNum', int 'chunkRow', int 'chunkCol' ){}
* return boolean;
* -----------------------------
* "Sprite" -> "Load and Place on Tile"
* This function effectively uses all the
* sprite loading, data serving, and placing
* functions all in one event.
*
* Realistic Uses:
* - Setting down furniture/items in your house
* - Map editing (placing sprites)
*/
function _spriteLoadAndPlace( spriteId, spriteType, chunkNum, chunkRow, chunkCol, updatingSprite ) {
	tileType  = 'obj';
	sprite    = _spriteLoad(spriteType,tileType);
	newSprite = _spriteAddToChunk(spriteId,sprite,chunkNum,chunkRow,chunkCol,null,true);
	_spritePlaceOnTile(chunkNum,chunkRow,chunkCol,newSprite,updatingSprite);
}
/* * * */

/**
* {function} _spriteRemove( str 'spriteId' ){}
* return boolean;
* -----------------------------
* "Sprite" -> "Remove Sprite"
* Simple enough; removes a sprite from
* the chunkmap and display
*/
function _spriteRemove( spriteId, keep_display ) {
	// Get coordinates
	var coords = spriteIdCache[spriteId]['coords'];
	// Delete array on chunkMap
	var tile = chunkMap[coords['chunkNum']][coords['chunkRow']][coords['chunkCol']];
	delete(tile['data'][coords['z']]);
	       tile['data']['curZ'] --;
	delete(tile['sprites'][spriteId]);
	// Delete cache
	delete(spriteIdCache[spriteId]);
	delete(coords);
	// Remove from display
	if(!keep_display)
		$("#sprite_"+spriteId).remove();
}
/* * * */

function _spriteMove( spriteId, chunkToNum, chunkToRow, chunkToCol ) {
	// Get coordinates
	var sprite = spriteIdCache[spriteId];
	var coords = sprite['coords'];
	_spriteRemove(spriteId,true);
	// Load and place sprite
	_spriteLoadAndPlace(spriteId,sprite['data']['type'],chunkToNum,chunkToRow,chunkToCol,true);
}

/**
* {function} _spriteLoadTile( arr 'tile', str 'tileType', int 'row', int 'col' ){}
* return boolean;
* -----------------------------
* "Sprite" -> "Load Tile"
* Loads all sprites on a tile
* (Uses recursion for 'obj' tile type
*/
function _spriteLoadTile( tile, tileType, row, col, chunkNum ) {
	row = parseInt(row);
	col = parseInt(col);
	chunkNum = parseInt(chunkNum);
	switch(tileType) {
		case 'floor': // Single z-axis
			// Create z-data for chunkMap
			chunkMap[chunkNum][row][col]['data'][0] = {};
			if(sprite = _spriteLoad(tile[0],tileType)) // tile = floor sprite
				_spriteAddToChunk(tile[1],sprite,chunkNum,row,col,0);
		break;
		case 'obj': // Multiple z-axis
			for(z in tile) {
				// Create z-data for chunkMap
				chunkMap[chunkNum][row][col]['data'][z] = {};
				spriteArr = tile[z];
				if(sprite = _spriteLoad(spriteArr[0],tileType)) {
					_spriteAddToChunk(spriteArr[1],sprite,chunkNum,row,col,parseInt(z));
				}
			}
		break;
	}	
	return true;
}
/* * * */

/**
* {function} _spriteLoad( arr 'spriteData', str 'tileType' ){}
* return boolean;
* -----------------------------
* "Sprite" -> "Load"
* Loads all of a sprite's maps (clickMap, specialMap, overlayMap)
* and caches them
*/
function _spriteLoad( spriteType, tileType ) {
	// {Processing}
	// Is this sprite in spriteTypeCache[] ?
	sprite = spriteTypeCache[tileType][spriteType];
	if(!sprite) {
		// Check if in spriteTempCache or server-pull
		sprite = _spriteGetData(tileType,spriteType);
		if(!sprite) {
			// Must use default
			spriteDef = _spriteGetDefault(tileType);
			// Save and cache default
			spriteTypeCache[tileType][spriteDef[0]] = [spriteDef[1],spriteDef[2]];
			return [spriteDef[0],[spriteDef[1],spriteDef[2]]];
		} else {
			// Now save and cache
			spriteTypeCache[tileType][spriteType] = sprite;
			return [spriteType,sprite];
		}
	} else {
		// Is cached, return contents
		return [spriteType,sprite];
	}
}
/* * * */

/**
* {function} _spriteGetDefault( str 'tileType' ){}
* return array;
* -----------------------------
* "Sprite" -> "Get Default Tile-type's Sprite"
* Loads the data for the default sprite of
* the specified tile type
*/
function _spriteGetDefault( tileType ) {
	spriteType     = spriteDefaultTile[tileType];
	sprite = spriteTypeCache[tileType][spriteType];
	if(!sprite)
		sprite = _spriteGetData(tileType,spriteType);
	return [spriteType,sprite[0],sprite[1]];
}
/* * * */

/**
* {function} _spriteGetData( str 'tileType', str 'spriteType' ){}
* return array;
* -----------------------------
* "Sprite" -> "Get Data"
* Retrieves data based on Tile Type and Sprite Type
*/
function _spriteGetData( tileType, spriteType ) {
	// Should we used the cached version (temporary dev. testing),
	// or server-pull it?
	if(spriteClickMapCacheOn) {
		sprite = spriteTempCache[tileType][spriteType];
		if(!sprite) {
			return false;
		} else {
			formattedData = _spriteFormatData(tileType,spriteType,sprite[0]);
			return [formattedData,sprite[1]];
		}
	} else {
		// server-pull
		return false;
	}
}
/* * * */

/**
* {function} _spriteFormatData( str 'tileType', str 'spriteType', arr 'spriteTypeProperties' ){}
* return array;
* -----------------------------
* "Sprite" -> "Format Data"
* Returns a templated data array for a sprite type,
* leaving only insertion of ID and Z-Buffers required
*/
function _spriteFormatData(tileType,spriteType,spriteTypeProperties) {
	return {
		'tileType'   : tileType,
		'imgSrc'     : './bin/img/sprite/'+tileType+'/'+spriteType+'.gif',
		'properties' : spriteTypeProperties
	};
}
/* * * */

/**
* {function} _spriteAddToChunk( str 'tileType', arr 'sprite', int 'row', int 'col', int 'chunkNum' ){}
* return boolean;
* -----------------------------
* "Sprite" -> "Add Sprite to Chunk"
* Inserts sprite data into a chunk property
*/
function _spriteAddToChunk(spriteId,sprite,chunkNum,row,col) {
	// Set up sprite variables
	spriteType         = sprite[0];
	spriteTypeData     = sprite[1][0];
	spriteTypeClickMap = sprite[1][1];
	
	// Insert specific data
		// Get Z variables
		if(arguments[5] || arguments[5] == 0) {
			z = arguments[5]; // Z is given by default
		} else {
			z = chunkMap[chunkNum][row][col]['data']['curZ']; // Z = One higher than last Z
		}
		zIndex = ((engineChunkSize * (row-1)) + col) * spriteStackMax;
		zIndex += z;
		// } Get Z Variables
		
	var spriteData = {'id':spriteId,'z':z,'z-index':zIndex,'type':spriteType};
	var newSpriteData = collect(spriteTypeData,spriteData);
	
	// {Cache into sprite caches, and chunk's cache}
	// Create arrays
	spriteIdCache[spriteId] = {coords:{chunkNum:chunkNum,chunkRow:row,chunkCol:col,z:z},data:newSpriteData};
	chunkMapAddition = {};
	chunkMapAddition[row] = {};
	chunkMapAddition[row][col] = {sprites:{}};
	chunkMapAddition[row][col]['sprites'][spriteId] = newSpriteData;
	
	// Insert arrays
	chunkMap[chunkNum] = collect(chunkMap[chunkNum],chunkMapAddition);
	if(arguments[6]) return newSpriteData;
	else return true;
}
/* * * */

/**
* {function} _spritePlaceOnTile( int 'chunkNum', int 'chunkRow', int 'chunkCol', arr 'sprite' ){}
* return boolean;
* -----------------------------
* "Sprite" -> "Place On Tile"
* Places a sprite on a tile
*/
function _spritePlaceOnTile(chunkNum,chunkRow,chunkCol,sprite,updatingSprite) {
	// Get tile data
	if(1 == 1) { // No cached tileData{} given {{! Currently forced due to small load-time decrease !}}
		curZ = chunkMap[chunkNum][chunkRow][chunkCol]['data']['curZ'];
		
		if(updatingSprite) console.log(spriteIdCache[sprite['id']]);
		
		useZ = curZ;
		if(sprite['tileType'] == 'obj')
			useZ --;
		
		var lastData = chunkMap[chunkNum][chunkRow][chunkCol]['data'][useZ];
	}
	// Sprite data variables
	spriteW = sprite['properties'].w; // Sprite width
	spriteH = sprite['properties'].h; // Sprite height
	btmPad = sprite['properties'].bP || 0; // Bottom pad (closeness to center of tile)
	topPx  = sprite['properties'].tPx; // Point where top pixel (for stacking) beings
	dSize  = sprite['properties'].dS;  // Dimensional size (overhang)
		oldX = lastData['colX'];
		oldY = lastData['curY'];
		
		// Determine coords of obj
		if(sprite['tileType'] == 'obj') {
			// {Y}
						
			// Sprite to tile
			if(curZ == 1) {
				curY = ( oldY - (spriteH - tileHeight + btmPad) );
			} else {
				spriteToTile = (spriteH - tileHeight);
				// ----------
				
				//console.log("["+spriteId+" goal: "+prevTopPx+"px up from bottom]");
				//console.log("Goal sprite is "+lastSpriteH+"h, ours is "+spriteH+"h");
				if(lastData['spriteH'] == spriteH) {
					//console.log("Do not match heights, just subtract");	
					newY = oldY - lastData['topPx'];
				} else {
					//console.log("Begin matching heights");
					newY = oldY + (lastData['spriteH']-spriteH);
					newY -= lastData['topPx'];
				}
								
				if(dSize < lastData['dSize'] && lastData['spriteW'] > spriteW)
					newY -= btmPad;
				
				// ----------
				curY = newY;
			}
			
			// X
			newX = ( oldX + ( (tileWidth - spriteW) / 2 ) ) - ((spriteW%2)?1:0);
			curX = newX;
			
			// Update cur. coords
			placeX = curX;
			placeY = curY;
		} else {
			curY   = oldY;
			placeY = curY;
			if(sprite['tileType'] == 'floor' && sprite['properties']['h'] != (tileHeight+1))
				placeY -= (sprite['properties']['h'] - (tileHeight+1)); // Floor tile is not default height
			curX   = oldX;
			placeX = curX;
		}
	
	chunkHtmlId = 'chunk_'+chunkNum;
	spriteHtmlId = 'sprite_'+sprite['id'];
	spriteStyle = 'position: absolute; top: '+placeY+'px; left: '+placeX+'px; z-index: '+sprite['z-index']+'; background-image:url('+sprite['imgSrc']+'); height: '+sprite['properties'].h+'px; width: '+sprite['properties'].w+'px; opacity: '+(sprite['properties'].o || 1)+';';
	
	// {Display sprite in chunk}
	// Adding
	if(!updatingSprite) {
		$('#'+chunkHtmlId).append(
			htmlDiv(spriteHtmlId,spriteStyle,'class="sprite_'+sprite['tileType']+'_'+sprite['type']+'"')
		);
	} 
	// Updating existing
	else {
		$("#"+spriteHtmlId).css({
			'top'  : curY+'px',
			'left' : curX+'px',
			'z-index' : zIndex
		});
	}
	if(!chunkMap[chunkNum][chunkRow][chunkCol]['data'][curZ])
		chunkMap[chunkNum][chunkRow][chunkCol]['data'][curZ] = {};
	chunkMap[chunkNum][chunkRow][chunkCol]['data'][curZ]['curY']   = curY;
	chunkMap[chunkNum][chunkRow][chunkCol]['data'][curZ]['colX']   = oldX;
	chunkMap[chunkNum][chunkRow][chunkCol]['data'][curZ]['spriteId']   = sprite['id'];
	chunkMap[chunkNum][chunkRow][chunkCol]['data'][curZ]['spriteType'] = sprite['type'];
	chunkMap[chunkNum][chunkRow][chunkCol]['data'][curZ]['spriteH']    = spriteH;
	chunkMap[chunkNum][chunkRow][chunkCol]['data'][curZ]['spriteW']    = spriteW;
	chunkMap[chunkNum][chunkRow][chunkCol]['data'][curZ]['dSize']      = (sprite['tileType'] == 'floor')?0:dSize;
	chunkMap[chunkNum][chunkRow][chunkCol]['data'][curZ]['topPx'] 	 = (sprite['tileType'] == 'floor')?0:topPx;
	chunkMap[chunkNum][chunkRow][chunkCol]['data']['curZ'] ++;
	
}
/* * * */