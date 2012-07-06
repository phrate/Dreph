<html>
    <head>
    	<title>Animation Testing</title>
		<script src="http://localhost:8000/socket.io/socket.io.js"></script>
		<script src="src/js/jquery.js"></script>
		<script src="_server/client.js"></script>
        <style type="text/css">
			.box {
				border: 1px solid gray;
				background-color: #C170CD;
				height: 50px;
				width: 50px;
				position: relative;
				margin: 5px;
				z-index: 10;
			}
			
			.bar {
				border: 1px solid #2E3F52;
				background-color: #CBDEE7;
				height: 50px;
				width: 500px;
				z-index: 20;
				position: relative;
			}
			
			.bar2 {
				z-index: 1;
				background-color: #9CC0D1;
			}
			
			.vertBar {
				position: absolute;
				left: 20px;
				top: 80px;
				height: 500px;
				width: 70px;	
				border: 1px solid black;
				background-color: #64FF68;
				z-index: 30;
				opacity: .95;
			}
			
			.status {
				position: absolute;
				font-family: Calibri;
				font-size: 16px;
				top: 43px;
				left: 60px;
				width: 400px;
				text-align: left;
				display: nones;
			}
			
			@-moz-document url-prefix() {
				.status {
					top: 40px;	
				}
			}
			
			.debug {
				width: 250px;
				height: 550px;
				position: absolute;
				top: 43px;
				left: 390px;
				z-index: 40;
				font-family: "Courier New", Courier, monospace;
				font-size: 15px;
				text-align: left;
				border: 1px solid maroon;
				background-color: lightyellow;
				padding: 5px;
				display: none;
			}
			
			.clear {
				margin-top: 50px;	
			}
		</style>
    </head>
    <body>
    	<center>
        	<button id="scan" onclick="scanDown()">Scan</button>
            <div style="width: 600px; height: 600px; padding: 5px; border: 1px solid black; background-color: #FCFCFC">
            	<div id="status" class="status"></div>
                <div id="debug" class="debug"></div>
            	<div class="vertBar"></div>
                <div class="box"></div>
                <div class="bar"></div>
                <div class="bar bar2 clear"></div>
                <div class="bar clear"></div>
                <div class="bar bar2 clear"></div>
                <div class="bar clear"></div>
            </div>
            <script>
				
				var debug = document.getElementById('debug');
				
				$("#scan").attr('disabled','disabled');
				//$("#scan").removeAttr('disabled');
				
				var phase1       = 5500;
				var phase2       = 5000;
				var totalSeconds = (phase1)+(phase2);
				var seconds      = 0;
				
				var updateToken    = 'pre';
				var updateInterval = 1000;
				var stopped        = false;
				
				function stopScan(phase,newSeconds) {
					debug.innerHTML += "Stopping scan..<br>";
					
					// Status stopping
					stopped = true;
					if(phase == 1) {
						updateToken = Math.random();
						// How much 5,500 is of (5500)+(5000)
						stopped = false;
						debug.innerHTML += " - Boosting to <b>"+newSeconds+"</b><br>";
						startCount(updateToken,false,newSeconds);
					}
					
					$(".box").stop(false,true);
					$(".vertBar").stop(false,true);
				}
				
				function startCount(token,init,startAt) {
					if(!stopped && token == updateToken) {
						if(updateInterval == 0)
							updateInterval = tempUpdateInterval;
						if(init) {
							seconds = 0;
							document.getElementById('status').innerHTML = '[ Starting scan.. ]';
						}
						if(startAt) {
							seconds = startAt;
							tempUpdateInterval = updateInterval;
							updateInterval = 0;
						}
						setTimeout(function(){
							if(token == updateToken) {
								intervalPerc = Math.round((updateInterval/totalSeconds)*100);
								secondsPerc  = Math.round(totalSeconds*(intervalPerc/100));
								seconds      += secondsPerc;
								statusPerc   = Math.round((seconds/totalSeconds)*100);
								if(statusPerc > 100) statusPerc = 100;
								if(token == updateToken) {
									document.getElementById('status').innerHTML = '[ Scanning : <b>'+statusPerc+'%</b> ]';
									if(statusPerc < 100) {
										debug.innerHTML += " (<b>"+statusPerc+"</b>)<br>";
										startCount(token,false,false);
									} else if(statusPerc == 100) {
										debug.innerHTML += " (complete) <br>";
										document.getElementById('status').innerHTML = '[ Scan complete ]';
										setTimeout(function(){
											$("#status").animate({"opacity":"-=1"},{duration:1000,complete:function(){
												document.getElementById('status').innerHTML = '';
												document.getElementById('status').style.opacity = '100';	
											}});
										},1000);
									}
								}
							}
						},updateInterval);
					}
				}
				
				forceDelay = <?php
				
					if($_COOKIE['username'] == 'ff')
						echo 2000;
					else echo 'false';
				
				?>;
				
				function scanDown() {
					debug.innerHTML += "Started scan<br>";
					
					setTimeout(function(){
						
						startCount(updateToken,true,false);
						$("#scan").attr('disabled','disabled');
						$(".box").animate({"top":"+=540px"},{
							duration: 5000
						});
						$(".vertBar").css('z-index',30);
						$(".vertBar").animate({"left":"+=600px"},{
							duration: 5000,
							complete: function(){
								socket.emit('phase',{'phase':1,'turn':1,'seconds':seconds});
								$(".vertBar").animate({"opacity":"-=.4"},{duration:500});
								$(".vertBar").css('z-index',5);	
								setTimeout(function(){scanUp();},500);
							}
						});
					},forceDelay);
				};
				function scanUp() {
					$(".box").animate({"top":"-=540px"},{
						duration: 5000
					});
					$(".vertBar").animate({"left":"-=600px"},{
						duration: 5000,
						complete: function(){
							socket.emit('phase',{'phase':1,'turn':0});
							$(".vertBar").animate({"opacity":"+=.4"},{duration:500});
							$(".vertBar").css('z-index',30);
							setTimeout(function(){
								$("#scan").removeAttr('disabled');
							},500);
						}
					});
				};
			</script>
        </center>
    </body>
</html>