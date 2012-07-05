/****
* Server (Javascript End)
* -------------------
* Includes all the functions needed
* to contact the PHP Server
****/
	
/**
* {function} __serverGetStaticData( str 'name', boolean 'canUseCache' )
*/
function __serverGetStaticData( name, canUseCache ) {
	if(!arguments[1]) canUseCache = true; // Can use cache by default
	var data;
	// Data can use cache & in cache mode?
	if(canUseCache && engineCacheOn) {
		// Parse name if needed
		splitName = name.split(engineStrArraySplit);
		if(splitName[1]) {
			var innerData;
			for(x in splitName) {
				if(!innerData)
					innerData = engineTempStaticCache[splitName[x]];
				else
					innerData = innerData[splitName[x]];
			}
			data = innerData;
		} // } Loop mode 
		else {
			data = engineTempStaticCache[name];
		} // } Single mode
	} // } Cache Mode
	// Data needs to pull from server
	else {
		// (server pull..)
	} // } Server Mode
	return data || null;
}
/* * * */	

/**
* {function} __serverGetTableData( str 'table', str 'name', boolean 'canUseCache' )
*/
function __serverGetTableData( table, name, canUseCache ) {
	if(!arguments[1]) canUseCache = true; // Can use cache by default
	var data;
	// Data can use cache & in cache mode?
	if(canUseCache && engineCacheOn) {
		data = engineTempTableCache[name];
	} // } Cache Mode
	// Data needs to pull from server
	else {
		// (server pull..)
	} // } Server Mode
	return data || null;
}
/* * * */