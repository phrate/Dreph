/****
* Configuration File
* -------------------
* This file globalizes and serves
* many variables that control
* engine flow
****/

/**
* Configuration Variables
*/
	// Engine preferences
	var engineCacheOn         = true;
	var spriteClickMapCacheOn = true;
	
	// Engine variables
	var viewPortId      = '#' + 'map';
	var engineStrArraySplit = '->';
	var engineChunkSize = 15;
	
	// Sprite variables
	var globClickMap = {};
	var tileHeight = 66;
	var tileWidth  = 132;
	var spriteDefaultTile = {'floor':'default_2','obj':'default'};
	var spriteStackMax = 10;
	
/* * * */

/**
* Global Variables
*/
	// Data Arrays
	var chunkMap        = {};
	var spriteTypeCache = {'floor':{},'obj':{}};
	var spriteIdCache   = {};
/* * * */