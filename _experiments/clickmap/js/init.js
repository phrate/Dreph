	$(document).ready(function(){
		
		/* Variables */
		var sprites = {
			//0 : {name:'green', z: 8, r: 1, rs: 1, x:0, y:0, w:100, h:100},
			0 : {name:'factory', z: 9, r: 1, rs: 4, spec: {1:[1],2:[1],3:[1],4:[1]}, x:0, y:0, w:69,  h:109}
		};
		var cacheMode   = false;
		var clickMap    = {};
		var mapStrings  = {};
		var animating   = false;
		var globalSpecs = 
		{1:function(){
			$("#debug").append("Factory <b>window</b><br>");
			// Animation
			if(!animating) {
				//console.log("Animating!");
				$("#sprite_factory").css("background-image",'url("./img/factory/1_anim/anim.gif")');
				animating = true;
			}
			else {
				//console.log("Stopping animation!");
				$("#sprite_factory").css("background-image",'url("./img/factory/1.gif")');
				animating = false;
			}
		},2:function(){
			$("#debug").append("Factory <b>window</b><br>");
		},3:function(){
			$("#debug").append("Factory <b>resource bar</b><br>");
		},4:function(){
			$("#debug").append("Factory <b>resource bar</b><br>");
		}};
		var mapOffsetPad  = 10;
		var mapOffsetTop  = $("#map").offset()['top']  + mapOffsetPad;
		var mapOffsetLeft = $("#map").offset()['left'] + mapOffsetPad;
		/* - - - */
		
		loadSprites(0);
		function loadSprites(num) {
			if(sprites[num]) {
				var data   = sprites[num];
				var sprite = data.name
				if(!cacheMode) {
					// Display
					imgSrc = 'img/'+sprite+'/'+data.r+'.gif';
					$("#map").append('<div style="position: absolute; top: '+(data.y+mapOffsetPad)+'px; left: '+(data.x+mapOffsetPad)+'px; width: '+data.w+'px; height: '+data.h+'px;" id="sprite_'+sprite+'" rotation="'+data.r+'"></div>');
					$('#sprite_'+sprite).css({ 'background': 'url("' + imgSrc + '")'})
										.css({ 'z-index': data.z });
					// Clickmap logging
					function moveSprite(arr,y,x,init) {
						// Increment by x & y
						for(num1 in arr) {
								// X Increment
								for(num2 in arr[num1]) {
									newNum2 = (parseInt((num2.split('_')[1]))+data.x);
									arr[num1][newNum2] = arr[num1][num2];
									delete(arr[num1][num2]);
								}
							// Y Increment
							newNum = (parseInt((num1.split('_')[1]))+data.y);
							arr[newNum] = arr[num1];
							delete(arr[num1]);
						}
						return arr;
					}
					spriteMap = moveSprite(_spriteClickMapCache[sprite],data.y,data.x);
					mapAdd(spriteMap);
				}
				if(cacheMode) {
					rotations = data.rs;
					var spriteMap;
		function logSpecs(wholeMap,arrMap,data,rotation,specNum) {
			if(!arguments[4]) specNum = 1;
			sprite  = data.name;
			roSpecs = data.spec[rotation][(specNum-1)];
			if(roSpecs) {
				/**************
				** Image Part */
				console.log("- - Spec '"+rotation+"_"+specNum+"'");
					var img = new Image();
					img.src = 'img/'+sprite+'/spec/'+rotation+'_'+specNum+'.gif';
					img.onload = function() {
						var canvas = document.createElement('canvas');
						canvas.width = data.w;
						canvas.height = data.h;
						
						var context = canvas.getContext('2d');
						var width = data.w;
						var height = data.h;
						var imageData;
						context.drawImage(img,0,0);
						if (context.getImageData) {
							imageData = context.getImageData(0, 0, width, height);
						}
						
						var cpa       = imageData.data;
						var specMap = {};
						consCount = 0;
						for (var i = 0, n = cpa.length; i < n; i += 4) {
							var row = Math.floor((i / 4) / width);
							var col = (i/4) - (row * width);
							row ++; // Pixels don't start at 0-0
							col ++; // -------------------------
							row = "_"+row;
							col = "_"+col;
							if(!specMap[row]) specMap[row] = {};
							if(cpa[i+3] == 0) {
								delete(specMap[row][col]);
								//clickMap[row][col] = 0;
								//console.log("{ cpa["+(i+3)+"] == 0 } , clickMap["+row+"]["+col+"] = 0");
							} else {
								//console.log("clickMap["+row+"]["+col+"]["+data.z+"] = '"+sprite+"'");
								if(!specMap[row][col])
									specMap[row][col] = {};
									specMap[row][col][data.z] = {};
									specMap[row][col][data.z]['sp'] = {};
									specMap[row][col][data.z]['sp'][rotation] = [specNum];
									//clickMap[row][col][sprite] = data.z;
							}
						} // pixel loop
						newMap = collect(arrMap,specMap);
						if(specNum == data.spec[rotation].length) {
							newMap = collect(wholeMap,newMap);
							logRotations(newMap,(rotation+1));
							if(rotation == rotations) {
								console.log("Done with rotations for sprite '"+sprite+"'");
								//console.log(newMap);
								spriteStr = new Array;
								spriteStr[sprite] = JSON.stringify(newMap);
								mapStrings = collect(mapStrings,spriteStr);
								loadSprites((num+1));
							}
						} else {
							logSpecs(newMap,data,rotation,(specNum+1));
						}
					} // onLoad
				/**************/
				/**************/
			}
		}
		
					function logRotations(arrMap,rotation) {
						if(rotation <= rotations) {
							var img = new Image();
							img.src = 'img/'+sprite+'/'+rotation+'.gif';
							img.onload = function() {
								var canvas = document.createElement('canvas');
								canvas.width = data.w;
								canvas.height = data.h;
							
								var context = canvas.getContext('2d');
								var width = data.w;
								var height = data.h;
								var imageData;
								context.drawImage(img,0,0);
								if (context.getImageData) {
									imageData = context.getImageData(0, 0, width, height);
								}
								
								var cpa       = imageData.data;
								var rotationMap = {};
								consCount = 0;
								for (var i = 0, n = cpa.length; i < n; i += 4) {
									var row = Math.floor((i / 4) / width);
									var col = (i/4) - (row * width);
									row ++; // Pixels don't start at 0-0
									col ++; // -------------------------
									row = "_"+row;
									col = "_"+col;
									if(!rotationMap[row]) rotationMap[row] = {};
									if(cpa[i+3] == 0) {
										//clickMap[row][col] = 0;
										//console.log("{ cpa["+(i+3)+"] == 0 } , clickMap["+row+"]["+col+"] = 0");
									} else {
										//console.log("clickMap["+row+"]["+col+"]["+data.z+"] = '"+sprite+"'");
										if(!rotationMap[row][col])
											rotationMap[row][col] = {};
											rotationMap[row][col][data.z] = {s:sprite,r:[rotation]};
											//clickMap[row][col][sprite] = data.z;
									}
								}
								console.log(rotationMap);
								rotationSpecs = false;
								if(data.spec !== undefined)
									rotationSpecs = data.spec[rotation];
								if(rotationSpecs) {
									console.log("- Loading special maps for '"+data.name+"' rotation "+rotation);
									var specMap = logSpecs(arrMap,rotationMap,data,rotation);
								} else {
									newMap = collect(arrMap,rotationMap);
									logRotations(newMap,(rotation+1));
									if(rotation == rotations) {
										console.log("= Done with rotations for sprite '"+sprite+"'");
										//console.log(newMap);
										spriteStr = new Array;
										spriteStr[sprite] = JSON.stringify(newMap);
										mapStrings = collect(mapStrings,spriteStr);
										loadSprites((num+1));
									}
								}
							} // img.onload
						} // rotation <= rotations
					}	
						// Initializing rotation logging
						logRotations(spriteMap,data.r,false);
				} else loadSprites((num+1));
			} else {
				if(cacheMode) {
					$.ajax({
						'type' : 'POST',
						'url'  : './php/foo.php',
						'data' : 'data='+JSON.stringify(mapStrings),
						'success' : function(data) {
							$("#debug").html(data)	
						}
					});
				}
			}
		}
		
		$("#map").click(function(event) {
			if(event.target.id && event.target.id != 'map' && !cacheMode) {
			var Y = event.clientY - ($("#map").offset()['top']  + mapOffsetPad - 1);
			var X = event.clientX - ($("#map").offset()['left'] + mapOffsetPad - 1);
				validPx = clickMap[Y][X];
				if (validPx) {
					//console.log("- [Valid click on pixel ["+Y+"]["+X+"], z-arrays:] -");
					//console.log("clickMap["+Y+"]["+X+"] contents before sort:");
					//	for(z in clickMap[Y][X])
					//		console.log("- ["+z+"] = "+clickMap[Y][X][z]);
					//console.log("validPx[] contents before sort:");
					//	for(z in validPx)
					//		console.log("- ["+z+"] = "+validPx[z]);
					function sortKeys(obj) {
						//console.log("{Sorting}");
						var keys = [];
						for(var key in obj) {
							//console.log("- - key '"+key+"' = '"+obj[key]+"'");
							if(obj.hasOwnProperty(key)) {
								keys.push(key);
							}
						}
						//console.log("- "+keys);
						//console.log("{End Sort}");
						return keys;
					}
					pxSort = sortKeys(validPx);
					pxSort.reverse();
					//console.log("clickMap["+Y+"]["+X+"] contents after sort:");
					//	for(z in clickMap[Y][X])
					//		console.log("- ["+z+"] = "+clickMap[Y][X][z]);
					//console.log("pxSort[] contents after sort:");
					//	for(z in pxSort)
					//		console.log("- ["+z+"] = "+pxSort[z]);
					
					/* Final checking */
					//console.log(pxSort);
					for(z in pxSort) {
						animate       = 0;
						data          = validPx[pxSort[z]];
						sprite        = data['s'];
						rotation      = $("#sprite_"+sprite).attr('rotation');
						rotations     = data['r'];
						spec          = data['sp'];
						if(spec) {
							if(spec[rotation] !== undefined) {
								for(specNum in spec[rotation]) {
									//console.log("globalSpecs["+rotation+"]["+spec[rotation][specNum]+"]()");
									globalSpecs[rotation]();
								}
								animate = 0;
							}
						}
						validRotation = false;
						if(rotations.length == 1) {
							if(rotation == rotations[0]) {
								//console.log("- '"+sprite+"' validRotation = true; ("+rotation+" == "+rotations[0]+")");
								validRotation = true;
							} else {
								//console.log("- '"+sprite+"' validRotation = false; ("+rotation+" != "+rotations[0]+")");
								//console.log(rotations);	
							}
						} else {
							rotations = rotations[0].split(',');
							for(r in rotations) {
								if(rotation == rotations[r]) {
									//console.log("- '"+sprite+"' validRotation = true; ("+rotation+" == "+rotations[r]+")");
									validRotation = true;
									break;
								} else {
									//console.log("- '"+sprite+"' validRotation = false; ("+rotation+" != "+rotations[r]+") rotations[r]");	
								}
							}
						}
						if(validRotation && $("#sprite_"+sprite).css('opacity') > 0) {
							//console.log("- - Valid click ["+Y+"]["+X+"] : "+sprite);
							//if(animate == 0) $("#debug").append("<b style='color: "+sprite+"'>"+sprite+"</b> - r<b>"+rotation+"</b><br>");							
							if(animate)
								$("#sprite_"+sprite).animate({
									'opacity':'-=.4'
								},100,'',function(){
									$("#sprite_"+sprite).animate({
										'opacity':'+=.4'
									},100);
								});
								break;
								}
					}
				}
			}
		});
		
		var dir = '+';
		$("#move").click(function(){
			$("#map").animate({
				'left' : dir+'=200px'
			},3000,'linear',function(){
				if(dir == '+') dir = '-';
				else dir = '+';
				$("#move").click();
			});
		});
		
		//$("#debug").html("Sprite <b>factory</b>'s rotation: <b>#1</b>");
		$("#rotate").click(function(){
			interval = 1000;
			rotation = parseInt($("#sprite_factory").attr('rotation'));
			rotation ++;
			if(rotation == 5) rotation = 1;
			
			src = rotation+'.gif';
			if(animating && rotation == 1) src = '1_anim/anim.gif';
			
			$("#sprite_factory").css({'background-image':'url(./img/factory/'+src+')'})
							.attr({'rotation':rotation});
			//$("#debug").html("Sprite <b>factory</b>'s rotation: <b>#"+rotation+"</b>");
			setTimeout(function(){$("#rotate").click()},interval);
		});
		
/***************
* Map Functions
****************/
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
		function mapAdd(arr) {
			clickMap = collect(clickMap,arr);
		}
/****************
 ****************/
		
	});